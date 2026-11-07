---
title: TapTap PC
description: studio.sdk.taptap.pc —— TapTap PC SDK 的桥接：生命周期、登录、成就、云存档、DLC、排行榜、好友关系、联机对战与合规接口。
---

**使用方式：** 在对象脚本或 `main.py` 里调用 `studio.sdk.taptap.pc`。仅支持 Windows x64：其他环境下 `available()` 为 `False`，每次调用都会抛出 `TapSDKNotAvailable`。结果通过**事件**到达，或由调用返回的 **`Request`** 在 `run_callbacks()` 运行时落定。

```python
import pygamestudio as studio

pc = studio.sdk.taptap.pc

class Game(studio.Game):
    def on_start(self):
        pc.init(CLIENT_ID, PUB_KEY)
        pc.user.login()                       # 结果通过 'authorize_finished' 事件返回
        pc.achievement.unlock('first_win')    # 返回 Request

    def on_update(self, dt):
        pc.run_callbacks()                    # 每帧派发异步结果
```

结果通过**事件**到达，或由调用返回的 **`Request`** 在 `run_callbacks()` 运行时落定。

## 启动与关闭

#### `available()`
本机能否使用该 SDK：Windows x64 且已安装 TapTap 运行库时为 `True`。

#### `get_client_id()`
当前使用的 client id；SDK 不可用时为 `None`。

#### `init(client_id=None, pub_key=None)`
初始化 SDK，返回 `InitResult`。省略参数时会从 `project.pygs` 的 `taptap` 段读取。

- `client_id`（`str`）：TapTap 开发者后台的客户端 ID。
- `pub_key`（`str`）：同一后台的公钥。

`InitResult.OK` 表示成功；`NoPlatform` 表示没装 TapTap 客户端，`NotLaunchedByPlatform` 表示游戏是被直接启动的，`PlatformVersionMismatch` 表示客户端版本过旧。

#### `is_app_owned()`
已登录用户是否在 TapTap 上拥有该游戏。

#### `is_initialized()`
`init()` 成功之后、`shutdown()` 之前为 `True`。

#### `library_path()`
将要加载的 DLL 路径；缺失时为 `None`。

#### `restart_app_if_necessary(client_id=None)`
TapTap 通过客户端重新拉起游戏时返回 `True`，此时当前进程应当退出。放在 `Game().run()` 之前调用；其余情况下返回 `False`，游戏照常继续。

- `client_id`（`str`）：客户端 ID，省略时从 `project.pygs` 读取。

#### `run_callbacks()`
派发异步结果：事件在这里触发、请求在这里落定。每帧调用一次，一般放在 `on_update()` 里。

#### `shutdown()`
关闭 SDK 并注销所有订阅；从未初始化时调用也安全。

#### `wait(request, timeout=10.0, interval=0.01)`
循环派发回调直到请求落定或超时，并返回该请求。等待期间游戏不渲染，所以适合放在加载界面；游戏进行中建议在 `on_update()` 里轮询 `request.done`。

- `request`（`Request`）：要等待的请求。
- `timeout`（`float`）：最长等待秒数，默认 `10.0`。

## 事件

#### `off(event, callback)`
取消一个订阅。

- `event`（`str`）：事件名。
- `callback`（`callable`）：传给 `on()` 的那个函数。

#### `off_all(event=None)`
取消全部订阅，或只取消某个事件的订阅。

- `event`（`str`）：事件名；省略则全部取消。

#### `on(event, callback)`
订阅事件，返回一个用于取消订阅的函数。回调在 `run_callbacks()` 内、游戏线程上执行。

- `event`（`str`）：事件名，例如 `'authorize_finished'`、`'achievement.unlocked'`、`'cloud_save.listed'`；`'*'` 表示全部。
- `callback`（`callable`）：收到解析后的数据。

## 登录

位于 `pc.user`。

#### `get_approved_scopes()`
请求已授权范围，结果在 `data['scopes']` 中。

