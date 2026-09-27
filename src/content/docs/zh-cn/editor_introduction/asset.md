---
title: 资源管理器
---

左下角的 **资源管理器（Asset）** 是项目的文件管理器。游戏需要加载的一切 —— 图片、字体、音频、脚本与场景 —— 都放在这里。

![资源管理器](/images/doc/asset_window.png)

## 项目目录结构

新建项目时默认生成如下结构：

```text
MyGame/
├─ audio/        音效与音乐
├─ font/         .ttf 字体
├─ image/        图片
├─ scene/        .scene 场景文件
├─ script/       Python 脚本
├─ main.py       游戏入口
└─ project.pygs  项目配置（不会显示在资源管理器中）
```

## 工具栏

| 控件 | 作用 |
| --- | --- |
| **添加** | 新建 **文件夹（Folder）**、**脚本（Script）**、**场景（Scene）** 或 **文本文件。 |
| **排序** | 按名称、类型、大小或时间升/降序排列目录和文件。 |
| **刷新** | 重新从磁盘读取项目文件夹。 |
| **搜索** | 按文件名过滤。 |
| **分离** | 让资源管理器变成独立窗口，再次点击按钮或关闭独立窗口可停靠回来。 |

## 打开文件

| 文件 | 打开方式 |
| --- | --- |
| `.py` 脚本 | [代码编辑器](/zh-cn/editor_introduction/code_editor/) |
| `.scene` | 在[场景编辑器](/zh-cn/editor_introduction/scene/)中加载该场景 |
| 图片 | 内置[图片编辑器](/zh-cn/editor_introduction/image_editor/) |
| 音频 | [音频播放器](/zh-cn/editor_introduction/audio_player/) |
| 其它文本文件（`.json`、`.txt`、`.md` 等） | [代码编辑器](/zh-cn/editor_introduction/code_editor/) |
| 其它类型 | 系统默认程序 |

## 导入与移动文件

- **把文件或文件夹从编辑器外部拖进资源管理器**，即可复制到项目中 —— 导入美术素材、音效或整套资源包时最方便。若存在同名文件，会先询问是否覆盖。
- 在资源管理器内部拖动文件，可以在文件夹之间移动。
- **创建副本** 即复制文件；**删除** 文件的话会先弹确认框，被删除的文件会进入回收站。
- **复制路径 / 名称 / UUID** 可以把选中文件的标识复制到剪贴板。

:::note
脚本不是靠文件名称与对象绑定的，需要在[属性检查器](/zh-cn/editor_introduction/inspector/)的 **脚本路径** 一行手动挂载，详见[创建对象](/zh-cn/tutorial/create_an_object/)。
:::
