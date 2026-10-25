---
title: 物理
description: 为对象添加刚体——重力、质量、摩擦力、力、速度、触地检测与射线检测。
---

## 刚体属性

### `get_physics_damping()`
阻尼，返回 `(线性, 角)` 两个值。

### `get_physics_elasticity()`
弹性：`0` 落地即停，`1` 完全弹回。

### `get_physics_friction()`
摩擦力：`0` 像冰面，`1` 很黏。

### `get_physics_gravity_scale()`
重力系数（`0` 悬空、`1` 正常重力）。

### `get_physics_mass()`
质量：越大越难推动。

### `get_physics_type()`
刚体类型：`'dynamic'`、`'static'` 或 `'kinematic'`。

### `is_physics_enabled()`
该对象是否是刚体。

### `is_physics_fixed_rotation()`
`True` 表示刚体的旋转被锁定、保持直立。

### `set_physics_damping(linear, angular=0)`
设置阻尼：移动与旋转减速的快慢。

- `linear`（`float`）：移动阻尼。
- `angular`（`float`）：旋转阻尼。

### `set_physics_elasticity(elasticity)`
设置弹性；默认 `0.2`。

- `elasticity`（`float`）：`0` 落地即停，`1` 完全弹回。

### `set_physics_enabled(enabled)`
开启 / 关闭刚体。运行中关闭会把刚体移除，对象停在原地。

- `enabled`（`bool`）：`True` / `False`。

### `set_physics_fixed_rotation(fixed)`
`True` 保持直立（角色不会摔倒）。要让刚体真正“滚”起来就应关闭：开启会锁死角度、物体只会滑；滚动时物体的 `angle` 跟随旋转，带纹理的贴图或多边形能明显看到转动。

- `fixed`（`bool`）：`True` 锁定旋转，`False` 允许旋转。

### `set_physics_friction(friction)`
设置摩擦力；默认 `0.6`。

- `friction`（`float`）：`0` 像冰面，`1` 很黏。

### `set_physics_gravity_scale(scale)`
设置重力系数。

- `scale`（`float`）：`0` 悬空、`1` 正常重力、负数向上升。

### `set_physics_mass(mass)`
设置质量；默认 `1.0`。

- `mass`（`float`）：越大越难推动。

### `set_physics_type(type)`
设置刚体的行为方式。

- `type`（`str`）：`'dynamic'` 动态（会下落、被推动、可旋转）、`'static'` 静态（永不移动，推动其他刚体）、`'kinematic'` 运动学（由脚本移动，沿途推动其他刚体）。

## 刚体形状

### `get_physics_shape_offset()`
形状相对对象中心的偏移（内容像素）。

### `get_physics_shape_polygon()`
刚体形状的多边形顶点列表。

### `get_physics_shape_size()`
`rect` 与 `ellipse` 使用的盒子尺寸。

### `get_physics_shape_type()`
刚体形状的类型。

### `reset_physics_shape()`
恢复为对象大小的默认盒子。

### `set_physics_shape_ellipse(radius_x, radius_y)`
快捷：设置两个半径并切换到 `ellipse`。

- `radius_x`（`float`）：水平半径（内容像素）。
- `radius_y`（`float`）：垂直半径（内容像素）。

### `set_physics_shape_offset(x, y)`
把形状从对象中心移开（内容像素）。

- `x`（`float`）：水平偏移。
- `y`（`float`）：垂直偏移。

### `set_physics_shape_polygon(points)`
自定义顶点（内容像素，左上角为原点）——同时切换到 `polygon`。

- `points`（`list`）：顶点列表，例如 `[(0, 0), (50, 0), (25, 40)]`。

### `set_physics_shape_size(width, height)`
设置 `rect` 与 `ellipse` 使用的盒子尺寸（内容像素）。

- `width`（`int`）：盒子宽度。
- `height`（`int`）：盒子高度。

### `set_physics_shape_type(type)`
设置刚体形状的类型；初始是和对象一样大的 `rect`（在检查器勾选*启用物理*时就确定下来）。

- `type`（`str`）：`'bbox'`（渲染包围盒）、`'rect'`、`'ellipse'` 或 `'polygon'`。

## 力、速度与触地

### `apply_force(force)`
在**每帧**调用时持续施力——风、推进器、传送带。力 = `质量 × 加速度`；每次物理步进后累积值会被清空。

- `force`（`(float, float)`）：力的分量，例如 `(0, 800)` 向下推。

### `apply_impulse(impulse)`
一次性冲量：跳跃、受击、爆炸。冲量 = `质量 × 像素/秒`。

- `impulse`（`(float, float)`）：冲量分量，例如跳跃用 `(0, -400)`。

### `get_angular_velocity()`
旋转速度，单位度/秒（没有刚体时返回 `None`）。

### `get_velocity()`
速度，像素/秒（没有刚体时返回 `None`）。

### `is_grounded()`
是否踩在别的东西上。离开边缘后还有极短的“土狼时间”，让跳跃依然有效。

### `set_angular_velocity(deg_per_second)`
设置旋转速度。

- `deg_per_second`（`float`）：度/秒。

### `set_velocity(velocity)`
直接设置速度。

- `velocity`（`(float, float)`）：速度分量（像素/秒），例如 `(200, 0)`。

## 物理世界

### `get_gravity()`
当前全局重力，像素/秒²。

### `get_physics_time_scale()`
当前物理时间倍率。

### `get_physics_world()`
当前运行场景的物理世界；编辑器内或未加载场景时为 `None`。

### `is_physics_enabled()`
整个模拟是否正在运行。

### `physics_raycast(start, end)`
从 `start` 到 `end` 的射线上第一个物理对象，没有则为 `None`。射线只检测开启了**启用物理**的对象。

- `start`（`(float, float)`）：射线起点（世界坐标）。
- `end`（`(float, float)`）：射线终点（世界坐标）。

### `set_gravity(gravity)`
设置全局重力。`(0, 0)` 是太空，y 为负数则向上吸。

- `gravity`（`(float, float)`）：重力（像素/秒²），默认 `(0, 980)`。

### `set_physics_enabled(enabled)`
暂停 / 恢复整个模拟——刚体会冻结在原地。

- `enabled`（`bool`）：`True` 运行，`False` 暂停。

### `set_physics_time_scale(scale)`
设置只影响物理的时间倍率：`0.5` 慢动作，`2` 快进，`0` 相当于不动但仍然绘制。

- `scale`（`float`）：时间倍率（`>= 0`）。

## 碰撞事件

### `on_collision_enter(other)`
刚体接触时触发。只开物理就够了；即使同时开着**启用碰撞**，同一对对象也只会报告一次。

- `other`（`object`）：另一个对象。

### `on_collision_exit(other)`
刚体分开时触发。

- `other`（`object`）：另一个对象。
