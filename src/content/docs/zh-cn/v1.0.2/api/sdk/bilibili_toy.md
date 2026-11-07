---
title: bilibili Toy
description: studio.sdk.toy —— bilibili Toy JavaScript SDK 的 Python 一侧：容器状态、页面跳转、用户信息、分享、云存储、分数与媒体。
---

**使用方式：** `studio.sdk.toy` 是 Toy 包注入页面的 JavaScript SDK 的 Python 一侧。不在容器里时 `available()` 为 `False`，每次调用都会抛出 `ToyUnavailableError`。每次调用都返回 `ToyRequest`，等 Promise 完成时落定。

```python
import pygamestudio as studio

toy = studio.sdk.toy

class Game(studio.Game):
    def on_start(self):
        if toy.available():
            toy.get_user_profile().then(lambda user: print(user['nickname']))

    def on_key_down(self, key, mod, unicode, scancode, window=None):
        if key == studio.K_s and toy.available():
            toy.share()                       # 打开平台分享面板
```

每次调用都返回 `ToyRequest`，等对应的 JavaScript Promise 完成时落定 —— 期间游戏继续运行。

## 容器

#### `available()`
页面是否运行在 Toy 容器内。

#### `close_browser()`
关闭平台的浏览器或容器；仅 App 内有效。

#### `container_state()`
最近一次通过 `on_container_change()` 推送的状态；第一次推送之前为 `None`。

#### `get_container_state()`
请求当前的容器状态。

#### `is_supported(ability)`
当前客户端是否支持 `ability`。

- `ability`（`str`）：平台文档中的能力名称。

#### `on_container_change(listener)`
容器状态变化时调用 `listener(state)`，返回用于取消订阅的函数。

- `listener`（`callable`）：接收新的状态。

#### `set_container_mode(orientation=None, immersive=None)`
向容器请求屏幕方向或沉浸模式。

- `orientation`（`str`）：期望的方向。
- `immersive`（`bool`）：`True` 时隐藏容器界面。

## 页面跳转

#### `get_qr_code(path=None, size=None)`
请求某个游戏页面的二维码图片地址。

- `path`（`str`）：要生成二维码的页面。
- `size`（`int`）：期望的图片尺寸。

#### `navigate(page_type, target_id=None, extra=None)`
打开平台页面。

- `page_type`（`str`）：SDK 文档中的页面类型。
- `target_id`（`str`）：页面要展示的 ID。
- `extra`（`dict`）：额外参数。

## 用户与作者

#### `get_author_profile()`
请求上传作者的资料。

#### `get_author_relation()`
请求玩家与作者之间的关系（是否关注等）。

#### `get_author_videos(videos)`
请求作者视频的详情。

- `videos`（`list`）：BV 或 AV 号。

#### `get_user_profile()`
请求已登录玩家的资料（`nickname`、`avatar` 等）。

#### `get_video_user_actions(aids=None, videos=None)`
请求玩家对这些视频的操作（点赞、投币等）。

- `aids`（`list`）：AV 号形式的视频 ID。
- `videos`（`list`）：BV 号形式的视频 ID。

## 分享

#### `save_image_to_album(url=None, base64_data=None, hint_msg=None)`
把图片保存到玩家相册；仅 App 内有效，两种来源必须给出一种。

- `url`（`str`）：图片地址。
- `base64_data`（`str`）：base64 编码的图片数据。
- `hint_msg`（`str`）：保存过程中显示的提示文字。

#### `share(path=None)`
打开平台分享面板。

- `path`（`str`）：要分享的页面。

## 云存储

#### `get_cloud_storage(keys=None)`
请求玩家自己的键值数据。

- `keys`（`list`）：要读取的键；省略则读取全部。

#### `get_shared_storage(storage_id, keys=None)`
请求所有玩家共享的一份存储。

- `storage_id`（`str`）：哪一份共享存储。
- `keys`（`list`）：要读取的键；省略则读取全部。

#### `remove_cloud_storage(keys=None)`
删除玩家存储中的键。

- `keys`（`list`）：要删除的键；省略则全部删除。

#### `remove_shared_storage(storage_id, keys=None)`
删除共享存储中的键。

- `storage_id`（`str`）：哪一份共享存储。
- `keys`（`list`）：要删除的键；省略则全部删除。

#### `set_cloud_storage(items)`
把键值数据写入玩家存储。

- `items`（`dict`）：要写入的数据。

#### `set_shared_storage(storage_id, items)`
把键值数据写入共享存储。

- `storage_id`（`str`）：哪一份共享存储。
- `items`（`dict`）：要写入的数据。

## 分数

#### `get_my_rank(board, period=None)`
请求玩家自己在某个榜单上的名次。

- `board`（`str`）：榜单 ID。
- `period`（`str`）：`total`、`week` 或 `day`，以平台文档为准。

#### `get_rank_list(board, period=None, limit=None)`
请求某个榜单的一页数据。

- `board`（`str`）：榜单 ID。
- `period`（`str`）：`total`、`week` 或 `day`。
- `limit`（`int`）：返回条数。

#### `submit_score(board, score)`
向榜单提交分数。

- `board`（`str`）：榜单 ID。
- `score`（`int`）：分数。

## 媒体与内容安全

#### `check_input_safety(text, scene=None)`
询问平台用户输入的文本是否允许展示。

- `text`（`str`）：要检查的文本。
- `scene`（`str`）：文本的使用场景。

#### `request_camera(facing_mode=None)`
请求摄像头，结果为一个媒体流。

- `facing_mode`（`str`）：使用哪个摄像头。

#### `request_microphone()`
请求麦克风，结果为一个媒体流。

#### `stop_media(stream)`
释放上面请求得到的媒体流。

- `stream`：要释放的流。

## 调用与错误

#### `call(method, *args)`
调用还没有封装成方法的 SDK 接口。

- `method`（`str`）：JavaScript 方法名。
- `args`：原样透传的参数。

#### `ToyError`
调用失败；`result()`、`raise_for_error()` 以及 `then()` 的 `on_error` 回调会收到它。

#### `ToyRequest`
一个尚未完成的调用。`then(on_ok=None, on_error=None)` 注册回调（调用已完成时立即执行），`catch(on_error)` 只注册失败回调，`result(default=None)` 返回结果，`raise_for_error()` 要么返回结果、要么抛出 `ToyError`。

#### `ToyUnavailableError`
页面不在 Toy 容器里，没有可用的 SDK。
