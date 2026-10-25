---
title: TapTap PC
description: studio.sdk.taptap.pc — the TapTap PC SDK bridge, with its lifecycle, login, achievements, cloud saves, DLC, leaderboards, relations, online battle and compliance calls.
---

**How it is used:** `studio.sdk.taptap.pc`, from an object script or `main.py`. Windows x64 only: elsewhere `available()` is `False` and every call raises `TapSDKNotAvailable`. Results arrive as **events** or as a **`Request`** that settles while `run_callbacks()` runs.

```python
import pygamestudio as studio

pc = studio.sdk.taptap.pc

class Game(studio.Game):
    def on_start(self):
        pc.init(CLIENT_ID, PUB_KEY)
        pc.user.login()                       # result: 'authorize_finished'
        pc.achievement.unlock('first_win')    # returns a Request

    def on_update(self, dt):
        pc.run_callbacks()                    # deliver results every frame
```

Results arrive as **events** or as a **`Request`** that settles while `run_callbacks()` runs.

## Starting the SDK

#### `available()`
`True` when this machine can use the SDK: Windows x64 with the TapTap runtime installed.

#### `get_client_id()`
The client id in use, or `None` when the SDK is not available.

#### `init(client_id=None, pub_key=None)`
Starts the SDK and returns an `InitResult`. Both arguments fall back to the `taptap` section of `project.pygs` when they are omitted.

- `client_id` (`str`): client id from the TapTap developer entry.
- `pub_key` (`str`): public key from the same entry.

`InitResult.OK` is the success value; `NoPlatform` means the TapTap client is not installed, `NotLaunchedByPlatform` that the game was started directly, `PlatformVersionMismatch` that the client is too old.

#### `is_app_owned()`
`True` when the signed-in user owns the game on TapTap.

#### `is_initialized()`
`True` between a successful `init()` and `shutdown()`.

#### `library_path()`
Path of the DLL that would be loaded, or `None` when it is missing.

#### `restart_app_if_necessary(client_id=None)`
`True` when TapTap restarted the game through its client — the current process has to exit. Call it before `Game().run()`; on every other start it returns `False` and the game continues.

- `client_id` (`str`): client id, read from `project.pygs` when omitted.

#### `run_callbacks()`
Delivers the asynchronous results: events fire and requests settle here. Call it once per frame, from `on_update()`.

#### `shutdown()`
Shuts the SDK down and drops every subscription; safe to call when it was never initialised.

#### `wait(request, timeout=10.0, interval=0.01)`
Pumps the callbacks until the request settles or the timeout passes, and returns the request either way. The game does not draw meanwhile, so use it on loading screens and poll `request.done` in `on_update()` during play.

- `request` (`Request`): the request to wait for.
- `timeout` (`float`): seconds to wait; default `10.0`.

## Events

#### `off(event, callback)`
Removes one subscription.

- `event` (`str`): event name.
- `callback` (`callable`): the function passed to `on()`.

#### `off_all(event=None)`
Removes every subscription, or only those of one event.

- `event` (`str`): event name; omitted removes all of them.

#### `on(event, callback)`
Subscribes to an event and returns a function that removes the subscription. Callbacks run inside `run_callbacks()`, on the game thread.

- `event` (`str`): event name such as `'authorize_finished'`, `'achievement.unlocked'`, `'cloud_save.listed'`; `'*'` takes every event.
- `callback` (`callable`): receives the parsed payload.

## Login

In `pc.user`.

#### `get_approved_scopes()`
Request with the scopes the user has granted (`data['scopes']`).

#### `get_open_id()`
The user's OpenID, or `None` when nobody is signed in.

#### `login(scopes='public_profile')`
Starts the TapTap authorize flow and returns an `AuthorizeResult` — whether the flow started, not whether it succeeded. The outcome arrives as the `authorize_finished` event, which carries `is_cancel`, `error`, `token_type`, `kid`, `mac_key`, `mac_algorithm` and `scope`.

- `scopes` (`str`): requested scopes; default `'public_profile'`.

## Achievements

In `pc.achievement`.

#### `increment(achievement_id, steps=1)`
Advances a step-counted achievement; the result arrives as `achievement.incremented`.

- `achievement_id` (`str`): achievement id from the developer entry.
- `steps` (`int`): how many steps; default `1`.

#### `show()`
Opens the achievement page in the TapTap client.

#### `unlock(achievement_id)`
Unlocks an achievement; the result arrives as `achievement.unlocked`.

- `achievement_id` (`str`): achievement id from the developer entry.

## Cloud saves

In `pc.cloud_save`.

#### `create(name, data_file, summary, extra='', playtime=0, cover_file=None)`
Uploads a new save; the result arrives as `cloud_save.created`.