#### `get_open_id()`
当前用户的 OpenID；未登录时为 `None`。

#### `login(scopes='public_profile')`
发起 TapTap 授权登录，返回 `AuthorizeResult` —— 只表示流程是否发起成功，不代表授权成功。最终结果通过 `authorize_finished` 事件返回，负载包含 `is_cancel`、`error`、`token_type`、`kid`、`mac_key`、`mac_algorithm`、`scope`。

- `scopes`（`str`）：申请的权限范围，默认 `'public_profile'`。

## 成就

位于 `pc.achievement`。

#### `increment(achievement_id, steps=1)`
推进分步成就；结果通过 `achievement.incremented` 返回。

- `achievement_id`（`str`）：后台配置的成就 ID。
- `steps`（`int`）：步长，默认 `1`。

#### `show()`
在 TapTap 客户端打开成就展示页。

#### `unlock(achievement_id)`
解锁成就；结果通过 `achievement.unlocked` 返回。

- `achievement_id`（`str`）：后台配置的成就 ID。

## 云存档

位于 `pc.cloud_save`。

#### `create(name, data_file, summary, extra='', playtime=0, cover_file=None)`
上传新存档；结果通过 `cloud_save.created` 返回。

- `name`（`str`）：存档显示名。
- `data_file`（`str`）：要上传的文件路径。
- `summary`（`str`）：一句话描述。
- `extra`（`str`）：随存档保存的附加文本。
- `playtime`（`int`）：游戏时长，单位秒。
- `cover_file`（`str`）：封面图路径，或 `None`。

#### `delete(uuid)`
删除存档；结果通过 `cloud_save.deleted` 返回。

- `uuid`（`str`）：存档 ID。

#### `get_cover(uuid, file_id)`
下载封面文件，`data['data']` 是字节；结果通过 `cloud_save.cover` 返回。

- `uuid`（`str`）：存档 ID。
- `file_id`（`str`）：存档条目中的文件 ID。

#### `get_data(uuid, file_id)`
下载存档文件；结果通过 `cloud_save.data` 返回。

- `uuid`（`str`）：存档 ID。
- `file_id`（`str`）：存档条目中的文件 ID。

#### `list_saves()`
请求该用户的存档列表；结果通过 `cloud_save.listed` 返回。

#### `update(uuid, name, data_file, summary, extra='', playtime=0, cover_file=None)`
覆盖已有存档，参数与 `create()` 相同；结果通过 `cloud_save.updated` 返回。

- `uuid`（`str`）：存档 ID。

## DLC

位于 `pc.dlc`。

#### `is_owned(dlc_id)`
用户是否拥有该 DLC。

- `dlc_id`（`str`）：后台配置的 DLC ID。

#### `query_details(dlc_ids)`
请求给定 DLC 的详情。

- `dlc_ids`（`list`）：要查询的 ID。

#### `show_store(dlc_id)`
在 TapTap 客户端打开该 DLC 的商店页，返回是否成功打开。

- `dlc_id`（`str`）：DLC ID。

## 排行榜

位于 `pc.leaderboard`。

#### `load(leaderboard_id, collection=LeaderboardCollection.Public, continuation_token=None, period_token=None)`
请求排行榜的一页；结果通过 `leaderboard.loaded` 返回。

- `leaderboard_id`（`str`）：后台配置的排行榜 ID。
- `collection`（`LeaderboardCollection`）：`Public`（用户附近）或 `Friends`，默认 `Public`。
- `continuation_token`（`str`）：上一页的续页令牌。
- `period_token`（`str`）：周期令牌（周榜等）。

#### `load_centered(leaderboard_id, collection=LeaderboardCollection.Public, max_results=0)`
请求用户附近的条目；结果通过 `leaderboard.my_centered_scores` 返回。

- `leaderboard_id`（`str`）：排行榜 ID。
- `max_results`（`int`）：条目数量，`0` 交给平台决定。

