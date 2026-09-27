---
title: Global
description: The Game class with its main loop and every on_* event hook, plus the global helpers quit(), set_fps(), get_screen() and friends.
---

This page provides a list of the interface details in the game entry point `main.py`.

## The `Game` class

### `on_quit()`
Called once after the loop ends, just before pygame shuts down.

### `on_start()`
Called once, before the loop starts.

### `on_update(dt)`
Called every frame.

- `dt` (`float`): seconds since the last frame.

### `run()`
Starts the game: initialises pygame, resolves the project folder, calls `on_start()` and then loops until the window is closed.

## Keyboard hooks

### `on_key_down(key, mod, unicode, scancode, window)`
Fired when a key is pressed.

- `key` (`int`): one of the `studio.K_*` constants.
- `mod` (`int`): the pressed modifiers (`studio.KMOD_*`).
- `unicode` (`str`): the character (may be empty for e.g. arrows).
- `scancode` (`int`): the physical key.
- `window` (`pygame.Window` | `None`): the window of the event, `None` when there is none.

### `on_key_up(key, mod, unicode, scancode, window)`
Fired when a key is released.

- `key` (`int`): one of the `studio.K_*` constants.
- `mod` (`int`): the pressed modifiers (`studio.KMOD_*`).
- `unicode` (`str`): the character (may be empty for e.g. arrows).
- `scancode` (`int`): the physical key.
- `window` (`pygame.Window` | `None`): the window of the event, `None` when there is none.

## Mouse hooks

### `on_mouse_button_down(pos, btn, touch, clicks, window)`
Fired when a mouse button goes down.

- `pos` (`(int, int)`): pointer position in window coordinates.
- `btn` (`int`): `1` left, `2` middle, `3` right, `4`/`5` the scroll wheel.
- `touch` (`int`): `0` for a mouse.
- `clicks` (`int`): counts a double click.
- `window` (`pygame.Window` | `None`): the window of the event.

### `on_mouse_button_up(pos, btn, touch, clicks, window)`
Fired when a mouse button is released.

- `pos` (`(int, int)`): pointer position in window coordinates.
- `btn` (`int`): `1` left, `2` middle, `3` right, `4`/`5` the scroll wheel.
- `touch` (`int`): `0` for a mouse.
- `clicks` (`int`): counts a double click.
- `window` (`pygame.Window` | `None`): the window of the event.

### `on_mouse_motion(pos, rel, buttons, touch, window)`
Fired when the pointer moves.

- `pos` (`(int, int)`): pointer position in window coordinates.
- `rel` (`(int, int)`): movement since the last event.
- `buttons` (`tuple`): state of the buttons.
- `touch` (`int`): `0` for a mouse.
- `window` (`pygame.Window` | `None`): the window of the event.

### `on_mouse_wheel(flipped, x, y, touch, precise_x, precise_y, window)`
Fired when the wheel is turned.

- `flipped` (`bool`): whether the scroll direction is flipped.
- `x` (`int`): horizontal scroll.
- `y` (`int`): positive when scrolling up.
- `touch` (`int`): `0` for a mouse.
- `precise_x` (`float`): precise horizontal scroll of touch pads.
- `precise_y` (`float`): precise vertical scroll of touch pads.
- `window` (`pygame.Window` | `None`): the window of the event.

## Joystick and controller hooks

### `on_controller_added(device_index)`
A game controller (Game Controller API) was plugged in.

- `device_index` (`int`): index of the device.

### `on_controller_remapped(instance_id)`
A game controller's button mapping changed.

- `instance_id` (`int`): index of the device instance.

### `on_controller_removed(instance_id)`
A game controller was removed.

- `instance_id` (`int`): index of the device instance.

### `on_joy_axis_motion(instance_id, axis, value)`
An analogue stick/trigger moved.

- `instance_id` (`int`): index of the device instance.
- `axis` (`int`): index of the axis.
- `value` (`float`): position of the axis, `-1.0`-`1.0`.