- `name` (`str`): display name of the save.
- `data_file` (`str`): path of the file to upload.
- `summary` (`str`): one-line description.
- `extra` (`str`): extra text stored with the save.
- `playtime` (`int`): playtime in seconds.
- `cover_file` (`str`): path of a cover image, or `None`.

#### `delete(uuid)`
Deletes a save; the result arrives as `cloud_save.deleted`.

- `uuid` (`str`): save id.

#### `get_cover(uuid, file_id)`
Downloads the cover file; `data['data']` holds the bytes, and the result arrives as `cloud_save.cover`.

- `uuid` (`str`): save id.
- `file_id` (`str`): file id from the save entry.

#### `get_data(uuid, file_id)`
Downloads the save file; the result arrives as `cloud_save.data`.

- `uuid` (`str`): save id.
- `file_id` (`str`): file id from the save entry.

#### `list_saves()`
Request with the saves of the user; the result arrives as `cloud_save.listed`.

#### `update(uuid, name, data_file, summary, extra='', playtime=0, cover_file=None)`
Replaces an existing save; the parameters are the ones of `create()`. The result arrives as `cloud_save.updated`.

- `uuid` (`str`): save id.

## DLC

In `pc.dlc`.

#### `is_owned(dlc_id)`
`True` when the user owns that DLC.

- `dlc_id` (`str`): DLC id from the developer entry.

#### `query_details(dlc_ids)`
Request with the details of the given DLCs.

- `dlc_ids` (`list`): ids to look up.

#### `show_store(dlc_id)`
Opens the DLC page in the TapTap client and returns whether it opened.

- `dlc_id` (`str`): DLC id.

## Leaderboards

In `pc.leaderboard`.

#### `load(leaderboard_id, collection=LeaderboardCollection.Public, continuation_token=None, period_token=None)`
Request with a page of the leaderboard; the result arrives as `leaderboard.loaded`.

- `leaderboard_id` (`str`): leaderboard id from the developer entry.
- `collection` (`LeaderboardCollection`): `Public` (around the user) or `Friends`, default `Public`.
- `continuation_token` (`str`): token of the previous page.
- `period_token` (`str`): token of the period (weekly boards).

#### `load_centered(leaderboard_id, collection=LeaderboardCollection.Public, max_results=0)`
Request with the entries around the user; the result arrives as `leaderboard.my_centered_scores`.

- `leaderboard_id` (`str`): leaderboard id.
- `max_results` (`int`): how many entries; `0` lets the platform decide.

#### `load_mine(leaderboard_id, collection=LeaderboardCollection.Public, period_token=None)`
Request with the user's own entries; the result arrives as `leaderboard.my_scores`.

- `leaderboard_id` (`str`): leaderboard id.

#### `show(leaderboard_id, collection=LeaderboardCollection.Public)`
Opens the leaderboard page in the TapTap client.

- `leaderboard_id` (`str`): leaderboard id.

#### `submit(scores)`
Sends scores to the platform.

- `scores` (`list`): one entry or a list of `{'leaderboard_id', 'score', ...}` dicts.

## Relations

In `pc.relation`.

#### `fans(continuation_token=None)`
Request with the users who follow the player; the result arrives as `relation.fan_list`.

- `continuation_token` (`str`): token of the previous page.

#### `following(continuation_token=None)`
Request with the users the player follows; the result arrives as `relation.following_list`.

- `continuation_token` (`str`): token of the previous page.

#### `friends(continuation_token=None)`
Request with the mutual follows; the result arrives as `relation.friend_list`.

- `continuation_token` (`str`): token of the previous page.

#### `new_fan_count()`
The number of new fans, or `None` on error. Prefer the `relation.new_fan_count_changed` event, which needs no polling.

#### `sync_friend(friend_open_id, nickname, friend_nickname, action=RelationAction.Add)`
Reports a friend relation the game knows about; the result arrives as `relation.sync_result`.

- `friend_open_id` (`str`): OpenID of the other player.
- `nickname` (`str`): the player's own nickname.
- `friend_nickname` (`str`): the other player's nickname.
- `action` (`RelationAction`): `Add` or `Remove`, default `Add`.

#### `sync_friend_by_union_id(friend_union_id, nickname, friend_nickname, action=RelationAction.Add)`
Same as `sync_friend()`, with a UnionID instead of an OpenID.

- `friend_union_id` (`str`): UnionID of the other player.

#### `unread_message_count()`
The number of unread messages, or `None` on error. Prefer the `relation.unread_count_changed` event.

## Online battle

In `pc.online_battle`. Every call is asynchronous and reports its result as an event; `pump()` is already called by `run_callbacks()`.

#### `connect()`
Connects to the battle service — required before a room can be created or matched. The result arrives as `online_battle.connected`.

#### `create_room(max_players, room_type, name='', custom_properties='', match_params=None, custom_status=0, player_properties='')`
Creates a room; the result arrives as `online_battle.room_created`.

