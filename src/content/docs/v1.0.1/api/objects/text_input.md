---
title: Text Input
description: An editable input box with placeholder, password mode and alignment.
---

Type key: `TEXT_INPUT`

## Properties

### `angle`
Rotation in degrees, clockwise. Type `float`, default `0`.

### `background_color`
Fill color of the box. Type `(r, g, b, a)`, default `(255, 255, 255, 255)`.

### `bold`
Bold content text. Type `bool`, default `False`.

### `border_bottom_left_radius`
Bottom-left corner radius. Type `int`, default `6`.

### `border_bottom_right_radius`
Bottom-right corner radius. Type `int`, default `6`.

### `border_color`
Color of the box outline. Type `(r, g, b, a)`, default `(150, 150, 150, 255)`.

### `border_top_left_radius`
Top-left corner radius in pixels. Type `int`, default `6`.

### `border_top_right_radius`
Top-right corner radius. Type `int`, default `6`.

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
Color of the typed text. Type `(r, g, b, a)`, default `(30, 30, 30, 255)`.

### `enter_newline`
`True`: Enter inserts a newline. `False`: Enter submits and stops editing. Type `bool`, default `False`.

### `font_path`
Font file of the content, relative to the project. Type `str`, default `'./font/SIMHEI.ttf'`.

### `font_size`
Font size of the content in pixels. Type `int`, default `24`.

### `italic`
Italic content text. Type `bool`, default `False`.

### `max_length`
Maximum number of characters, `0` = unlimited. Type `int`, default `0`.

### `name`
Name shown in the Hierarchy panel. Read-only at runtime. Type `str`.

### `password`
Masks the content with `*`. Type `bool`, default `False`.

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

### `placeholder`
Hint shown while the box is empty. Type `str`, default `''`.

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

### `strikethrough`
Struck-through content text. Type `bool`, default `False`.

### `text`
The content of the box. Clicking the box focuses it, typed characters land in `text`, and Enter submits (or inserts a newline, see `enter_newline`). Type `str`, default `''`.

### `text_align`
`'left'`, `'center'` or `'right'`. Type `str`, default `'left'`.

### `text_valign`
`'top'`, `'middle'` or `'bottom'`. Type `str`, default `'middle'`.

### `type`
Type key; the input box is `TEXT_INPUT`. Read-only at runtime. Type `str`.

### `underline`
Underlined content text. Type `bool`, default `False`.

### `uuid`
Unique id, used by `get_object_by_uuid()`. Read-only at runtime. Type `str`.

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

### `get_background_color()`
The fill color of the box.

### `get_border_color()`
The outline color of the box.

### `get_border_radius()`
All four radii as `(top_left, top_right, bottom_left, bottom_right)`.

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

### `get_font_path()`
The font file of the content.

### `get_font_size()`
The font size of the content.

### `get_height()`
Height in pixels.

### `get_max_length()`
The character limit (`0` = unlimited).

### `get_name()`
The name of the object.

### `get_pivot()`
Transform anchor mode (e.g. `'center'`, `'top_left'`, `'custom'`).

### `get_pivot_point()`
The anchor resolved to content pixels `(x, y)`.

### `get_placeholder()`
The placeholder text.

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

### `get_text()`
The content of the box.

### `get_text_align()`
The horizontal alignment.

### `get_text_color()`
The color of the typed text.

### `get_text_valign()`
The vertical alignment.

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

### `is_enter_newline()`
`True` while Enter inserts a newline.

### `is_hidden()`
`True` while the object is hidden.

### `is_password_mode()`
`True` while the content is masked.

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

### `set_background_color(color)`
Sets the fill color of the box.

- `color` (`(r, g, b, a)`): the new color tuple.

### `set_border_color(color)`
Sets the outline color of the box.

- `color` (`(r, g, b, a)`): the new color tuple.

### `set_border_radius(radius)`
Sets all four corners at once.

- `radius` (`int` | `(int, int, int, int)`): a single radius for every corner, or `(top_left, top_right, bottom_left, bottom_right)`.

### `set_caret_from_world_point(world_pos)`
Place the runtime caret at the character under `world_pos` (a click position in world coordinates), mirroring the current rendering (alignment, scrolling and soft wrapping).

- `world_pos` (`(int, int)`): the click position in world coordinates.

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

### `set_enter_newline(enabled)`
Turns the Enter-newline behaviour on or off.

- `enabled` (`bool`): `True` inserts a newline, `False` submits.

### `set_font_path(path)`
Sets the font file of the content.

- `path` (`str`): font file relative to the project.

### `set_font_size(size)`
Sets the font size of the content.

- `size` (`int`): size in pixels.

### `set_height(h)`
Sets the height.

- `h` (`int`): new height in pixels.

### `set_max_length(length)`
Sets the character limit.

- `length` (`int`): maximum characters, `0` = unlimited.

### `set_password_mode(password)`
Turns password masking on or off.

- `password` (`bool`): `True` / `False`.

### `set_pivot(pivot)`
Choose the transform anchor.

- `pivot` (`str`): `'center'` (default), `'top_left'`, `'top_center'`, `'top_right'`, `'center_left'`, `'center_right'`, `'bottom_left'`, `'bottom_center'`, `'bottom_right'` or `'custom'`.

### `set_pivot_point(x, y)`
Rotate/scale around a free point of the object's own pixel grid (also sets `pivot` to `'custom'`).

- `x` (`float`): anchor x in the pixel grid.
- `y` (`float`): anchor y in the pixel grid.

### `set_placeholder(text)`
Sets the hint text.

- `text` (`str`): hint shown while the box is empty.

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

### `set_text(text)`
Changes the content.

- `text` (`str`): the new content.

### `set_text_align(align)`
Sets the horizontal alignment.

- `align` (`str`): `'left'`, `'center'` or `'right'`.

### `set_text_color(color)`
Sets the color of the typed text.

- `color` (`(r, g, b, a)`): the new color tuple.

### `set_text_valign(align)`
Sets the vertical alignment.

- `align` (`str`): `'top'`, `'middle'` or `'bottom'`.

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

### `on_blur()`
The box loses focus.

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
A pointer drag on the object starts.

### `on_focus()`
The box gains focus.

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

### `on_submitted(text)`
Enter was pressed while `enter_newline` is `False`.

- `text` (`str`): the submitted content.

### `on_text_changed(text)`
After every change of the content.

- `text` (`str`): the new content.

### `on_update(dt)`
Every frame.

- `dt` (`float`): seconds since the last frame.

### `on_visible_changed(visible)`
When the object is shown or hidden.

- `visible` (`bool`): `True` when shown, `False` when hidden.
