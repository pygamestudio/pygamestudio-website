---
title: Slider
description: A draggable value control — volume, brightness, difficulty.
---

Type key: `SLIDER`

## Properties

### `angle`
Rotation in degrees, clockwise. Type `float`, default `0`.

### `collision_enabled`
Whether the object takes part in collision tests. Type `bool`, default `False`.

### `collision_offset_x`, `collision_offset_y`
Shift of the shape away from the object centre (not for `bbox`). Type `float`, default `0`.

### `collision_points`
Vertices of a `polygon` shape. Type `list`, default `[]`.

### `collision_type`
Shape used for collisions: `'bbox'`, `'rect'`, `'ellipse'` or `'polygon'`. Type `str`, default `'rect'`.

### `collision_width`, `collision_height`
Size of the shape used by `rect` and `ellipse`. Type `float`, default = the object's size.

### `color`
Fill color, text color or image tint, depending on the type. Type `(r, g, b, a)`, default `(255, 255, 255, 255)`.

### `fill_color`
Color of the filled part. Type `(r, g, b, a)`, default `(86, 200, 120, 255)`.

### `fill_image_path`
Optional image that replaces the colored filled part. Type `str`, default `''`.

### `handle_color`
Color of the handle. Type `(r, g, b, a)`, default `(235, 235, 235, 255)`.

### `handle_image_path`
Optional image that replaces the colored handle. Type `str`, default `''`.

### `handle_width`, `handle_height`
Size of the handle. Type `int`, default `16`, `16`.

### `max_value`
Value of the right end of the track. Type `float`, default `100.0`.

### `min_value`
Value of the left end of the track. Type `float`, default `0.0`.

### `name`
Name shown in the Hierarchy panel. Read-only at runtime. Type `str`.

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

### `track_color`
Color of the track. Type `(r, g, b, a)`, default `(70, 70, 70, 255)`.

### `track_image_path`
Optional image that replaces the colored track. Type `str`, default `''`.

### `track_thickness`
Height of the track in pixels. Type `int`, default `6`.

### `type`
Type key; the slider is `SLIDER`. Read-only at runtime. Type `str`.

### `uuid`
Unique id, used by `get_object_by_uuid()`. Read-only at runtime. Type `str`.

### `value`
Current value, between `min_value` and `max_value`; dragging the handle (or clicking the track) changes it. Type `float`, default `50.0`.

### `visible`
Hidden objects are not drawn and cannot be clicked. Type `bool`, default `True`.

### `width`, `height`
Size in pixels. Type `int`, default depends on the object type.

### `x`, `y`
Position relative to the parent object. Type `int`, default `20`.

## Methods

### `collides_with_object(other)`
Alias of `is_colliding_with_object`.

- `other` (`object`): the other object.

### `collides_with_point(x, y)`
`True` when the point (scene coordinates) is inside the collision shape.

- `x` (`int`): point x, in scene coordinates.
- `y` (`int`): point y, in scene coordinates.

### `collides_with_rect(rect)`
`True` when the shape overlaps a `pygame.Rect` or `(x, y, w, h)` tuple.

- `rect` (`pygame.Rect` | `(int, int, int, int)`): the rectangle, in scene coordinates.

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

### `get_collision_center()`
Centre of the collision shape in scene coordinates.

### `get_collision_offset()`
The offset of the shape from the object centre.

### `get_collision_polygon()`
The polygon vertices.

### `get_collision_radius()`
Radius of an ellipse shape (half of its smaller side).

### `get_collision_rect(x, y, width, height)`
The overlapping area with a rectangle, or `None`.

- `x` (`int`): rectangle x, in scene coordinates.
- `y` (`int`): rectangle y, in scene coordinates.
- `width` (`int`): rectangle width.
- `height` (`int`): rectangle height.

### `get_collision_size()`
The size of the shape used by `rect` and `ellipse`.

### `get_collision_type()`
The shape used for collisions.

### `get_color()`
Fill, text or tint color as `(r, g, b, a)`.

### `get_direction_to(x, y)`
Unit vector `(dx, dy)` pointing from the object to a point.

- `x` (`int`): point x, in scene coordinates.
- `y` (`int`): point y, in scene coordinates.

### `get_fill_image_path()`
The fill image path.

### `get_handle_image_path()`
The handle image path.

