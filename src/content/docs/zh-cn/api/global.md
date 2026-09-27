---
title: 全局
description: Game 类的主循环与全部 on_* 事件回调，以及 quit()、set_fps()、get_screen() 等全局函数。
---

本页罗列了游戏入口`main.py`中的接口细节。

## `Game` 类

### `on_quit()`
循环结束后、pygame 关闭前执行一次。

### `on_start()`
在循环开始前执行一次。

### `on_update(dt)`
每帧执行。

- `dt`（`float`）：距上一帧的秒数。

### `run()`
启动游戏：初始化 pygame、确定工程目录、调用 `on_start()`，然后循环直到窗口关闭。

## 键盘回调

### `on_key_down(key, mod, unicode, scancode, window)`
按下按键时触发。

- `key`（`int`）：`studio.K_*` 常量。
- `mod`（`int`）：按下的修饰键（`studio.KMOD_*`）。
- `unicode`（`str`）：对应字符（方向键等可能为空）。
- `scancode`（`int`）：物理按键码。
- `window`（`pygame.Window` | `None`）：事件所属窗口，没有窗口时为 `None`。

### `on_key_up(key, mod, unicode, scancode, window)`
释放按键时触发。

- `key`（`int`）：`studio.K_*` 常量。
- `mod`（`int`）：按下的修饰键（`studio.KMOD_*`）。
- `unicode`（`str`）：对应字符（方向键等可能为空）。
- `scancode`（`int`）：物理按键码。
- `window`（`pygame.Window` | `None`）：事件所属窗口，没有窗口时为 `None`。

## 鼠标回调

### `on_mouse_button_down(pos, btn, touch, clicks, window)`
按下鼠标按键时触发。

- `pos`（`(int, int)`）：指针位置（窗口坐标）。
- `btn`（`int`）：`1` 左键、`2` 中键、`3` 右键、`4`/`5` 滚轮。
- `touch`（`int`）：鼠标为 `0`。
- `clicks`（`int`）：用于识别双击。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_mouse_button_up(pos, btn, touch, clicks, window)`
释放鼠标按键时触发。

- `pos`（`(int, int)`）：指针位置（窗口坐标）。
- `btn`（`int`）：`1` 左键、`2` 中键、`3` 右键、`4`/`5` 滚轮。
- `touch`（`int`）：鼠标为 `0`。
- `clicks`（`int`）：用于识别双击。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_mouse_motion(pos, rel, buttons, touch, window)`
指针移动时触发。

