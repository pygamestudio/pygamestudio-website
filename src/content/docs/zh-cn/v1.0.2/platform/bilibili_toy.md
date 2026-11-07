---
title: bilibili Toy
description: 发布到 bilibili Toy 平台 —— 在网页版构建的基础上，额外生成 Toy 容器要求的包。
---

bilibili Toy 以网页的形式在 Toy 容器里运行游戏。Pygame Studio 负责生成这个网页，并在**发布平台**选择 **bilibili Toy** 时，把游戏代码需要的 SDK 桥接一并放进包里。

上架游戏示例：[就吃100个苹果](https://www.bilibili.com/toy/IyPbFQZSMs2HrwoK/index.html)

## 打包

1. 打开 **项目 → 打包**（`Ctrl+B`），切到 **网页应用** 标签页。
2. 照常填写 **应用名称**、**应用图标**、**输出目录**。
3. 把 **发布平台** 选成 **bilibili Toy**。
4. 点击 **打包**，在控制台里确认结果。

产物结构：

```text
<输出目录>/build/Web/
├─ index.html            页面（加载运行时、显示进度与错误）
├─ game.data             加密后的项目 + 引擎
├─ pyodide/              存放游戏运行依赖的文件夹
└─ favicon.ico           浏览器标签页图标
```

## Toy 平台适配

Toy 容器只允许固定的文件类型，所以打包时会重新组织产物：

- 压缩包从 `.zip` 改名为 `.data`（`game.data`、`python_stdlib.data`），wheel 包从 `.whl` 改为 `.data`；
- 给 Pyodide 打补丁让它按新名字加载，并删除所有 `.mjs` 文件；
- 在 `index.html` 里注入平台脚本 `<script src="//s1.hdslb.com/bfs/seed/toy/app/sdk/toy-sdk.js">`，页面因此拿到 `window.toy`；
- 结束前会按白名单逐个检查文件，一旦发现会被容器丢弃的文件就**直接报错停止打包**。

允许的文件类型（其余都会导致打包失败）：

| 类别 | 扩展名 |
| --- | --- |
| 页面、代码、数据 | `.html` `.htm` `.css` `.js` `.json` `.wasm` `.data` `.md` `.csv` `.tsv` |
| 图片 | `.png` `.jpg` `.jpeg` `.gif` `.svg` `.webp` `.ico` |
| 字体 | `.woff2` `.woff` `.ttf` `.eot` |
| 音视频 | `.mp3` `.wav` `.ogg` `.m4a` `.mp4` `.webm` |

## 使用 Toy SDK

容器会注入平台的 JavaScript SDK，我们可以在引擎代码编辑器中通过`studio.sdk.toy`进行调用。调用前可以使用`available()`方法判断当前环境是否为Toy容器。

```python
import pygamestudio as studio

class ObjectScript:
    def __init__(self, obj):
        self.obj = obj

    def on_start(self):
        toy = studio.sdk.toy
        if not toy.available():
            return
        toy.get_user_profile().then(
            lambda user: self.obj.set_text('你好，' + user['nickname'])
        )
```

其他可用接口请见 [bilibili Toy SDK](/zh-cn/api/sdk/bilibili_toy/) —— 分享、云存储、分数、二维码、摄像头与麦克风、输入内容安全等等。

:::tip
可访问[官网 bilibili Toy SDK](https://www.bilibili.com/toy/publish/sdk)了解SDK用法。
:::

## 发布

1. 压缩打包好所有的文件。
![compress](/images/doc/bilibili_toy_publish0.png)

2. 访问[官网 bilibili Toy](https://www.bilibili.com/toy/intro)，点击右上角的去发布按钮。
![bilibili toy official website](/images/doc/bilibili_toy_publish1.png)

3. 上传压缩包并填写游戏其他相关信息，填写完毕后点击发布等待审核通过即可。
![upload](/images/doc/bilibili_toy_publish2.png)

:::tip
可访问[官网 bilibili Toy 使用手册](https://www.bilibili.com/toy/publish/guide)了解发布流程。
:::

## 常见问题

| 现象 | 原因与处理 |
| --- | --- |
| 打包中断，提示 *These files are not supported by Bilibili Toy and would be dropped…* | 有资源用了白名单之外的扩展名。转换成允许的格式或删掉后重新打包。 |
| 浏览器里抛 `ToyUnavailableError` | 页面不在 Toy 容器里（例如本地直接打开或本地服务器）。平台之外属于正常现象，用 `toy.available()` 判断即可。 |
| 容器里某个声音或图片不显示 | 该文件的类型不在白名单里，被平台丢弃了。 |

:::tip
可访问[官网 bilibili Toy 常见问题](https://www.bilibili.com/toy/publish/guide/faq)了解常见问题的解决方式。
:::