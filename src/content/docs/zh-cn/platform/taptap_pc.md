---
title: TapTap PC
description: 发布到 TapTap PC 平台 —— 在桌面版构建的基础上，额外加入 TapTap SDK。
---

TapTap PC 上的游戏就是 Windows 可执行程序，通过 TapTap 客户端完成登录、DLC、成就、云存档、排行榜、合规与联机对战。Pygame Studio 负责打包这个可执行程序，并在**发布平台**选择 **TapTap PC** 时，把游戏代码需要的 SDK 桥接一并放进包里。

上架游戏示例：[就吃100个苹果](https://www.taptap.cn/app/981059?os=pc)

## 打包

1. 在 Windows 上打开 **项目 → 打包**（`Ctrl+B`），停留在 **桌面应用** 标签页。
2. 照常填写 **应用名称**、**应用图标**、**输出目录**。
3. 把 **发布平台** 选成 **TapTap PC**。
4. 点击 **打包** —— 引擎会把 SDK 目录一起打进包里。

产物结构：

```text
<输出目录>/build/Windows/dist/<应用名称>/
├─ <应用名称>.exe      游戏本体
└─ _internal          依赖文件，包含 TapTap SDK 桥接
```

TapTap PC平台仅支持 Windows x64，所以提交给平台的就是在 Windows 上打出来的包。

## 使用TapTap PC SDK

桥接模块是 `studio.sdk.taptap.pc`。它需要 TapTap 开发者后台提供的 `client_id` 与 `public_key`，并且必须在主循环开始前初始化、每帧驱动一次：

```python
import pygamestudio as studio

CLIENT_ID = '...'
PUB_KEY = '...'

def main():
    pc = studio.sdk.taptap.pc
    if not pc.available():
        return                                  # 编辑器、其他系统、SDK 缺失

    # TapTap 有时要求经它的客户端重启游戏：返回 True 表示已经重启，
    # 当前进程应当直接退出。
    if pc.restart_app_if_necessary(CLIENT_ID):
        return

    pc.init(CLIENT_ID, PUB_KEY)

    class Game(studio.Game):
        def on_update(self, dt):
            pc.run_callbacks()                  # 每帧派发异步结果
            studio.load_scene(studio.get_screen())

        def on_quit(self):
            pc.shutdown()

    Game().run()

if __name__ == '__main__':
    main()
```

`client_id` 与 `public_key` 也可以写在 `project.pygs` 里，放在编辑器不会写入的配置段中：

```json
{ "taptap": { "client_id": "...", "public_key": "..." } }
```

:::tip
client_id和public_key在[TapTap开发者后台](https://developer.taptap.cn/)的游戏服务->应用配置中获取。
:::

结果有**事件**和**请求**两种到达方式：

```python
pc.on('authorize_finished', lambda data: print('登录', data))

request = pc.achievement.unlock('first_win')
pc.wait(request, timeout=5.0)                   # 或者稍后查看 request.done
```

全部接口与命名空间（用户、成就、云存档、DLC、排行榜、好友关系、联机对战、合规）见 [TapTap PC SDK](/zh-cn/api/sdk/taptap_pc/)。

:::tip
可访问[官网 TapTap PC SDK](https://developer.taptap.cn/docs/pc/cpp-sdk/overview/)了解SDK用法。
:::

## 发布
1. 压缩打包好的所有文件。
![compress](/images/doc/taptap_pc_publish0.png)

2. 访问[TapTap开发者后台](https://developer.taptap.cn/)，创建游戏并点击PC包体管理，然后上传包体等待审核即可。包体通过并自测后可以再去填写游戏相关信息并发布。
![upload](/images/doc/taptap_pc_publish1.png)

:::tip
可访问[官网 TapTap PC 文档](https://developer.taptap.cn/docs/pc-store/)了解PC游戏上架指引。
:::

## 常见问题

| 现象 | 原因与处理 |
| --- | --- |
| 打包后 `pc.available()` 仍是 `False` | 打包时没有选 **TapTap PC**，或是在其他操作系统上打的包。请在 Windows 上选好平台重新打包。 |
| `init()` 返回 `NoPlatform` | 那台机器没有安装（或没有运行）TapTap 客户端。可访问该[官网链接](https://www.taptap.cn/download)下载 |
| `init()` 返回 `NotLaunchedByPlatform` | 游戏是被直接启动的。请从 TapTap 客户端启动；TapTap 要求重启时 `restart_app_if_necessary()` 会处理。 |
| 结果一直不回来 | 没有每帧调用 `pc.run_callbacks()`，或者在 `init()` 成功之前就开始调用了。 |
| 意外抛出 `TapSDKNotAvailable` | 在非 TapTap 环境里调用了或者SDK没有打包进来。可以先用 `pc.available()` 判断防止报错。|
