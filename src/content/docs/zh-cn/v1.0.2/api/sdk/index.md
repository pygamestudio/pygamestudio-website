---
title: 平台 SDK
description: 引擎内置的第三方平台 SDK 桥接 —— TapTap PC SDK 与 bilibili Toy SDK。
---

引擎为每个可以发布的平台自带一套桥接。它们通过 `studio` 命名空间下的 `sdk` 访问，在对象脚本或 `main.py` 中调用，并且只存在于对应平台的构建产物里。

| 页面 | 内容 |
| --- | --- |
| [TapTap PC](/zh-cn/api/sdk/taptap_pc/) | `studio.sdk.taptap.pc`：启动 SDK、登录、成就、云存档、DLC、排行榜、好友关系、联机对战、合规，以及平台随机数。 |
| [bilibili Toy](/zh-cn/api/sdk/bilibili_toy/) | `studio.sdk.toy`：容器状态、页面跳转、用户与作者信息、分享、云存储、分数、摄像头与麦克风。 |

## 可用性检查

`available()` 说明当前环境能不能用这个 SDK：TapTap PC 需要 Windows x64 且装了 TapTap 运行库；bilibili Toy 需要页面由 Toy 容器（即bilibili应用）打开。不在对应平台时每次调用都会抛异常 —— TapTap 是 `TapSDKNotAvailable`，Toy 是 `ToyUnavailableError`，所以没做判断的调用会让桌面包或网页包直接中断。

导入这两个命名空间本身没有代价：初始化之前不会加载任何库，所以同一份 `main.py` 可以在编辑器、各平台构建和自己的开发环境里通用。

```python
import pygamestudio as studio

pc = studio.sdk.taptap.pc
toy = studio.sdk.toy

if pc.available():
    ...        # 运行在 TapTap PC 上
elif toy.available():
    ...        # 运行在 Toy 容器里
```

## 发布

打包时选择哪个平台是在打包窗口里决定的，各自有单独的指南：[TapTap PC](/zh-cn/platform/taptap_pc/) 和 [bilibili Toy](/zh-cn/platform/bilibili_toy/)。