### `on_joy_ball_motion(instance_id, ball, rel)`
A trackball moved.

- `instance_id` (`int`): index of the device instance.
- `ball` (`int`): index of the trackball.
- `rel` (`(int, int)`): relative movement.

### `on_joy_button_down(instance_id, button)`
A joystick button was pressed.

- `instance_id` (`int`): index of the device instance.
- `button` (`int`): index of the button.

### `on_joy_button_up(instance_id, button)`
A joystick button was released.

- `instance_id` (`int`): index of the device instance.
- `button` (`int`): index of the button.

### `on_joy_device_added(device_index)`
A joystick was plugged in.

- `device_index` (`int`): index of the device.

### `on_joy_device_removed(instance_id)`
A joystick was unplugged.

- `instance_id` (`int`): index of the device instance.

### `on_joy_hat_motion(instance_id, hat, value)`
A d-pad changed.

- `instance_id` (`int`): index of the device instance.
- `hat` (`int`): index of the hat.
- `value` (`(int, int)`): direction of the hat.

## Window hooks

### `on_window_close()`
The window received a close request.

### `on_window_display_changed(display_index)`
The window moved to another display.

- `display_index` (`int`): index of the new display.

### `on_window_enter()`
The pointer entered the window.

### `on_window_exposed()`
The window needs to be redrawn.

### `on_window_focus_gained()`
The window gained the input focus.

### `on_window_focus_lost()`
The window lost the input focus.

### `on_window_hidden()`
The window was hidden.

### `on_window_hit_test()`
A hit-test request for the window (click-through).

### `on_window_icc_changed()`
The window's ICC colour profile changed.

### `on_window_leave()`
The pointer left the window.

### `on_window_maximized()`
The window was maximised.

### `on_window_minimized()`
The window was minimised.

### `on_window_moved(x, y)`
The window moved.

- `x` (`int`): new x position.
- `y` (`int`): new y position.

### `on_window_resized(x, y)`
A window resize finished.

- `x` (`int`): new width.
- `y` (`int`): new height.

### `on_window_restored()`
The window was restored from being minimised or maximised.

### `on_window_shown()`
The window was shown.

### `on_window_size_changed(x, y)`
The window size changed.

- `x` (`int`): new width.
- `y` (`int`): new height.

### `on_window_take_focus()`
The window was asked to take the focus.

## Text, drops and touch hooks

### `on_drop_begin(window)`
A file drag from the operating system enters the window.

- `window` (`pygame.Window` | `None`): the window of the event.

### `on_drop_complete(window)`
The file drag leaves the window.

- `window` (`pygame.Window` | `None`): the window of the event.

### `on_drop_file(file_path, window)`
A file was dropped onto the window.

- `file_path` (`str`): path of the dropped file.
- `window` (`pygame.Window` | `None`): the window of the event.

### `on_drop_text(text, window)`
Text was dropped onto the window.

- `text` (`str`): the dropped text.
- `window` (`pygame.Window` | `None`): the window of the event.

### `on_finger_down(touch_id, finger_id, x, y, dx, dy, window)`
Touch began.

- `touch_id` (`int`): the touch device.
- `finger_id` (`int`): the finger.
- `x` (`float`): touch position.
- `y` (`float`): touch position.
- `dx` (`float`): movement since the last event.
- `dy` (`float`): movement since the last event.
- `window` (`pygame.Window` | `None`): the window of the event.

### `on_finger_motion(touch_id, finger_id, x, y, dx, dy, window)`
A touch moved.

- `touch_id` (`int`): the touch device.
- `finger_id` (`int`): the finger.
- `x` (`float`): touch position.
- `y` (`float`): touch position.
- `dx` (`float`): movement since the last event.
- `dy` (`float`): movement since the last event.
- `window` (`pygame.Window` | `None`): the window of the event.

### `on_finger_up(touch_id, finger_id, x, y, dx, dy, window)`
A touch ended.

