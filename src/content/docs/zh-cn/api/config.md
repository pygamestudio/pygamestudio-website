---
title: 项目配置
description: 在运行时读取工程设置 —— 窗口尺寸、标题、当前场景与打包选项。
---

**使用方式：** 启动时调用 `studio.get_project_config()`，一般在 `main.py` 中使用。

```python
import pygamestudio as studio

class Game(studio.Game):
    def on_start(self):
        config = studio.get_project_config()
        studio.set_window_title(config['caption'])
        print(config['screen_width'], config['screen_height'])
```

## 函数

#### `get_project_config()`
返回工程的完整设置字典。找不到或无法读取 `project.pygs` 时抛出 `RuntimeError`——只有在文件被手动移动或改写时才会发生。文件位于工程根目录；在[受保护的打包版本](/zh-cn/tutorial/build_game/)中会被加密，读取时自动解密，用法完全一致。

#### `get_project_path()`
当前工程根目录的路径；不在工程中运行时返回 `''`。

## 设置项

#### `asset`
资源面板设置（`current_scene`、`sort_type`）。类型 `dict`。

#### `asset.current_scene`
调用 `studio.load_scene()` 且未指定路径时加载的场景。类型 `str`。

#### `asset.sort_type`
资源面板的排序方式——仅编辑器使用。类型 `int`。

#### `build`
[打包窗口](/zh-cn/tutorial/build_game/)中的选项：`app_name`、`app_icon`、`output_dir`。类型 `dict`。

#### `build.android_build_type`
[安卓打包](/zh-cn/editor_introduction/build_window/)的构建类型：`debug` 或 `release`。类型 `str`。

#### `build.android_key_alias`
发布版签名文件里使用的密钥别名。类型 `str`。

#### `build.android_keystore`
发布版签名文件（`.jks` / `.keystore`）的路径。两个密码属于本机的编辑器设置，不会写进工程。类型 `str`。

#### `build.android_orientation`
屏幕方向：`sensor_landscape`（横屏，可翻转 180°）或 `sensor_portrait`（竖屏，可翻转 180°）。类型 `str`。

#### `build.android_package`
安卓包名，形如 `org.pygamestudio.mygame`。类型 `str`。

#### `build.android_version_code`
安卓版本号（整数），每次上架都要比上一版大。类型 `int`。

#### `build.android_version_name`
安卓版本名，例如 `1.0.0`。类型 `str`。

#### `caption`
工程名称。它是游戏窗口的初始标题，也是打包时默认的应用名称。类型 `str`。

#### `desktop_display_mode`
桌面端的适配方式：`window`（窗口大小等于画布大小，默认）或 `fixed_width` / `fixed_height` / `exact_fit`（进入全屏并按该方式缩放）。类型 `str`。

#### `screen_scale_filter`
画布被缩放时使用的算法：`nearest`（默认，像素风清晰）或 `smooth`（平滑）。类型 `str`。

#### `screen_scale_mode`
手机端的适配方式：`fixed_width`（默认）、`fixed_height`、`exact_fit` 或 `none`（1:1，不缩放）。旧工程里的旧值会被自动换算成其中之一。类型 `str`。

#### `screen_scaled`
设为 `false` 时，手机端完全不做缩放。类型 `bool`。

#### `screen_size`
`[screen_width, screen_height]`，即传给 `pygame.display.set_mode()` 的尺寸。类型 `list`。

#### `screen_width`、`screen_height`
窗口宽度、高度（像素）。类型 `int`。

#### `web_scale_mode`
网页端的适配方式：`none`（默认，画布按原尺寸居中显示）、`fixed_width`、`fixed_height` 或 `exact_fit`。类型 `str`。