- `max_players` (`int`): room size.
- `room_type` (`str`): room type used by the platform.
- `name` (`str`): room name.
- `match_params` (`dict`): matching parameters, when the room should be matchable.

#### `disconnect()`
Disconnects from the battle service; the result arrives as `online_battle.disconnected`.

#### `get_room_list(room_type='', offset=0, limit=0)`
Request with the joinable rooms; the result arrives as `online_battle.room_list`.

- `room_type` (`str`): filter by room type; empty means all.
- `offset` (`int`): first room to return.
- `limit` (`int`): how many rooms; `0` lets the platform decide.

#### `join_room(room_id, custom_status=0, custom_properties='')`
Joins a room; the result arrives as `online_battle.room_joined` with the room under `data['room']`.

- `room_id` (`str`): room id.

#### `kick_player(player_id)`
Removes a player from the room — owner only, and not during frame sync. The result arrives as `online_battle.player_kicked`.

- `player_id` (`str`): id of the player to remove.

#### `leave_room()`
Leaves the room (not allowed during frame sync); the result arrives as `online_battle.room_left`.

#### `match_room(max_players, room_type, name='', custom_properties='', match_params=None, custom_status=0, player_properties='')`
Joins a matching room, or creates one when nothing matches. The result arrives as `online_battle.room_matched`.

- The parameters are the ones of `create_room()`.

#### `pump()`
Processes the battle events and returns how many the SDK reported this time. `run_callbacks()` already calls it.

#### `send_frame_input(data)`
Sends this frame's input during frame sync — at most five times per frame. The result arrives as `online_battle.frame_input_sent`.

- `data` (`str`): the input payload.

#### `send_message(msg, receivers=None)`
Sends a room message; the result arrives as `online_battle.message_sent`.

- `msg` (`str`): message text.
- `receivers` (`list`): player ids to send to; omitted sends to everyone.

#### `start_frame_sync()`
Starts frame sync (owner only); the result arrives as `online_battle.frame_sync_started`.

#### `stop_frame_sync()`
Stops frame sync (owner only); the result arrives as `online_battle.frame_sync_stopped`.

#### `update_player_properties(properties)`
Updates the player's custom properties; the result arrives as `online_battle.player_properties_updated`.

- `properties` (`str`): the properties payload.

#### `update_player_status(status)`
Updates the player's custom status; the result arrives as `online_battle.player_status_updated`.

- `status` (`int`): the status value.

#### `update_room_properties(name=None, custom_properties=None)`
Updates the room's name and custom properties; the result arrives as `online_battle.room_properties_updated`.

- `name` (`str`): new room name.
- `custom_properties` (`str`): new custom properties.

## Compliance

In `pc.compliance`, for releases that need them.

#### `check_payment_limit(amount)`
Asks whether a payment of `amount` is allowed; the result arrives as `compliance.payment_limit_result`.

- `amount` (`int`): amount in cents.

#### `enable_anti_addiction()`
Enables the platform's anti-addiction handling; the user's real-name state arrives as `compliance.real_name_result`.

#### `ensure_real_name()`
Starts the real-name verification flow when the user has not passed it; the result arrives as `compliance.real_name_result`.

#### `submit_payment(amount)`
Reports a completed payment to the platform.

- `amount` (`int`): amount in cents.

## Platform random numbers

Deterministic numbers shared with the platform, so a replay can be reproduced by both sides.

#### `create_random_number_generator(seed)`
Creates a generator and returns its id.

- `seed` (`int`): starting seed.

#### `destroy_random_number_generator(generator)`
Destroys a generator; unknown ids are ignored.

- `generator` (`int`): id returned by `create_random_number_generator()`.

#### `random_int(generator)`
A random integer in `[0, 2^31)`.

- `generator` (`int`): generator id.

## Types

#### `Request`
One pending asynchronous call. `done` turns `True` while `run_callbacks()` runs, `ok` is `True` when the response carried no error, `data` holds the parsed payload and `error` holds the failure.

#### `TapSDKError`
Base class of every SDK error.

#### `TapSDKCallError`
An immediate call returned a non-zero result code.

#### `TapSDKInitError`
`init()` failed; the `InitResult` value says why.

#### `TapSDKNotAvailable`
The SDK cannot work here — another operating system, or the TapTap runtime is missing.

#### `TapSDKNotInitialized`
A call was made before `init()` succeeded.

#### Enumerations
`InitResult`, `AuthorizeResult`, `Result`, `ErrorCode`, `Event`, `SystemState`, `CloudSaveResult`, `ComplianceActionType`, `RealNameStatus`, `LeaderboardCollection`, `RelationAction` and `OnlineBattleEvent` name the values exchanged with the SDK, so comparisons can be written as `pc.ErrorCode.Unauthorized` instead of a bare number.
