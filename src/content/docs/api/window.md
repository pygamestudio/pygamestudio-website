---
title: Window
description: Change the game window at runtime — title, icon, size, position, fullscreen, mouse cursor and screensaver.
---

## Title and icon

### `get_window_title()`
The text in the title bar and in the task bar.

### `set_window_icon(icon_path='')`
Sets the window icon and returns `True` when it was applied.

- `icon_path` (`str` | `pygame.Surface`): image file relative to the project folder, an already loaded surface, or `''` to restore the engine's own icon.

### `set_window_title(title)`
Sets the text in the title bar and in the task bar.

- `title` (`str`): the new window title.

## Size and position

### `center_window()`
Moves the window to the centre of the primary monitor.

### `get_desktop_size()`
Size of the primary monitor as `(width, height)`.

### `get_window_position()`
The position of the window's top-left corner on the desktop as `(x, y)`.

### `get_window_size()`
Current window size as `(width, height)`.

### `set_window_position(position)`
Moves the window's top-left corner on the desktop.

- `position` (`(int, int)`): new top-left corner of the window.

### `set_window_size(size)`
Resizes the window. `studio.get_screen()` returns the new surface afterwards, so pass it on to `studio.load_scene()`; the scene keeps drawing from the canvas origin.

- `size` (`(int, int)`): new window size.

## Fullscreen and window state

### `is_fullscreen()`
`True` while the window is fullscreen.

### `is_window_resizable()`
`True` while the window can be resized by the user.

### `minimize_window()`
Minimises the window.

### `set_fullscreen(enabled)`
Switches to fullscreen or back to a window. Does nothing when the mode already matches.

- `enabled` (`bool`): `True` = fullscreen, `False` = windowed.

### `set_window_resizable(enabled=True)`
Lets the user resize the window. The window is re-created, so `studio.get_screen()` returns the new surface; only the canvas is redrawn at the new size — the scene keeps drawing from the canvas origin. Resizing a fullscreen window keeps it fullscreen, and the screen size can still be changed with `set_window_size()`.

- `enabled` (`bool`): `True` allows resizing, `False` locks the size.

### `toggle_fullscreen()`
Flips the mode — handy for an `F11` shortcut.

## Mouse cursor and screensaver

### `is_allow_screensaver()`
`True` while the screen saver is allowed.

### `is_mouse_cursor_visible()`
`True` while the cursor is shown.

### `set_allow_screensaver(enabled)`
Allows or blocks the operating system's screen saver while the game runs.

- `enabled` (`bool`): `True` allows the screen saver, `False` blocks it.

### `set_mouse_cursor_visible(visible)`
Shows or hides the mouse cursor inside the window — useful for games played with the keyboard.

- `visible` (`bool`): `True` shows the cursor, `False` hides it.

### `set_mouse_position(position)`
Warps the pointer to a position inside the window — for example to put it back in the centre after a round.

- `position` (`(int, int)`): new pointer position inside the window.