### `get_height()`
Height in pixels.

### `get_max_value()`
The upper end of the range.

### `get_min_value()`
The lower end of the range.

### `get_name()`
The name of the object.

### `get_pos()`
Local position `(x, y)`, relative to the parent object.

### `get_range()`
`(min_value, max_value)`.

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

### `get_track_image_path()`
The track image path.

### `get_type()`
The type key of the object.

### `get_uuid()`
The uuid of the object.

### `get_value()`
The current value.

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

### `is_colliding_with_object(other)`
`True` when **both** objects have collision enabled and their shapes overlap.

- `other` (`object`): the other object.

### `is_colliding_with_rect(x, y, width, height)`
`True` when the shape overlaps the given rectangle.

- `x` (`int`): rectangle x, in scene coordinates.
- `y` (`int`): rectangle y, in scene coordinates.
- `width` (`int`): rectangle width.
- `height` (`int`): rectangle height.

### `is_collision_enabled()`
`True` while collision detection is on for this object.

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
Moves the object by `(dx, dy)` pixels.

- `dx` (`int`): horizontal delta.
- `dy` (`int`): vertical delta.

### `reset_collision_shape()`
Resets every shape field to the object's own size.

### `set_angle(degrees)`
Sets the rotation.

- `degrees` (`float`): angle, clockwise.

### `set_center(x, y)`
Sets the centre (scene coordinates).

- `x` (`int`): new centre x.
- `y` (`int`): new centre y.

### `set_collision_ellipse(radius_x, radius_y)`
Convenience: sets an ellipse by its two radii.

- `radius_x` (`float`): horizontal radius.
- `radius_y` (`float`): vertical radius.

### `set_collision_enabled(enabled)`
Turns collision detection on or off (while it is off, every `collides_with_*` / `is_colliding_*` call returns `False`).

- `enabled` (`bool`): `True` / `False`.

### `set_collision_offset(x, y)`
Moves the shape away from the object centre (follows scale and rotation).

- `x` (`float`): horizontal offset.
- `y` (`float`): vertical offset.

### `set_collision_polygon(points)`
Sets explicit polygon vertices.

- `points` (`list`): vertex list, e.g. `[(0, 0), (50, 0), (25, 40)]`.

### `set_collision_size(width, height)`
Sets the size used by `rect` and `ellipse`.

- `width` (`int`): shape width.
- `height` (`int`): shape height.

### `set_collision_type(type)`
Sets the collision shape.

- `type` (`str`): `'bbox'`, `'rect'`, `'ellipse'` or `'polygon'`.

### `set_color(color)`
Sets the color.

- `color` (`(r, g, b, a)`): the new color tuple.

### `set_fill_image_path(path)`
Sets the fill image.

- `path` (`str`): image file, relative to the project folder.

### `set_handle_image_path(path)`
Sets the handle image.

- `path` (`str`): image file, relative to the project folder.

### `set_height(h)`
Sets the height.

- `h` (`int`): new height in pixels.

### `set_max_value(value)`
Sets the upper end of the range.

- `value` (`float`): new maximum.

### `set_min_value(value)`
Sets the lower end of the range.

- `value` (`float`): new minimum.

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

### `set_track_image_path(path)`
Sets the track image.

- `path` (`str`): image file, relative to the project folder.

### `set_value(value)`
Sets the current value.

- `value` (`float`): new value.

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

### `on_collision_enter(other)`
The object starts overlapping `other` (both need collision enabled).

- `other` (`object`): the other object.

### `on_collision_exit(other)`
The overlap with `other` ends.

- `other` (`object`): the other object.

### `on_destroy()`
When the scene is replaced, the object is removed with `studio.destroy_object()` or the game closes.

### `on_double_clicked()`
Double click on the object.

### `on_drag(pos)`
Pointer moves while dragging.

- `pos` (`(int, int)`): pointer position in scene coordinates.

### `on_drag_end()`
The drag ends.

### `on_drag_start()`
A pointer drag on the object starts — on the slider this is the handle drag.

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

### `on_value_changed(value)`
Whenever the player moves the handle.

- `value` (`float`): the new value.

### `on_visible_changed(visible)`
When the object is shown or hidden.

- `visible` (`bool`): `True` when shown, `False` when hidden.