#### `load_mine(leaderboard_id, collection=LeaderboardCollection.Public, period_token=None)`
请求用户自己的成绩；结果通过 `leaderboard.my_scores` 返回。

- `leaderboard_id`（`str`）：排行榜 ID。

#### `show(leaderboard_id, collection=LeaderboardCollection.Public)`
在 TapTap 客户端打开排行榜页面。

- `leaderboard_id`（`str`）：排行榜 ID。

#### `submit(scores)`
上报成绩。

- `scores`（`list`）：单条或一组 `{'leaderboard_id', 'score', ...}` 字典。

## 好友关系

位于 `pc.relation`。

#### `fans(continuation_token=None)`
请求关注自己的用户列表；结果通过 `relation.fan_list` 返回。

- `continuation_token`（`str`）：上一页的续页令牌。

#### `following(continuation_token=None)`
请求自己关注的用户列表；结果通过 `relation.following_list` 返回。

- `continuation_token`（`str`）：上一页的续页令牌。

#### `friends(continuation_token=None)`
请求互相关注的好友列表；结果通过 `relation.friend_list` 返回。

- `continuation_token`（`str`）：上一页的续页令牌。

#### `new_fan_count()`
新增粉丝数，出错时返回 `None`。建议改用 `relation.new_fan_count_changed` 事件，无需轮询。

#### `sync_friend(friend_open_id, nickname, friend_nickname, action=RelationAction.Add)`
同步游戏内的好友关系；结果通过 `relation.sync_result` 返回。

- `friend_open_id`（`str`）：对方的 OpenID。
- `nickname`（`str`）：自己的昵称。
- `friend_nickname`（`str`）：对方昵称。
- `action`（`RelationAction`）：`Add` 或 `Remove`，默认 `Add`。

#### `sync_friend_by_union_id(friend_union_id, nickname, friend_nickname, action=RelationAction.Add)`
与 `sync_friend()` 相同，只是用 UnionID 指定对方。

- `friend_union_id`（`str`）：对方的 UnionID。

#### `unread_message_count()`
未读消息数，出错时返回 `None`。建议改用 `relation.unread_count_changed` 事件。

## 联机对战

位于 `pc.online_battle`。所有调用都是异步的，结果通过事件返回；`pump()` 已由 `run_callbacks()` 自动调用。

#### `connect()`
连接联机服务 —— 建房或匹配之前必须先完成。结果通过 `online_battle.connected` 返回。

#### `create_room(max_players, room_type, name='', custom_properties='', match_params=None, custom_status=0, player_properties='')`
创建房间；结果通过 `online_battle.room_created` 返回。

- `max_players`（`int`）：房间人数上限。
- `room_type`（`str`）：平台使用的房间类型。
- `name`（`str`）：房间名。
- `match_params`（`dict`）：匹配参数，需要被匹配时使用。

#### `disconnect()`
断开联机服务；结果通过 `online_battle.disconnected` 返回。

#### `get_room_list(room_type='', offset=0, limit=0)`
请求可加入的房间列表；结果通过 `online_battle.room_list` 返回。

- `room_type`（`str`）：按房间类型过滤，空表示全部。
- `offset`（`int`）：从第几个开始。
- `limit`（`int`）：返回数量，`0` 交给平台决定。

#### `join_room(room_id, custom_status=0, custom_properties='')`
加入房间；结果通过 `online_battle.room_joined` 返回，房间数据在 `data['room']`。

- `room_id`（`str`）：房间 ID。

#### `kick_player(player_id)`
把玩家移出房间 —— 仅房主、且不能在帧同步期间。结果通过 `online_battle.player_kicked` 返回。

- `player_id`（`str`）：要移除的玩家 ID。

#### `leave_room()`
离开房间（帧同步期间不允许）；结果通过 `online_battle.room_left` 返回。

