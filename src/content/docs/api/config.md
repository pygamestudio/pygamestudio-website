---
title: Project Config
description: Read the project settings of a game at runtime — window size, caption, current scene and build options.
---

## Function

### `get_project_config()`
Returns the whole settings dictionary of the project. Raises `RuntimeError` when `project.pygs` cannot be found or read — this only happens when the file was moved or edited by hand outside the editor. The file lives in the project root; in a [protected build](/tutorial/build_game/) it is encrypted and decrypted on the fly, so reading it works exactly the same.

### `get_project_path()`
Path of the current project root; `''` when not running inside a project.

## Settings

### `asset`
Asset panel settings (`current_scene`, `sort_type`). Type `dict`.

### `asset.current_scene`
Path of the scene loaded when `studio.load_scene()` is called without a path. Type `str`.

### `asset.sort_type`
Sort order of the asset panel — editor only. Type `int`.

### `build`
Options of the [Build window](/tutorial/build_game/): `app_name`, `app_icon`, `output_dir`. Type `dict`.

### `caption`
The project name. It is the initial window title and the default application name for a build. Type `str`.

### `screen_size`
`[screen_width, screen_height]` — the size passed to `pygame.display.set_mode()`. Type `list`.

### `screen_width`, `screen_height`
Window width and height in pixels. Type `int`.
