---
title: 项目配置
description: 在运行时读取工程设置 —— 窗口尺寸、标题、当前场景与打包选项。
---

## 函数

### `get_project_config()`
返回工程的完整设置字典。找不到或无法读取 `project.pygs` 时抛出 `RuntimeError`——只有在文件被手动移动或改写时才会发生。文件位于工程根目录；在[受保护的打包版本](/zh-cn/tutorial/build_game/)中会被加密，读取时自动解密，用法完全一致。

## 设置项

### `asset`
资源面板设置（`current_scene`、`sort_type`）。类型 `dict`。

### `asset.current_scene`
调用 `studio.load_scene()` 且未指定路径时加载的场景。类型 `str`。

### `asset.sort_type`
资源面板的排序方式——仅编辑器使用。类型 `int`。

### `build`
[打包窗口](/zh-cn/tutorial/build_game/)中的选项：`app_name`、`app_icon`、`output_dir`。类型 `dict`。

### `caption`
工程名称。它是游戏窗口的初始标题，也是打包时默认的应用名称。类型 `str`。

### `screen_size`
`[screen_width, screen_height]`，即传给 `pygame.display.set_mode()` 的尺寸。类型 `list`。

### `screen_width`、`screen_height`
窗口宽度、高度（像素）。类型 `int`。
