---
title: Scene
description: Load and switch scenes, find objects by path or uuid, create and destroy objects while the game runs, and walk the object hierarchy.
---

## Loading a scene

### `load_scene(screen_surface, scene_path='')`
Draws the current scene onto the given surface, and loads it first when it is not the scene that is currently loaded. Call it once per frame from `Game.on_update`.

- `screen_surface` (`pygame.Surface`): the surface from `studio.get_screen()`.
- `scene_path` (`str`): a `.scene` file relative to the project folder — empty uses the scene marked as **Current Scene** in the project (see [Project Config](/api/config/)).

Calling it again with the same file only redraws it (the scripts' `on_update(dt)` hooks run every frame, `on_start()` only once); a different path switches scenes — the previous scene is torn down first, so its scripts receive `on_destroy()`, and the new one rebuilds the object tree from the file, attaches the scripts and fires their `on_start()`.

## Finding objects

### `get_object_by_path(object_path)`
The object with the given hierarchy path, or `None`. The positional form is fragile — adding, deleting or reordering objects changes the position numbers.

- `object_path` (`str`): the names from the canvas down, separated by `/`.

### `get_object_by_uuid(object_uuid)`
The object with the given uuid, or `None`.

- `object_uuid` (`str`): the uuid of the object.

### `get_parent_object(object_uuid)`
The parent object of a uuid, or `None` for the canvas.

- `object_uuid` (`str`): the uuid of the object.

## Path syntax

| Patj | Meaning |
| --- | --- |
| `Canvas` | The root node of the scene. |
| `Canvas/Player` | The frontmost node named `Player` under the Canvas node. |
| `Canvas/Player[2]` | The **3rd** child node under the Canvas node, and the node name must be `Player`. Note that index [2] means the node with index 2, i.e., the 3rd node. Indexing starts from 0. |
| `Canvas[0]/Player[3]/Bag[2]` | The child node under the Canvas node with index 3 (the 4th) and the node name `Player`. After confirming that the Player child node exists, then confirm the child node under it with index 2 (the 3rd) and the name `Bag`. `Canvas[0]` is always equivalent to `Canvas`, because the index of Canvas is always 0. |

## Walking the hierarchy

### `find_objects(name='', object_type='', script='', visible_only=False)`
Every object matching the filters; an empty filter means "any".

- `name` (`str`): text the name contains (case-insensitive).
- `object_type` (`str`): an exact type (`RECT`, `TEXT`, …).
- `script` (`str`): text the script path contains (e.g. `'player.py'`).
- `visible_only` (`bool`): skip hidden objects.

### `get_all_objects()`
Every object of the scene, root first (tree order).

### `get_children(obj)`
The direct children of an object.

- `obj` (`object` | `str`): the object itself, its uuid, its path or its name.

### `get_root_object()`
The root object of the scene (the canvas), or `None` when no scene is loaded.

### `get_scene_path()`
The scene file that is loaded right now, `''` when there is none.

## Creating objects while the game runs

### `create_object(object_type, parent='', name='', properties=None)`
Creates an object in the running scene and returns it; an unknown type or a parent that cannot be found raises a `RuntimeError`. The new object behaves exactly like one that was in the scene from the start: its script is attached, `on_start()` fires right away, and it is updated and drawn from the next frame on.

- `object_type` (`str`): the type key of the [object reference](/api/objects/) — `RECT`, `TEXT`, `IMAGE`, `BUTTON`, `FRAME_SEQUENCE`, ….
- `parent` (`str`): the uuid, the hierarchy path (`Canvas/Hud`) or the name of the object the new one is added under — empty adds it to the scene root.
- `name` (`str`): the name shown in the Hierarchy panel.
- `properties` (`dict`): initial values using the same names as the inspector and the `.scene` file (`x`, `y`, `width`, `height`, `color`, `text`, `image_path`, `script_path`, …); everything left out falls back to the default of that type.

## Removing objects while the game runs

### `destroy_object(obj)`
Removes an object and its children. Returns `False` when there is nothing to destroy. The object leaves the scene at the **end of the current frame**, so a script may destroy anything — including the object it is attached to — while the frame is still running; the `on_destroy()` hooks of the removed scripts fire when it actually leaves.

- `obj` (`object` | `str`): the object itself, its uuid, its hierarchy path or its name.
