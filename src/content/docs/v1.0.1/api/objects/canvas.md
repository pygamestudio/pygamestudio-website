---
title: Canvas
description: The root object of every scene — background colour and size of the game surface.
---

Type key: `CANVAS`

## Properties

### `angle`
Rotation in degrees, clockwise. Type `float`, default `0`.

### `color`
Background color of the scene. Type `(r, g, b, a)`, default `(0, 0, 0, 255)`.

### `name`
Name shown in the Hierarchy panel. Read-only at runtime. Type `str`.

### `physics_angular_damping`
Angular velocity damping. Type `float`, default `0`.

### `physics_elasticity`
Bounciness (`0` = fully inelastic, `1` = fully elastic). Type `float`, default `0.2`.

### `physics_enabled`
Whether the rigid body is simulated. Type `bool`, default `False`.

### `physics_fixed_rotation`
Keep the rotation fixed (collisions do not spin the object). Type `bool`, default `False`.

### `physics_friction`
Friction coefficient. Type `float`, default `0.6`.

### `physics_gravity_scale`
Gravity multiplier (`0` = unaffected by gravity). Type `float`, default `1`.

### `physics_linear_damping`
Linear velocity damping. Type `float`, default `0`.

### `physics_mass`
Mass. Type `float`, default `1`.