- `touch_id` (`int`): the touch device.
- `finger_id` (`int`): the finger.
- `x` (`float`): touch position.
- `y` (`float`): touch position.
- `dx` (`float`): movement since the last event.
- `dy` (`float`): movement since the last event.
- `window` (`pygame.Window` | `None`): the window of the event.

### `on_multi_gesture(touch_id, x, y, pinched, rotated, num_fingers, window)`
Pinch/rotate gesture.

- `touch_id` (`int`): the touch device.
- `x` (`float`): centre of the gesture.
- `y` (`float`): centre of the gesture.
- `pinched` (`float`): how much the fingers pinched.
- `rotated` (`float`): rotation of the gesture in degrees.
- `num_fingers` (`int`): number of fingers.
- `window` (`pygame.Window` | `None`): the window of the event.

### `on_text_editing(text, start, length, window)`
An IME composition is in progress.

- `text` (`str`): the text being composed.
- `start` (`int`): start of the selection being edited.
- `length` (`int`): length of the selection being edited.
- `window` (`pygame.Window` | `None`): the window of the event.

### `on_text_input(text, window)`
A character was typed. Input boxes that have focus consume the text first.

- `text` (`str`): the typed character.
- `window` (`pygame.Window` | `None`): the window of the event.

## Audio device, app and misc hooks

### `on_app_did_background()`
The app went to the background (mobile).

### `on_app_did_foreground()`
The app returned to the foreground (mobile).

### `on_app_low_memory()`
The OS is low on memory.

### `on_app_terminating()`
The OS is shutting the app down.

### `on_app_will_background()`
The app is about to go to the background (mobile).

### `on_app_will_foreground()`
The app is about to return to the foreground (mobile).

### `on_audio_added(which, is_capture)`
An audio device appeared.

- `which` (`int`): index of the device.
- `is_capture` (`bool`): `True` for a recording device.

### `on_audio_removed(which, is_capture)`
An audio device disappeared.

- `which` (`int`): index of the device.
- `is_capture` (`bool`): `True` for a recording device.

### `on_clipboard_update()`
The clipboard changed.

### `on_keymap_changed()`
The keyboard layout changed.

### `on_locale_changed()`
The system language changed.

### `on_render_device_reset()`
The render device was lost — reload textures if you use them directly.

### `on_render_target_reset()`
The render target was lost — reload textures if you use them directly.

### `on_user_event(event)`
Any event that is not handled above, e.g. one posted with `pygame.event.post()`.

- `event` (`pygame.event.Event`): the raw pygame event.

## Global functions

### `get_delta_time()`
The duration of the last frame in seconds — the same `dt` that `on_update(dt)` receives. Handy inside event hooks, which have no `dt` parameter.

### `get_elapsed_time()`
Seconds since the game started.

### `get_fps()`
The frame rate the main loop targets (default `60`).

### `get_frame_count()`
Number of frames drawn since the game started.

### `get_mouse_position()`
The pointer position `(x, y)` inside the window.

### `get_pressed_buttons()`
Pressed state of the mouse buttons: `(left, middle, right)`.

### `get_pressed_keys()`
Tuple-like key state of the keyboard, indexed with the `studio.K_*` constants.

### `get_screen()`
The surface the game renders to. Pass it to `studio.load_scene(screen)`; after `studio.set_window_size()` it returns the new surface automatically.

### `is_key_pressed(key)`
`True` while that key is held, e.g. `studio.is_key_pressed(studio.K_SPACE)`.

- `key` (`int`): a `studio.K_*` constant.

### `is_mouse_button_pressed(button=1)`
`True` while that mouse button is held.

- `button` (`int`): `1` left, `2` middle, `3` right.

### `is_running()`
`True` while the main loop is running.

### `quit()`
Ends the game loop (`on_quit()` still runs).

### `set_fps(value)`
Sets the target frame rate.

- `value` (`int`): frames per second.
