---
title: Project Config
description: Read the project settings of a game at runtime — window size, caption, current scene and build options.
---

**How it is used:** `studio.get_project_config()` at start-up, usually in `main.py`.

```python
import pygamestudio as studio

class Game(studio.Game):
    def on_start(self):
        config = studio.get_project_config()
        studio.set_window_title(config['caption'])
        print(config['screen_width'], config['screen_height'])
```

## Function

#### `get_project_config()`
Returns the whole settings dictionary of the project. Raises `RuntimeError` when `project.pygs` cannot be found or read — this only happens when the file was moved or edited by hand outside the editor. The file lives in the project root; in a [protected build](/tutorial/build_game/) it is encrypted and decrypted on the fly, so reading it works exactly the same.

#### `get_project_path()`
Path of the current project root; `''` when not running inside a project.

## Settings

#### `asset`
Asset panel settings (`current_scene`, `sort_type`). Type `dict`.

#### `asset.current_scene`
Path of the scene loaded when `studio.load_scene()` is called without a path. Type `str`.

#### `asset.sort_type`
Sort order of the asset panel — editor only. Type `int`.

#### `build`
Options of the [Build window](/tutorial/build_game/): `app_name`, `app_icon`, `output_dir`. Type `dict`.

#### `build.android_build_type`
Build type of the [Android build](/editor_introduction/build_window/): `debug` or `release`. Type `str`.

#### `build.android_key_alias`
Alias of the key pair inside the release keystore. Type `str`.

#### `build.android_keystore`
Path of the release keystore (`.jks` / `.keystore`). The two passwords are editor settings on this machine and never part of the project. Type `str`.

#### `build.android_orientation`
Screen orientation: `sensor_landscape` (landscape, flips 180°) or `sensor_portrait` (portrait, flips 180°). Type `str`.

#### `build.android_package`
Android package name, like `org.pygamestudio.mygame`. Type `str`.

#### `build.android_version_code`
Android version code (an integer that has to grow with every store update). Type `int`.

#### `build.android_version_name`
Android version name, e.g. `1.0.0`. Type `str`.

#### `caption`
The project name. It is the initial window title and the default application name for a build. Type `str`.

#### `desktop_display_mode`
How a desktop run fits the canvas: `window` (the canvas at its own size in a window, the default) or `fixed_width` / `fixed_height` / `exact_fit` (full screen, scaled that way). Type `str`.

#### `screen_scale_filter`
Scaling algorithm used whenever the canvas is scaled: `nearest` (default, keeps pixel art crisp) or `smooth`. Type `str`.

#### `screen_scale_mode`
How a phone fits the canvas into the screen: `fixed_width` (default), `fixed_height`, `exact_fit` or `none` (1:1, no scaling). Values from older projects are mapped to one of these. Type `str`.

#### `screen_scaled`
`false` turns canvas scaling off on phones entirely. Type `bool`.

#### `screen_size`
`[screen_width, screen_height]` — the size passed to `pygame.display.set_mode()`. Type `list`.

#### `screen_width`, `screen_height`
Window width and height in pixels. Type `int`.

#### `web_scale_mode`
How the web build scales the canvas on the page: `none` (default — canvas at its own size, centred), `fixed_width`, `fixed_height` or `exact_fit`. Type `str`.
