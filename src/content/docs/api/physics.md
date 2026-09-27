---
title: Physics
description: Give objects a rigid body — gravity, mass, friction, forces, velocity, grounded checks and raycasts.
---

## Rigid body

### `get_physics_damping()`
The movement and spin damping of the body, as `(linear, angular)`.

### `get_physics_elasticity()`
The bounce of the body.

### `get_physics_friction()`
The friction of the body.

### `get_physics_gravity_scale()`
The gravity scale of the body (`0` floats, `1` is normal).

### `get_physics_mass()`
How hard the body is to push around.

### `get_physics_type()`
The body type: `'dynamic'`, `'static'` or `'kinematic'`.

### `is_physics_enabled()`
Is the object a rigid body?

### `is_physics_fixed_rotation()`
`True` while the body keeps its rotation locked upright.

### `set_physics_damping(linear, angular=0)`
How quickly movement and spin die down.

- `linear` (`float`): movement damping.
- `angular` (`float`): spin damping.

### `set_physics_elasticity(elasticity)`
Sets the bounce of the body; `0.2` by default.

- `elasticity` (`float`): `0` lands dead, `1` bounces back fully.

### `set_physics_enabled(enabled)`
Turns the rigid body on or off. Turning it off (while the game runs) removes the body and the object stays where it is.

- `enabled` (`bool`): `True` / `False`.

### `set_physics_fixed_rotation(fixed)`
`True` keeps the body upright — a character never tips over. Keep it off when the body should roll: a locked angle only slides, while a rolling body follows its spin with its `angle` (a textured sprite or a polygon turns visibly).

- `fixed` (`bool`): `True` locks the rotation, `False` lets the body spin.

### `set_physics_friction(friction)`
Sets the friction of the body; `0.6` by default.

- `friction` (`float`): `0` = ice, `1` = sticky.

### `set_physics_gravity_scale(scale)`
Sets the gravity scale.

- `scale` (`float`): `0` floats, `1` is normal, negative falls upwards.

### `set_physics_mass(mass)`
Sets the mass; `1.0` by default.

- `mass` (`float`): larger is harder to push.

### `set_physics_type(type)`
Sets how the body behaves.

- `type` (`str`): `'dynamic'` (falls, is pushed, rotates), `'static'` (never moves, pushes everything else) or `'kinematic'` (moved by the script, pushes the others on the way).

## The body shape

### `get_physics_shape_offset()`
The offset of the shape from the object's centre (content pixels).

### `get_physics_shape_polygon()`
The polygon vertices of the body shape.

### `get_physics_shape_size()`
The box size used by `rect` and `ellipse`.

### `get_physics_shape_type()`
The type of the body shape.

### `reset_physics_shape()`
Back to the object-sized default box.

### `set_physics_shape_ellipse(radius_x, radius_y)`
Shortcut: set both radii and switch to `ellipse`.

- `radius_x` (`float`): horizontal radius, in content pixels.
- `radius_y` (`float`): vertical radius, in content pixels.

### `set_physics_shape_offset(x, y)`
Moves the shape away from the object's centre (content pixels).

- `x` (`float`): horizontal offset.
- `y` (`float`): vertical offset.

### `set_physics_shape_polygon(points)`
Explicit vertices (content pixels, top-left origin) — switches to `polygon`.

- `points` (`list`): vertex list, e.g. `[(0, 0), (50, 0), (25, 40)]`.

### `set_physics_shape_size(width, height)`
Sets the box size used by `rect` and `ellipse` (content pixels).

- `width` (`int`): box width.
- `height` (`int`): box height.

### `set_physics_shape_type(type)`
Sets the type of the body shape; it starts as a `rect` as big as the object — that is what the Inspector materializes when you tick *Enable Physics*.

- `type` (`str`): `'bbox'` (the rendered box), `'rect'`, `'ellipse'` or `'polygon'`.

## Forces, velocity and grounded

### `apply_force(force)`
Push **every frame** while it is called — wind, thrusters, a conveyor. The force is `mass × acceleration`; the accumulator is cleared after every physics step.

- `force` (`(float, float)`): force components, e.g. `(0, 800)` pushes down.

### `apply_impulse(impulse)`
One instant push: a jump, a hit, an explosion. The impulse is `mass × pixels/second`.

- `impulse` (`(float, float)`): impulse components, e.g. `(0, -400)` for a jump.

### `get_angular_velocity()`
The spin speed in degrees per second (`None` without a body).

### `get_velocity()`
Speed in pixels per second (`None` without a body).

### `is_grounded()`
`True` while the body stands on something. A short "coyote" memory keeps it `True` just after walking off a ledge, so a jump still works.

### `set_angular_velocity(deg_per_second)`
Sets the spin speed.

- `deg_per_second` (`float`): degrees per second.

### `set_velocity(velocity)`
Sets the speed directly.

- `velocity` (`(float, float)`): velocity components in pixels per second, e.g. `(200, 0)`.

## The world

### `get_gravity()`
The global gravity in pixels/second².

### `get_physics_time_scale()`
The current physics-only time scale.

### `get_physics_world()`
The world of the running scene, or `None` (in the editor, or without a scene).

### `is_physics_enabled()`
`True` while the simulation runs.

### `physics_raycast(start, end)`
The first physics object a ray from `start` to `end` hits, or `None`. Only objects with *Enable Physics* are detected.

- `start` (`(float, float)`): ray start, in world coordinates.
- `end` (`(float, float)`): ray end, in world coordinates.

### `set_gravity(gravity)`
Sets the global gravity. `(0, 0)` is space; a negative y pulls upwards.

- `gravity` (`(float, float)`): gravity in pixels/second²; default `(0, 980)`.

### `set_physics_enabled(enabled)`
Pauses or resumes the whole simulation — bodies freeze in place.

- `enabled` (`bool`): `True` runs the simulation, `False` pauses it.

### `set_physics_time_scale(scale)`
Sets the physics-only time scale: `0.5` slow motion, `2` fast forward, `0` a paused world that still draws.

- `scale` (`float`): time scale, `>= 0`.

## Collision events

### `on_collision_enter(other)`
Fired when two bodies touch. Enabling physics is enough to receive it; with *Enable Collision* on as well, the pair is still reported exactly once.

- `other` (`object`): the other object.

### `on_collision_exit(other)`
Fired when two bodies part.

- `other` (`object`): the other object.
