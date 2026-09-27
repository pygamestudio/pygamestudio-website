---
title: 场景
description: 加载与切换场景，按路径或 uuid 查找对象，在游戏运行时创建与移除对象，遍历对象层级。
---

## 加载场景

### `load_scene(screen_surface, scene_path='')`
把当前场景绘制到给定画面上；如果它还不是已加载的场景，则先加载它。请在 `Game.on_update` 中每帧调用一次。

- `screen_surface`（`pygame.Surface`）：`studio.get_screen()` 得到的画面。
- `scene_path`（`str`）：相对于工程目录的 `.scene` 文件，留空时使用工程中标记为**当前场景（Current Scene）**的场景（见[项目配置](/zh-cn/api/config/)）。

再次传入同一文件时只是重绘（脚本的 `on_update(dt)` 每帧执行，`on_start()` 只执行一次）；传入不同的路径则会切换场景——旧场景先被清理（其脚本收到 `on_destroy()`），新场景根据文件重新构建对象树、挂载脚本并触发它们的 `on_start()`。

## 查找对象

### `get_object_by_path(object_path)`
按层级路径查找对象，找不到返回 `None`。带序号的形式比较脆弱——新增、删除或调整对象顺序都会改变序号。

- `object_path`（`str`）：从画布开始、自上而下的对象名称链，用 `/` 分隔。

### `get_object_by_uuid(object_uuid)`
按 uuid 查找对象，找不到返回 `None`。

- `object_uuid`（`str`）：对象的 uuid。

### `get_parent_object(object_uuid)`
返回某个 uuid 的父对象；画布没有父对象，返回 `None`。

- `object_uuid`（`str`）：对象的 uuid。

## 路径写法

| 写法 | 含义 |
| --- | --- |
| `Canvas` | 场景的根节点。 |
| `Canvas/Player` | Canvas节点下最靠前的名为 `Player` 的节点。 |
| `Canvas/Player[2]` | Canvas节点下 **第 3 个** 子节点，且节点名字必须是 `Player`。注意序号[2]表示索引为2的节点，也就是第3个节点。 索引从0开始。|
| `Canvas[0]/Player[3]/Bag[2]` | Canvas节点下索引为3 (第4个) 且节点名称为Player的子节点，确认Player子节点存在后，再去确认其下索引为2（第3个）且名称为Bag的子节点。`Canvas[0]` 永远等同于`Canvas`，因为Canvas的索引永远是0。

## 遍历层级

### `find_objects(name='', object_type='', script='', visible_only=False)`
按条件查找对象；留空表示该条件不限。

- `name`（`str`）：名称包含的文本（不区分大小写）。
- `object_type`（`str`）：完全匹配的类型（如 `RECT`、`TEXT`）。
- `script`（`str`）：脚本路径包含的文本（如 `'player.py'`）。
- `visible_only`（`bool`）：只返回可见对象。

### `get_all_objects()`
场景中的全部对象，根对象在最前（按树的顺序）。

### `get_children(obj)`
某个对象的直接子对象。

- `obj`（`object` | `str`）：对象本身、uuid、路径或名称。

### `get_root_object()`
场景的根对象（画布）；未加载场景时返回 `None`。

### `get_scene_path()`
当前加载的场景文件路径，未加载时为空字符串。

## 运行时创建对象

### `create_object(object_type, parent='', name='', properties=None)`
在运行中的场景里创建一个对象并返回它；类型不存在或找不到父对象时会抛出 `RuntimeError`。新对象的行为与一开始就在场景中的对象完全一致：脚本会立即挂载并触发 `on_start()`，从下一帧开始参与更新与绘制。

- `object_type`（`str`）：[对象参考](/zh-cn/api/objects/)中的类型标识——`RECT`、`TEXT`、`IMAGE`、`BUTTON`、`FRAME_SEQUENCE`……。
- `parent`（`str`）：新对象的父对象，可传 uuid、层级路径（`Canvas/Hud`）或名称；留空则添加到场景根节点。
- `name`（`str`）：层级面板中显示的名称。
- `properties`（`dict`）：初始属性字典，名称与属性检查器、`.scene` 文件一致（`x`、`y`、`width`、`height`、`color`、`text`、`image_path`、`script_path`……）；未填写的按该类型的默认值处理。

## 运行时移除对象

### `destroy_object(obj)`
移除一个对象连同它的子对象；没有可移除的对象时返回 `False`。对象会在**当前帧结束时**真正离开场景，因此脚本可以安全地移除任何对象——包括它自己挂载的那个；脚本的 `on_destroy()` 会在对象真正移除时触发。

- `obj`（`object` | `str`）：对象本身、uuid、层级路径或名称。
