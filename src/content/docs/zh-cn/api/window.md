---
title: 窗口
description: 在运行时修改游戏窗口 —— 标题、图标、尺寸、位置、全屏、鼠标光标与屏幕保护程序。
---

## 标题与图标

### `get_window_title()`
当前标题栏与任务栏中的文字。

### `set_window_icon(icon_path='')`
用工程中的图片设置窗口图标，设置成功返回 `True`。

- `icon_path`（`str` | `pygame.Surface`）：相对于工程目录的图片文件、已经加载好的画面，或传 `''` 恢复引擎自带图标。

### `set_window_title(title)`
设置标题栏与任务栏中的文字。

- `title`（`str`）：新的窗口标题。

## 尺寸与位置

### `center_window()`
把窗口移到主显示器中央。

### `get_desktop_size()`
主显示器尺寸 `(宽, 高)`。

### `get_window_position()`
窗口左上角在桌面上的位置 `(x, y)`。

### `get_window_size()`
当前窗口尺寸 `(宽, 高)`。

### `set_window_position(position)`
设置窗口左上角在桌面上的位置。

- `position`（`(int, int)`）：窗口新的左上角位置。

### `set_window_size(size)`
调整窗口大小。之后 `studio.get_screen()` 会返回新的画面，请把它继续传给 `studio.load_scene()`；场景仍从画布原点开始绘制。

- `size`（`(int, int)`）：新的窗口尺寸。

## 全屏与窗口状态

### `is_fullscreen()`
处于全屏时为 `True`。

### `is_window_resizable()`
窗口当前是否允许玩家缩放。

### `minimize_window()`
最小化窗口。

### `set_fullscreen(enabled)`
切换到全屏或窗口模式，模式相同时不做任何事。

- `enabled`（`bool`）：`True` 全屏，`False` 窗口模式。

### `set_window_resizable(enabled=True)`
允许玩家缩放窗口。窗口会被重建，因此 `studio.get_screen()` 会返回新的画面；新尺寸下只有画布重绘，场景依然从画布原点开始绘制。全屏状态下调整尺寸会保持全屏，仍然可以用 `set_window_size()` 改变分辨率。

- `enabled`（`bool`）：`True` 允许缩放，`False` 锁定窗口尺寸。

### `toggle_fullscreen()`
在两个模式之间切换——很适合绑定 `F11`。

## 鼠标光标与屏幕保护程序

### `is_allow_screensaver()`
允许屏幕保护程序时为 `True`。

### `is_mouse_cursor_visible()`
光标显示中时为 `True`。

### `set_allow_screensaver(enabled)`
允许或阻止操作系统的屏幕保护程序在游戏运行期间启动。

- `enabled`（`bool`）：`True` 允许，`False` 阻止。

### `set_mouse_cursor_visible(visible)`
显示或隐藏窗口内的鼠标光标——纯键盘操作的游戏很需要。

- `visible`（`bool`）：`True` 显示光标，`False` 隐藏。

### `set_mouse_position(position)`
把鼠标指针移到窗口内的指定位置——例如一轮结束后把它放回画面中心。

- `position`（`(int, int)`）：窗口内新的指针位置。