#### `match_room(max_players, room_type, name='', custom_properties='', match_params=None, custom_status=0, player_properties='')`
匹配房间，匹配不到时按参数创建。结果通过 `online_battle.room_matched` 返回。

- 参数与 `create_room()` 相同。

#### `pump()`
处理联机事件，返回本次 SDK 报告的事件数。`run_callbacks()` 已经会调用它。

#### `send_frame_input(data)`
帧同步期间发送本帧操作，同一帧最多 5 次。结果通过 `online_battle.frame_input_sent` 返回。

- `data`（`str`）：操作数据。

#### `send_message(msg, receivers=None)`
发送房间消息；结果通过 `online_battle.message_sent` 返回。

- `msg`（`str`）：消息内容。
- `receivers`（`list`）：接收者玩家 ID；省略则发给所有人。

#### `start_frame_sync()`
开始帧同步（仅房主）；结果通过 `online_battle.frame_sync_started` 返回。

#### `stop_frame_sync()`
停止帧同步（仅房主）；结果通过 `online_battle.frame_sync_stopped` 返回。

#### `update_player_properties(properties)`
更新玩家的自定义属性；结果通过 `online_battle.player_properties_updated` 返回。

- `properties`（`str`）：属性数据。

#### `update_player_status(status)`
更新玩家的自定义状态；结果通过 `online_battle.player_status_updated` 返回。

- `status`（`int`）：状态值。

#### `update_room_properties(name=None, custom_properties=None)`
更新房间名与自定义属性；结果通过 `online_battle.room_properties_updated` 返回。

- `name`（`str`）：新的房间名。
- `custom_properties`（`str`）：新的自定义属性。

## 合规

位于 `pc.compliance`，按发行地区需要时使用。

#### `check_payment_limit(amount)`
查询 `amount` 金额的充值是否允许；结果通过 `compliance.payment_limit_result` 返回。

- `amount`（`int`）：金额，单位分。

#### `enable_anti_addiction()`
启用平台的防沉迷处理；用户的实名状态通过 `compliance.real_name_result` 返回。

#### `ensure_real_name()`
用户尚未通过实名时发起实名认证流程；结果通过 `compliance.real_name_result` 返回。

#### `submit_payment(amount)`
向平台上报一笔已完成的充值。

- `amount`（`int`）：金额，单位分。

## 平台随机数

与平台共享的确定性随机数，用于双方都能复现的回放。

#### `create_random_number_generator(seed)`
创建生成器并返回其 ID。

- `seed`（`int`）：初始种子。

#### `destroy_random_number_generator(generator)`
销毁生成器；无效 ID 会被忽略。

- `generator`（`int`）：`create_random_number_generator()` 返回的 ID。

#### `random_int(generator)`
返回 `[0, 2^31)` 区间的随机整数。

- `generator`（`int`）：生成器 ID。

## 类型

#### `Request`
一个尚未完成的异步调用。`done` 在 `run_callbacks()` 执行时变为 `True`，`ok` 表示响应没有错误，`data` 是解析后的数据，`error` 是失败原因。

#### `TapSDKError`
所有 SDK 错误的基类。

#### `TapSDKCallError`
同步调用返回了非零结果码。

#### `TapSDKInitError`
`init()` 失败，`InitResult` 的取值说明原因。

#### `TapSDKNotAvailable`
当前环境无法使用 SDK —— 非 Windows 平台，或者缺少 TapTap 运行库。

#### `TapSDKNotInitialized`
在 `init()` 成功之前就调用了接口。

#### 枚举
`InitResult`、`AuthorizeResult`、`Result`、`ErrorCode`、`Event`、`SystemState`、`CloudSaveResult`、`ComplianceActionType`、`RealNameStatus`、`LeaderboardCollection`、`RelationAction`、`OnlineBattleEvent` 定义了与 SDK 交换的取值，可以直接写 `pc.ErrorCode.Unauthorized` 而不必记数字。
