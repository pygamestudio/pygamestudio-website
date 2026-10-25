---
title: Keyframe
description: Timeline animation over position, scale, rotation and color.
---

Type key: `KEYFRAME`

## Properties

### `angle`
Rotation in degrees, clockwise. Type `float`, default `0`.

### `auto_play`
Whether the timeline advances on its own. Type `bool`, default `True`.

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

### `duration`
Length of the timeline in seconds; the timeline always lasts at least until the last keyframe. Type `float`, default `2.0`.

### `image_path`
Image drawn as the object itself, relative to the project; it is stretched to `width`/`height` and tinted by the color. Empty draws a plain color box. A keyframe can carry its own `image_path` (see the `keyframes` property): the timeline then switches images itself. Type `str`, default `''`.

### `keyframes`
The timeline snapshots, sorted by time. Each entry is a dict with `time` (seconds), `easing` (`'linear'`, `'ease_in'`, `'ease_out'` or `'ease_in_out'`), `x`, `y`, `scale_x`, `scale_y`, `angle`, `color` and `image_path` (`''` = plain color box). The easing of an entry shapes the segment that starts at it, and the image switches at the start of a segment. Type `list`, default `[]`.

### `loop`
`True`: loop forever. `False`: play once and hold the last keyframe. Type `bool`, default `True`.

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

### `playback_speed`
Clock scale (`1` = real time, `2` = twice as fast). Type `float`, default `1`.

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
Type key; the timeline is `KEYFRAME`. Read-only at runtime. Type `str`.

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

### `evaluate_at(time)`
The interpolated channel values at a time: a dict with `x`, `y`, `scale_x`, `scale_y`, `angle` and `color`, or `None` without keyframes. Before the first / after the last keyframe the nearest snapshot is held.

- `time` (`float`): seconds from the start of the timeline.

### `get_angle()`
Rotation in degrees.

### `get_auto_play_state()`
Whether the animation advances automatically.

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

### `get_duration()`
Length of the timeline in seconds.

### `get_height()`
Height in pixels.

### `get_image_path()`
Project-relative path of the image drawn as the object (`''` = plain color box).

### `get_keyframes()`
A copy of the timeline snapshots.

### `get_loop_state()`
`True` = loop forever, `False` = play once then hold the last keyframe.

### `get_name()`
The name of the object.

### `get_pivot()`
Transform anchor mode (e.g. `'center'`, `'top_left'`, `'custom'`).

### `get_pivot_point()`
The anchor resolved to content pixels `(x, y)`.

### `get_playback_speed()`
Current playback speed.

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

### `get_time()`
Position of the playback clock in seconds.

### `get_timeline_length()`
Length of the timeline in seconds: the `duration`, or the time of the last keyframe when that is later.

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

### `is_auto_play()`
`True` while automatic playback is on.

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

### `pause()`
Freeze on the current time.

### `play()`
Start (or resume) automatic playback.

### `preview_at(time)`
Applies the timeline value at a time to the object without playing (the Animation Editor uses it while scrubbing). Returns `True` when something was applied.

- `time` (`float`): seconds from the start of the timeline.

### `reset_collision_shape()`
Resets every shape field to the object's own size.

### `restart()`
Rewind to the start and start playing.

### `set_angle(degrees)`
Sets the rotation.

- `degrees` (`float`): angle, clockwise.

### `set_auto_play_state(auto_play)`
Turns automatic playback on or off.

- `auto_play` (`bool`): `True` plays, `False` pauses.

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

### `set_duration(duration)`
Sets the timeline length.

- `duration` (`float`): seconds.

### `set_height(h)`
Sets the height.

- `h` (`int`): new height in pixels.

### `set_image_path(image_path)`
Sets the image drawn as the object.

- `image_path` (`str`): path relative to the project; `''` draws the color box.

### `set_keyframes(keyframes)`
Replaces the timeline. The entries are cleaned and sorted by time.

- `keyframes` (`list`): snapshot dicts (see the `keyframes` property).

### `set_loop_state(loop)`
Turns looping on or off.

- `loop` (`bool`): `True` loops, `False` plays once.

### `set_pivot(pivot)`
Choose the transform anchor.

- `pivot` (`str`): `'center'` (default), `'top_left'`, `'top_center'`, `'top_right'`, `'center_left'`, `'center_right'`, `'bottom_left'`, `'bottom_center'`, `'bottom_right'` or `'custom'`.

### `set_pivot_point(x, y)`
Rotate/scale around a free point of the object's own pixel grid (also sets `pivot` to `'custom'`).

- `x` (`float`): anchor x in the pixel grid.
- `y` (`float`): anchor y in the pixel grid.

### `set_playback_speed(playback_speed)`
Set the playback speed (minimum `0.01`).

- `playback_speed` (`float`): clock scale, `1` = real time.

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

### `set_time(time)`
Jump to a time in seconds; playback continues from there. With looping on, the time wraps around the timeline length.

- `time` (`float`): seconds from the start of the timeline.

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

### `stop()`
Pause and rewind to the start.


## Events

### `on_animation_finished()`
A play-once animation reached its last keyframe.

### `on_animation_start()`
The animation (re)starts.

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
## Helpers

### `snapshot_from_object(obj, time=0.0, easing='linear')`
Pack the object's CURRENT channel values into one keyframe snapshot.

- `obj` (`object`): the object to snapshot.
- `time` (`float`): snapshot time in seconds.
- `easing` (`str`): easing curve of the segment that starts at this frame.

### `normalize_keyframes(keyframes)`
Sanitise and sort a keyframe list: sorts, fills missing channels and clamps values; returns a fresh list (never mutates the input).

- `keyframes` (`list`): list of keyframe dicts.

### `ease_progress(kind, t)`
Map linear progress `0`..`1` through a named easing curve.

- `kind` (`str`): `'linear'`, `'ease_in'`, `'ease_out'` or `'ease_in_out'`.
- `t` (`float`): linear progress `0`..`1`.

### `DEFAULT_EASING`
Default easing curve (`'linear'`).

### `EASING_CURVES`
All easing curve names: `('linear', 'ease_in', 'ease_out', 'ease_in_out')`.

### `KEYFRAME_CHANNELS`
Animated channels: `('x', 'y', 'scale_x', 'scale_y', 'angle', 'color', 'image_path')`.