- `pos`（`(int, int)`）：指针位置（窗口坐标）。
- `rel`（`(int, int)`）：相对上次事件的位移。
- `buttons`（`tuple`）：各按键的按下状态。
- `touch`（`int`）：鼠标为 `0`。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_mouse_wheel(flipped, x, y, touch, precise_x, precise_y, window)`
滚轮滚动时触发。

- `flipped`（`bool`）：滚动方向是否被翻转。
- `x`（`int`）：水平滚动量。
- `y`（`int`）：向上滚动时为正。
- `touch`（`int`）：鼠标为 `0`。
- `precise_x`（`float`）：触摸板的精细水平滚动量。
- `precise_y`（`float`）：触摸板的精细垂直滚动量。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

## 手柄与控制器回调

### `on_controller_added(device_index)`
手柄（Game Controller API）接入。

- `device_index`（`int`）：设备索引。

### `on_controller_remapped(instance_id)`
手柄按键映射发生变化。

- `instance_id`（`int`）：设备实例索引。

### `on_controller_removed(instance_id)`
手柄（Game Controller API）移除。

- `instance_id`（`int`）：设备实例索引。

### `on_joy_axis_motion(instance_id, axis, value)`
摇杆 / 扳机移动。

- `instance_id`（`int`）：设备实例索引。
- `axis`（`int`）：轴索引。
- `value`（`float`）：轴的位置，`-1.0`-`1.0`。

### `on_joy_ball_motion(instance_id, ball, rel)`
轨迹球移动。

- `instance_id`（`int`）：设备实例索引。
- `ball`（`int`）：轨迹球索引。
- `rel`（`(int, int)`）：相对位移。

### `on_joy_button_down(instance_id, button)`
手柄按键按下。

- `instance_id`（`int`）：设备实例索引。
- `button`（`int`）：按键索引。

### `on_joy_button_up(instance_id, button)`
手柄按键释放。

- `instance_id`（`int`）：设备实例索引。
- `button`（`int`）：按键索引。

### `on_joy_device_added(device_index)`
手柄接入。

- `device_index`（`int`）：设备索引。

### `on_joy_device_removed(instance_id)`
手柄拔出。

- `instance_id`（`int`）：设备实例索引。

### `on_joy_hat_motion(instance_id, hat, value)`
方向键（帽键）变化。

- `instance_id`（`int`）：设备实例索引。
- `hat`（`int`）：帽键索引。
- `value`（`(int, int)`）：帽键方向。

## 窗口回调

### `on_window_close()`
窗口收到关闭请求时。

### `on_window_display_changed(display_index)`
窗口移到另一台显示器。

- `display_index`（`int`）：新显示器索引。

### `on_window_enter()`
鼠标指针进入窗口时。

### `on_window_exposed()`
窗口需要重绘时。

### `on_window_focus_gained()`
窗口获得焦点时。

### `on_window_focus_lost()`
窗口失去焦点时。

### `on_window_hidden()`
窗口隐藏时。

### `on_window_hit_test()`
窗口命中测试（点击穿透）请求时。

### `on_window_icc_changed()`
窗口的 ICC 颜色配置变化时。

### `on_window_leave()`
鼠标指针离开窗口时。

### `on_window_maximized()`
窗口最大化时。

### `on_window_minimized()`
窗口最小化时。

### `on_window_moved(x, y)`
窗口移动。

- `x`（`int`）：新的 x 位置。
- `y`（`int`）：新的 y 位置。

### `on_window_resized(x, y)`
窗口调整完成。

- `x`（`int`）：新的宽度。
- `y`（`int`）：新的高度。

### `on_window_restored()`
窗口从最小化 / 最大化恢复时。

### `on_window_shown()`
窗口显示时。

### `on_window_size_changed(x, y)`
窗口尺寸变化。

- `x`（`int`）：新的宽度。
- `y`（`int`）：新的高度。

### `on_window_take_focus()`
窗口被要求获取焦点时。

## 文本、拖放与触摸回调

### `on_drop_begin(window)`
从系统拖入的文件进入窗口时。

- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_drop_complete(window)`
拖入的文件离开窗口时。

- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_drop_file(file_path, window)`
有文件被拖放到窗口上。

- `file_path`（`str`）：被拖放文件的路径。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_drop_text(text, window)`
有文本被拖放到窗口上。

- `text`（`str`）：被拖放的文本。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_finger_down(touch_id, finger_id, x, y, dx, dy, window)`
触摸开始。

- `touch_id`（`int`）：触摸设备。
- `finger_id`（`int`）：手指编号。
- `x`（`float`）：触摸位置。
- `y`（`float`）：触摸位置。
- `dx`（`float`）：相对上次事件的位移。
- `dy`（`float`）：相对上次事件的位移。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_finger_motion(touch_id, finger_id, x, y, dx, dy, window)`
触摸移动。

- `touch_id`（`int`）：触摸设备。
- `finger_id`（`int`）：手指编号。
- `x`（`float`）：触摸位置。
- `y`（`float`）：触摸位置。
- `dx`（`float`）：相对上次事件的位移。
- `dy`（`float`）：相对上次事件的位移。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_finger_up(touch_id, finger_id, x, y, dx, dy, window)`
触摸结束。

- `touch_id`（`int`）：触摸设备。
- `finger_id`（`int`）：手指编号。
- `x`（`float`）：触摸位置。
- `y`（`float`）：触摸位置。
- `dx`（`float`）：相对上次事件的位移。
- `dy`（`float`）：相对上次事件的位移。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_multi_gesture(touch_id, x, y, pinched, rotated, num_fingers, window)`
双指缩放 / 旋转手势。