### `physics_shape_height`, `physics_shape_width`
Size of the `rect`/`ellipse` body shape (`0` = use the object's own size). Type `float`, default `0`.

### `physics_shape_offset_x`, `physics_shape_offset_y`
Shift of the body shape away from the object centre. Type `float`, default `0`.

### `physics_shape_points`
Vertices of a `polygon` body shape. Type `list`, default `[]`.

### `physics_shape_type`
Body shape: `'rect'`, `'ellipse'` or `'polygon'`. Type `str`, default `'rect'`.

### `physics_type`
Rigid-body type: `'static'`, `'dynamic'` or `'kinematic'`. Type `str`, default `'dynamic'`.

### `pivot`
Transform anchor mode, see `set_pivot()`. Type `str`, default `'center'`.

### `pivot_x`, `pivot_y`
Coordinates of a `'custom'` anchor (in the object's own pixel grid, origin at its top-left). Type `float`, default `0`.

### `pos`
`(x, y)`; assigning it updates `x` and `y` too. Type `(int, int)`, default `(20, 20)`.

### `scale`
`(scale_x, scale_y)`. Type `(float, float)`, default `(1, 1)`.

### `scale_x`, `scale_y`
Stretch factors (`1` = original size). Type `float`, default `1`.

### `script_path`
Path of the attached script, relative to the project. Type `str`, default `''`.

### `size`
`(width, height)`. Type `(int, int)`.

### `type`
Type key; the canvas is `CANVAS`. Read-only at runtime. Type `str`.

### `uuid`
Unique id, used by `get_object_by_uuid()`. Read-only at runtime. Type `str`.

### `visible`
Hidden objects are not drawn and cannot be clicked. Type `bool`, default `True`.

### `width`, `height`
Size of the canvas in pixels; the editor keeps it at the project's window size. Type `int`, default = the screen size.

### `x`, `y`
Position relative to the parent object (the canvas itself is at `0, 0`). Type `int`, default `20`.

## Methods

### `distance_to(x, y)`
Distance from the object's centre to a point.

- `x` (`int`): point x, in scene coordinates.
- `y` (`int`): point y, in scene coordinates.

### `distance_to_object(other)`
Distance between two object centres.

- `other` (`object`): the other object.

### `get_angle()`
Rotation in degrees.

### `get_center()`
Centre of the object (scene coordinates).

### `get_color()`
Fill, text or tint color as `(r, g, b, a)`.

### `get_direction_to(x, y)`
Unit vector `(dx, dy)` pointing from the object to a point.

- `x` (`int`): point x, in scene coordinates.
- `y` (`int`): point y, in scene coordinates.

### `get_height()`
Height in pixels.

### `get_name()`
The name of the object.

### `get_pivot()`
Transform anchor mode (e.g. `'center'`, `'top_left'`, `'custom'`).

### `get_pivot_point()`
The anchor resolved to content pixels `(x, y)`.

### `get_pos()`
Local position `(x, y)`, relative to the parent object.

### `get_rect()`
Local `pygame.Rect` of the object.

### `get_scale()`
The stretch factors as `(scale_x, scale_y)`.

### `get_scale_x()`
The x stretch factor.

### `get_scale_y()`
The y stretch factor.

### `get_size()`
Size in pixels as `(width, height)`.

### `get_type()`
The type key of the object.

### `get_uuid()`
The uuid of the object.

### `get_visible_state()`
The `visible` state as a bool.

### `get_width()`
Width in pixels.

### `get_world_pos()`
Position in scene coordinates, i.e. with every parent offset added.

### `get_world_rect()`
`pygame.Rect` in scene coordinates.

### `get_x()`
The x part of the local position.

### `get_y()`
The y part of the local position.

### `hide()`
Makes the object invisible. Same as `obj.visible = False`.

### `is_hidden()`
`True` while the object is hidden.

### `is_point_inside(x, y)`
Cheap test: `True` when the point is inside the object's bounding box.

- `x` (`int`): point x, in scene coordinates.
- `y` (`int`): point y, in scene coordinates.

### `is_pressed(x, y)`
Pixel-perfect test: `True` only on a non-transparent pixel. Prefer it for clicks, not for per-frame checks.

- `x` (`int`): point x, in scene coordinates.
- `y` (`int`): point y, in scene coordinates.

### `is_shown()`
Same as `is_visible()`.

### `is_visible()`
`True` while the object is visible.

### `move(dx, dy)`
Moves the object by `(dx, dy)` pixels; on the canvas this moves the whole scene.

- `dx` (`int`): horizontal delta.
- `dy` (`int`): vertical delta.

### `set_angle(degrees)`
Sets the rotation.

- `degrees` (`float`): angle, clockwise.

### `set_center(x, y)`
Sets the centre (scene coordinates).

- `x` (`int`): new centre x.
- `y` (`int`): new centre y.

### `set_color(color)`
Sets the color.

- `color` (`(r, g, b, a)`): the new color tuple.

### `set_height(h)`
Sets the height.

- `h` (`int`): new height in pixels.

### `set_pivot(pivot)`
Choose the transform anchor.

- `pivot` (`str`): `'center'` (default), `'top_left'`, `'top_center'`, `'top_right'`, `'center_left'`, `'center_right'`, `'bottom_left'`, `'bottom_center'`, `'bottom_right'` or `'custom'`.

### `set_pivot_point(x, y)`
Rotate/scale around a free point of the object's own pixel grid (also sets `pivot` to `'custom'`).

- `x` (`float`): anchor x in the pixel grid.
- `y` (`float`): anchor y in the pixel grid.

### `set_pos(x, y)`
Sets the local position.

- `x` (`int`): new x, relative to the parent object, in pixels.
- `y` (`int`): new y, relative to the parent object, in pixels.

### `set_scale(sx, sy)`
Sets both stretch factors.

- `sx` (`float`): x stretch factor.
- `sy` (`float`): y stretch factor.

### `set_scale_x(sx)`
Sets the x stretch factor.

- `sx` (`float`): x stretch factor.

### `set_scale_y(sy)`
Sets the y stretch factor.

- `sy` (`float`): y stretch factor.

### `set_size(width, height)`
Sets the size in pixels.

- `width` (`int`): new width.
- `height` (`int`): new height.

### `set_visible_state(visible)`
Sets the `visible` state.

- `visible` (`bool`): `True` shows the object, `False` hides it.

### `set_width(w)`
Sets the width.

- `w` (`int`): new width in pixels.

### `set_world_pos(x, y)`
Sets the position in scene coordinates.

- `x` (`int`): new x, in scene coordinates.
- `y` (`int`): new y, in scene coordinates.

### `set_x(x)`
Sets the x part of the local position.

- `x` (`int`): new x, relative to the parent object.

### `set_y(y)`
Sets the y part of the local position.

- `y` (`int`): new y, relative to the parent object.

### `show()`
Makes the object visible. Same as `obj.visible = True`.

## Events

### `on_clicked()`
Pressed and released on the object.

### `on_destroy()`
When the scene is replaced or the game closes.

### `on_double_clicked()`
Double click on the object.

### `on_drag(pos)`
Pointer moves while dragging.

- `pos` (`(int, int)`): pointer position in scene coordinates.

### `on_drag_end()`
The drag ends.

### `on_drag_start()`
A pointer drag on the object starts.

### `on_mouse_enter()`
Pointer moves onto the object.

### `on_mouse_leave()`
Pointer moves off the object.

### `on_pressed()`
Left button pressed on the object.

### `on_released()`
The button that was pressed on this object is released.

### `on_right_clicked()`
Right click on the object.

### `on_start()`
Once, when the scene has loaded.

### `on_update(dt)`
Every frame.

- `dt` (`float`): seconds since the last frame.

### `on_visible_changed(visible)`
When the object is shown or hidden.

- `visible` (`bool`): `True` when shown, `False` when hidden.
