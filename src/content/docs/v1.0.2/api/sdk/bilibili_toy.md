---
title: bilibili Toy
description: studio.sdk.toy — the Python side of the bilibili Toy JavaScript SDK, covering container state, navigation, user data, sharing, cloud storage, scores and media.
---

**How it is used:** `studio.sdk.toy`, the Python side of the JavaScript SDK the Toy build puts on the page. Outside the container `available()` is `False` and every call raises `ToyUnavailableError`. Every call returns a `ToyRequest` that settles when the promise resolves.

```python
import pygamestudio as studio

toy = studio.sdk.toy

class Game(studio.Game):
    def on_start(self):
        if toy.available():
            toy.get_user_profile().then(lambda user: print(user['nickname']))

    def on_key_down(self, key, mod, unicode, scancode, window=None):
        if key == studio.K_s and toy.available():
            toy.share()                       # open the platform share sheet
```

Every call returns a `ToyRequest` that settles when the JavaScript promise resolves — the game keeps running meanwhile.

## Container

#### `available()`
`True` when the page runs inside a Toy container.

#### `close_browser()`
Closes the platform browser or container; app only.

#### `container_state()`
The state last pushed to `on_container_change()`, or `None` before the first one.

#### `get_container_state()`
Request with the current container state.

#### `is_supported(ability)`
`True` when the client supports `ability`.

- `ability` (`str`): capability name as documented by the platform.

#### `on_container_change(listener)`
Calls `listener(state)` whenever the container changes; returns the function that unsubscribes.

- `listener` (`callable`): receives the new state.

#### `set_container_mode(orientation=None, immersive=None)`
Asks the container for an orientation and/or immersive mode.

- `orientation` (`str`): wanted orientation.
- `immersive` (`bool`): `True` hides the container chrome.

## Navigation

#### `get_qr_code(path=None, size=None)`
Request with the QR code image URL of a game page.

- `path` (`str`): page to encode.
- `size` (`int`): wanted image size.

#### `navigate(page_type, target_id=None, extra=None)`
Opens a platform page.

- `page_type` (`str`): page type as documented by the SDK.
- `target_id` (`str`): id the page should show.
- `extra` (`dict`): extra parameters for the page.

## User and author

#### `get_author_profile()`
Request with the profile of the uploading author.

#### `get_author_relation()`
Request with the relation between the player and the author (followed, …).

#### `get_author_videos(videos)`
Request with the details of the author's videos.

- `videos` (`list`): BV or AV ids.

#### `get_user_profile()`
Request with the profile of the signed-in player (`nickname`, `avatar`, …).

#### `get_video_user_actions(aids=None, videos=None)`
Request with what the player did with the given videos (likes, coins, …).

- `aids` (`list`): video ids in AV form.
- `videos` (`list`): video ids in BV form.

## Sharing

#### `save_image_to_album(url=None, base64_data=None, hint_msg=None)`
Saves an image to the player's album; app only, and one of the two sources is required.

- `url` (`str`): image URL.
- `base64_data` (`str`): image data, base64 encoded.
- `hint_msg` (`str`): text shown while saving.

#### `share(path=None)`
Opens the platform share sheet.

- `path` (`str`): page to share.

## Cloud storage

#### `get_cloud_storage(keys=None)`
Request with the player's own key/value entries.

- `keys` (`list`): keys to read; omitted reads them all.

#### `get_shared_storage(storage_id, keys=None)`
Request with entries of a storage shared by every player of the game.

- `storage_id` (`str`): which shared storage.
- `keys` (`list`): keys to read; omitted reads them all.

#### `remove_cloud_storage(keys=None)`
Deletes entries from the player's storage.

- `keys` (`list`): keys to delete; omitted deletes them all.

#### `remove_shared_storage(storage_id, keys=None)`
Deletes entries from a shared storage.

- `storage_id` (`str`): which shared storage.
- `keys` (`list`): keys to delete; omitted deletes them all.

#### `set_cloud_storage(items)`
Writes key/value entries to the player's storage.

- `items` (`dict`): the entries to write.

#### `set_shared_storage(storage_id, items)`
Writes entries to a shared storage.

- `storage_id` (`str`): which shared storage.
- `items` (`dict`): the entries to write.

## Scores

#### `get_my_rank(board, period=None)`
Request with the player's own rank on a board.

- `board` (`str`): board id.
- `period` (`str`): `total`, `week` or `day` as documented by the platform.

#### `get_rank_list(board, period=None, limit=None)`
Request with a page of a board.

- `board` (`str`): board id.
- `period` (`str`): `total`, `week` or `day`.
- `limit` (`int`): how many entries.

#### `submit_score(board, score)`
Sends a score to a board.

- `board` (`str`): board id.
- `score` (`int`): the score.

## Media and safety

#### `check_input_safety(text, scene=None)`
Asks the platform whether user-typed text is safe to show.

- `text` (`str`): the text to check.
- `scene` (`str`): where the text is used.

#### `request_camera(facing_mode=None)`
Requests the camera; the request settles with the media stream.

- `facing_mode` (`str`): which camera to use.

#### `request_microphone()`
Requests the microphone; the request settles with the media stream.

#### `stop_media(stream)`
Releases a stream returned by one of the request calls.

- `stream`: the stream to release.

## Calls and errors

#### `call(method, *args)`
Calls an SDK method that has no wrapper yet.

- `method` (`str`): JavaScript method name.
- `args`: arguments passed through as they are.

#### `ToyError`
A call failed; `result()`, `raise_for_error()` and the `on_error` callback of `then()` receive it.

#### `ToyRequest`
One pending call. `then(on_ok=None, on_error=None)` registers callbacks (they run immediately when the call has already settled), `catch(on_error)` is the failure-only form, `result(default=None)` returns the value, and `raise_for_error()` either returns the value or raises `ToyError`.

#### `ToyUnavailableError`
The page is not inside a Toy container, so there is no SDK to talk to.