- `touch_id`（`int`）：触摸设备。
- `x`（`float`）：手势中心位置。
- `y`（`float`）：手势中心位置。
- `pinched`（`float`）：双指捏合的幅度。
- `rotated`（`float`）：手势旋转角度（度）。
- `num_fingers`（`int`）：手指数量。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_text_editing(text, start, length, window)`
输入法正在组字。

- `text`（`str`）：正在组装的文本。
- `start`（`int`）：被编辑文本的起始位置。
- `length`（`int`）：被编辑文本的长度。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

### `on_text_input(text, window)`
输入了一个字符。获得焦点的输入框会优先接收文本。

- `text`（`str`）：输入的字符。
- `window`（`pygame.Window` | `None`）：事件所属窗口。

## 音频设备、应用状态与其他回调

### `on_app_did_background()`
应用已进入后台（移动端）。

### `on_app_did_foreground()`
应用已回到前台（移动端）。

### `on_app_low_memory()`
系统内存不足。

### `on_app_terminating()`
系统即将关闭应用。

### `on_app_will_background()`
应用即将进入后台（移动端）。

### `on_app_will_foreground()`
应用即将回到前台（移动端）。

### `on_audio_added(which, is_capture)`
音频设备接入。

- `which`（`int`）：设备索引。
- `is_capture`（`bool`）：`True` 表示录音设备。

### `on_audio_removed(which, is_capture)`
音频设备移除。

- `which`（`int`）：设备索引。
- `is_capture`（`bool`）：`True` 表示录音设备。

### `on_clipboard_update()`
剪贴板发生变化。

### `on_keymap_changed()`
键盘布局发生变化。

### `on_locale_changed()`
系统语言发生变化。

### `on_render_device_reset()`
渲染设备丢失——如果直接使用了纹理，需要重新加载。

### `on_render_target_reset()`
渲染目标丢失——如果直接使用了纹理，需要重新加载。

### `on_user_event(event)`
以上都未处理的事件，例如用 `pygame.event.post()` 投递的事件。

- `event`（`pygame.event.Event`）：原始的 pygame 事件。

## 全局函数

### `get_delta_time()`
上一帧经过的秒数——与 `on_update(dt)` 收到的 `dt` 相同。在事件回调里（没有 `dt` 参数）格外好用。

### `get_elapsed_time()`
游戏开始运行至今的秒数。

### `get_fps()`
主循环的目标帧率（默认 `60`）。

### `get_frame_count()`
游戏开始运行至今已经渲染的帧数。

### `get_mouse_position()`
鼠标指针在窗口内的位置 `(x, y)`。

### `get_pressed_buttons()`
鼠标按键的按下状态：`(左键, 中键, 右键)`。

### `get_pressed_keys()`
键盘各按键的按下状态，用 `studio.K_*` 常量作为下标。

### `get_screen()`
游戏渲染使用的画面。把它交给 `studio.load_scene(screen)`；调用 `studio.set_window_size()` 后它会自动返回新的画面。

### `is_key_pressed(key)`
某个键当前是否被按住，例如 `studio.is_key_pressed(studio.K_SPACE)`。

- `key`（`int`）：`studio.K_*` 常量。

### `is_mouse_button_pressed(button=1)`
某个鼠标键当前是否被按住。

- `button`（`int`）：`1` 左键、`2` 中键、`3` 右键。

### `is_running()`
主循环是否正在运行。

### `quit()`
结束游戏主循环（`on_quit()` 仍会执行）。

### `set_fps(value)`
设置主循环的目标帧率。

- `value`（`int`）：帧率。
