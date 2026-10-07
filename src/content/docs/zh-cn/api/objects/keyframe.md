---
title: 关键帧
description: 基于时间轴的关键帧动画，随时间改变位置、缩放、旋转和颜色。
---

类型标识：`KEYFRAME`

## 属性

### `angle`
旋转角度（度），顺时针为正。类型 `float`，默认 `0`。

### `auto_play`
是否自动播放。类型 `bool`，默认 `True`。

### `collision_enabled`
是否参与碰撞检测。类型 `bool`，默认 `False`。

### `collision_offset_x`、`collision_offset_y`
形状相对对象中心的偏移（`bbox` 不适用）。类型 `float`，默认 `0`。

### `collision_points`
`polygon` 形状的顶点列表。类型 `list`，默认 `[]`。

### `collision_type`
碰撞形状：`'bbox'`、`'rect'`、`'ellipse'` 或 `'polygon'`。类型 `str`，默认 `'rect'`。

### `collision_width`、`collision_height`
`rect` 与 `ellipse` 形状的尺寸。类型 `float`，默认为对象尺寸。

### `color`
填充色、文字色或图像着色，取决于对象类型。类型 `(r, g, b, a)`，默认 `(255, 255, 255, 255)`。

### `duration`
时间轴长度（秒）；时间轴至少会延伸到最后一个关键帧。类型 `float`，默认 `2.0`。

### `image_path`
作为对象本体绘制的图片，相对于工程目录；会被拉伸到 `width`/`height` 并用对象颜色着色。留空时绘制纯色方块。关键帧也可以携带自己的 `image_path`（见 `keyframes` 属性），时间轴会自行切换图片。类型 `str`，默认 `''`。

### `keyframes`
时间轴快照列表，按时间排序。每一项是一个字典：`time`（秒）、`easing`（`'linear'`、`'ease_in'`、`'ease_out'` 或 `'ease_in_out'`）、`x`、`y`、`scale_x`、`scale_y`、`angle`、`color` 与 `image_path`（`''` 为纯色方块）。关键帧的缓动决定从它开始的那一段，图片也在该段开始时切换。类型 `list`，默认 `[]`。

### `loop`
`True`：循环播放；`False`：播放一次后停在最后一个关键帧。类型 `bool`，默认 `True`。

### `name`
层级面板中显示的名称。运行时只读。类型 `str`。

### `physics_angular_damping`
角速度阻尼。类型 `float`，默认 `0`。

### `physics_elasticity`
弹性系数（`0` 为完全非弹性，`1` 为完全弹性）。类型 `float`，默认 `0.2`。

### `physics_enabled`
是否启用刚体物理。类型 `bool`，默认 `False`。

### `physics_fixed_rotation`
是否固定旋转（碰撞也不会让它转动）。类型 `bool`，默认 `False`。

### `physics_friction`
摩擦系数。类型 `float`，默认 `0.6`。

### `physics_gravity_scale`
重力缩放（`0` 表示不受重力影响）。类型 `float`，默认 `1`。

### `physics_linear_damping`
线速度阻尼。类型 `float`，默认 `0`。

### `physics_mass`
质量。类型 `float`，默认 `1`。

### `physics_shape_height`、`physics_shape_width`
刚体形状 `rect`、`ellipse` 的尺寸（`0` 表示使用对象自身尺寸）。类型 `float`，默认 `0`。

### `physics_shape_offset_x`、`physics_shape_offset_y`
刚体形状相对对象中心的偏移。类型 `float`，默认 `0`。

### `physics_shape_points`
刚体形状 `polygon` 的顶点列表。类型 `list`，默认 `[]`。

### `physics_shape_type`
刚体形状：`'rect'`、`'ellipse'` 或 `'polygon'`。类型 `str`，默认 `'rect'`。

### `physics_type`
刚体类型：`'static'`、`'dynamic'` 或 `'kinematic'`。类型 `str`，默认 `'dynamic'`。

### `pivot`
变换基准点模式，可选值见 `set_pivot()`。类型 `str`，默认 `'center'`。

### `pivot_x`、`pivot_y`
`'custom'` 基准点的坐标（对象自身的像素网格，原点在对象左上角）。类型 `float`，默认 `0`。

### `playback_speed`
播放倍速（`1` 为实时，`2` 为两倍速）。类型 `float`，默认 `1`。

### `pos`
即 `(x, y)`，赋值时会同步更新 `x` 和 `y`。类型 `(int, int)`，默认 `(20, 20)`。

### `scale`
即 `(scale_x, scale_y)`。类型 `(float, float)`，默认 `(1, 1)`。

### `scale_x`、`scale_y`
缩放系数（`1` 为原始大小）。类型 `float`，默认 `1`。

### `script_path`
已挂载脚本的路径（相对于工程目录）。类型 `str`，默认 `''`。

### `size`
即 `(width, height)`。类型 `(int, int)`。

### `type`
类型标识；关键帧为 `KEYFRAME`。运行时只读。类型 `str`。

### `uuid`
唯一标识，供 `get_object_by_uuid()` 使用。运行时只读。类型 `str`。

### `visible`
隐藏的对象不会绘制，也无法被点击。类型 `bool`，默认 `True`。

### `width`、`height`
像素尺寸。类型 `int`，默认随对象类型而定。

### `x`、`y`
相对于父对象的位置。类型 `int`，默认 `20`。


## 方法

### `collides_with_object(other)`
`is_colliding_with_object` 的别名。

- `other`（`object`）：另一个对象。

### `collides_with_point(x, y)`
点（场景坐标）是否落在碰撞形状内。

- `x`（`int`）：点的 x（场景坐标）。
- `y`（`int`）：点的 y（场景坐标）。

### `collides_with_rect(rect)`
形状是否与 `pygame.Rect` 或 `(x, y, w, h)` 元组重叠。

- `rect`（`pygame.Rect` | `(int, int, int, int)`）：矩形（场景坐标）。

### `distance_to(x, y)`
对象中心到某个点的距离。

- `x`（`int`）：点的 x（场景坐标）。
- `y`（`int`）：点的 y（场景坐标）。

### `distance_to_object(other)`
两个对象中心之间的距离。

- `other`（`object`）：另一个对象。

### `evaluate_at(time)`
某时刻插值后的通道数值：包含 `x`、`y`、`scale_x`、`scale_y`、`angle` 与 `color` 的字典；没有关键帧时为 `None`。第一个关键帧之前 / 最后一个关键帧之后保持最近的快照。

- `time`（`float`）：距时间轴起点的秒数。

### `get_angle()`
旋转角度（度）。

### `get_auto_play_state()`
是否开启了自动播放。

### `get_center()`
对象中心（场景坐标）。

### `get_collision_center()`
碰撞形状的中心（场景坐标）。

### `get_collision_offset()`
形状相对对象中心的偏移。

### `get_collision_polygon()`
多边形顶点列表。

### `get_collision_radius()`
椭圆形状的半径（较短边的一半）。

### `get_collision_rect(x, y, width, height)`
与矩形的重叠区域，没有重叠时为 `None`。

- `x`（`int`）：矩形的 x（场景坐标）。
- `y`（`int`）：矩形的 y（场景坐标）。
- `width`（`int`）：矩形宽度。
- `height`（`int`）：矩形高度。

### `get_collision_size()`
`rect` 与 `ellipse` 形状的尺寸。

### `get_collision_type()`
当前碰撞形状。

### `get_color()`
填充、文字或着色颜色 `(r, g, b, a)`。

### `get_direction_to(x, y)`
从对象指向某点的单位向量 `(dx, dy)`。

- `x`（`int`）：点的 x（场景坐标）。
- `y`（`int`）：点的 y（场景坐标）。

### `get_duration()`
时间轴长度（秒）。

### `get_height()`
高度（像素）。

### `get_image_path()`
作为对象本体绘制的图片路径（相对于工程目录，`''` 为纯色方块）。

### `get_keyframes()`
时间轴快照的副本。

### `get_loop_state()`
`True` 循环播放；`False` 播放一次后停在最后一个关键帧。

### `get_name()`
对象名称。

### `get_pivot()`
变换基准点模式（如 `'center'`、`'top_left'`、`'custom'`）。

### `get_pivot_point()`
基准点解析到对象内容像素后的坐标 `(x, y)`。

### `get_playback_speed()`
当前播放倍速。

### `get_pos()`
相对父对象的本地坐标 `(x, y)`。

### `get_rect()`
对象的本地 `pygame.Rect`。

### `get_scale()`
缩放系数 `(scale_x, scale_y)`。

### `get_scale_x()`
x 方向缩放系数。

### `get_scale_y()`
y 方向缩放系数。

### `get_size()`
尺寸 `(宽, 高)`（像素）。

### `get_time()`
播放时钟当前的位置（秒）。

### `get_timeline_length()`
时间轴长度（秒）：取 `duration` 与最后一个关键帧时间中较大的那个。

### `get_type()`
对象类型标识。

### `get_uuid()`
对象 uuid。

### `get_visible_state()`
读取 `visible` 状态。

### `get_width()`
宽度（像素）。

### `get_world_pos()`
叠加父对象偏移后的场景坐标。

### `get_world_rect()`
场景坐标下的 `pygame.Rect`。

### `get_x()`
本地坐标的 x 分量。

### `get_y()`
本地坐标的 y 分量。

### `hide()`
隐藏对象，等同于设置 `obj.visible = False`。

### `is_auto_play()`
自动播放是否开启。

### `is_colliding_with_object(other)`
两个对象都开启碰撞且形状重叠时为 `True`。

- `other`（`object`）：另一个对象。

### `is_colliding_with_rect(x, y, width, height)`
形状是否与给定矩形重叠。

- `x`（`int`）：矩形的 x（场景坐标）。
- `y`（`int`）：矩形的 y（场景坐标）。
- `width`（`int`）：矩形宽度。
- `height`（`int`）：矩形高度。

### `is_collision_enabled()`
该对象是否开启了碰撞检测。

### `is_hidden()`
对象是否被隐藏。

### `is_point_inside(x, y)`
轻量检测：点落在对象的外接矩形内即为 `True`。

- `x`（`int`）：点的 x（场景坐标）。
- `y`（`int`）：点的 y（场景坐标）。

### `is_pressed(x, y)`
逐像素检测：只有落在非透明像素上才是 `True`。适合处理点击，不适合每帧调用。

- `x`（`int`）：点的 x（场景坐标）。
- `y`（`int`）：点的 y（场景坐标）。

### `is_shown()`
同 `is_visible()`。

### `is_visible()`
对象是否可见。

### `move(dx, dy)`
在当前位置上移动 `(dx, dy)` 像素。

- `dx`（`int`）：水平位移。
- `dy`（`int`）：垂直位移。

### `pause()`
停在当前时间。

### `play()`
开始或继续播放。

### `preview_at(time)`
把某时刻的时间轴数值临时应用到对象上而不播放（动画编辑器拖动播放头时使用）。应用成功返回 `True`。

- `time`（`float`）：距时间轴起点的秒数。

### `reset_collision_shape()`
把形状字段重置为对象自身尺寸。

### `restart()`
回到起点并重新播放。

### `set_angle(degrees)`
设置旋转角度。

- `degrees`（`float`）：角度（度），顺时针为正。

### `set_auto_play_state(auto_play)`
设置自动播放开关。

- `auto_play`（`bool`）：`True` 播放，`False` 暂停。

### `set_center(x, y)`
设置对象中心（场景坐标）。

- `x`（`int`）：新的中心 x。
- `y`（`int`）：新的中心 y。

### `set_collision_ellipse(radius_x, radius_y)`
便捷方法：用两个半径设置椭圆。

- `radius_x`（`float`）：水平半径。
- `radius_y`（`float`）：垂直半径。

### `set_collision_enabled(enabled)`
开启 / 关闭碰撞检测。关闭时所有 `collides_with_*` / `is_colliding_*` 都返回 `False`。

- `enabled`（`bool`）：`True` / `False`。

### `set_collision_offset(x, y)`
让形状相对对象中心偏移（会跟随缩放与旋转）。

- `x`（`float`）：水平偏移。
- `y`（`float`）：垂直偏移。

### `set_collision_polygon(points)`
设置多边形顶点。

- `points`（`list`）：顶点列表，例如 `[(0, 0), (50, 0), (25, 40)]`。

### `set_collision_size(width, height)`
设置 `rect` 与 `ellipse` 的尺寸。

- `width`（`int`）：形状宽度。
- `height`（`int`）：形状高度。

### `set_collision_type(type)`
设置碰撞形状。

- `type`（`str`）：`'bbox'`、`'rect'`、`'ellipse'` 或 `'polygon'`。

### `set_color(color)`
设置颜色。

- `color`（`(r, g, b, a)`）：新的颜色元组。

### `set_duration(duration)`
设置时间轴长度。

- `duration`（`float`）：秒。

### `set_height(h)`
设置高度。

- `h`（`int`）：新的高度（像素）。

### `set_image_path(image_path)`
设置作为对象本体绘制的图片。

- `image_path`（`str`）：相对工程目录的路径；`''` 表示绘制纯色方块。

### `set_keyframes(keyframes)`
替换整条时间轴。传入的项会被清洗并按时间排序。

- `keyframes`（`list`）：快照字典列表（见 `keyframes` 属性）。

### `set_loop_state(loop)`
设置循环播放开关。

- `loop`（`bool`）：`True` 循环，`False` 只播放一次。

### `set_pivot(pivot)`
设置变换基准点模式。

- `pivot`（`str`）：`'center'`（默认）、`'top_left'`、`'top_center'`、`'top_right'`、`'center_left'`、`'center_right'`、`'bottom_left'`、`'bottom_center'`、`'bottom_right'` 或 `'custom'`。

### `set_pivot_point(x, y)`
把基准点设到对象自身像素网格的任意一点（同时把 `pivot` 设为 `'custom'`）。

- `x`（`float`）：基准点 x（对象自身像素网格）。
- `y`（`float`）：基准点 y。

### `set_playback_speed(playback_speed)`
设置播放倍速（最小 `0.01`）。

- `playback_speed`（`float`）：倍速，`1` 为实时。

### `set_pos(x, y)`
设置相对父对象的本地坐标。

- `x`（`int`）：新的 x，相对父对象（像素）。
- `y`（`int`）：新的 y，相对父对象（像素）。

### `set_scale(sx, sy)`
设置两个缩放系数。

- `sx`（`float`）：x 方向缩放系数。
- `sy`（`float`）：y 方向缩放系数。

### `set_scale_x(sx)`
设置 x 方向缩放系数。

- `sx`（`float`）：x 方向缩放系数。

### `set_scale_y(sy)`
设置 y 方向缩放系数。

- `sy`（`float`）：y 方向缩放系数。

### `set_size(width, height)`
设置尺寸（像素）。

- `width`（`int`）：新的宽度。
- `height`（`int`）：新的高度。

### `set_time(time)`
跳到某个时间点（播放从那里继续）。开启循环时超出长度的部分会按时间轴长度取模。

- `time`（`float`）：距时间轴起点的秒数。

### `set_visible_state(visible)`
设置 `visible` 状态。

- `visible`（`bool`）：`True` 显示对象，`False` 隐藏对象。

### `set_width(w)`
设置宽度。

- `w`（`int`）：新的宽度（像素）。

### `set_world_pos(x, y)`
设置场景坐标（已叠加父对象偏移）。

- `x`（`int`）：新的 x（场景坐标）。
- `y`（`int`）：新的 y（场景坐标）。

### `set_x(x)`
设置本地坐标的 x 分量。

- `x`（`int`）：新的 x，相对父对象。

### `set_y(y)`
设置本地坐标的 y 分量。

- `y`（`int`）：新的 y，相对父对象。

### `show()`
显示对象，等同于设置 `obj.visible = True`。

### `stop()`
暂停并回到起点。


## 事件

### `on_animation_finished()`
单次播放的动画到达最后一个关键帧时。

### `on_animation_start()`
动画（重新）开始播放时。

### `on_clicked()`
在该对象上完成一次按下并释放。

### `on_collision_enter(other)`
开始与 `other` 重叠（双方都需要开启碰撞）。

- `other`（`object`）：另一个对象。

### `on_collision_exit(other)`
与 `other` 的重叠结束。

- `other`（`object`）：另一个对象。

### `on_destroy()`
场景被替换、对象被 `studio.destroy_object()` 移除，或游戏退出时执行。

### `on_double_clicked()`
双击该对象。

### `on_drag(pos)`
拖动过程中鼠标移动。

- `pos`（`(int, int)`）：指针位置（场景坐标）。

### `on_drag_end()`
拖动结束。

### `on_drag_start()`
在对象上开始拖动。

### `on_mouse_enter()`
鼠标移入对象。

### `on_mouse_leave()`
鼠标移出对象。

### `on_pressed()`
在该对象上按下鼠标左键。

### `on_released()`
在该对象上按下的按键被释放。

### `on_right_clicked()`
右键点击该对象。

### `on_start()`
场景加载完成后执行一次。

### `on_update(dt)`
每帧执行。

- `dt`（`float`）：距上一帧的秒数。

### `on_visible_changed(visible)`
对象被显示或隐藏时。

- `visible`（`bool`）：显示为 `True`，隐藏为 `False`。
## 辅助函数

### `snapshot_from_object(obj, time=0.0, easing='linear')`
把对象当前的通道值打包成一帧关键帧快照。

- `obj`（`object`）：要快照的对象。
- `time`（`float`）：快照时间（秒）。
- `easing`（`str`）：从该帧开始的段所用的缓动曲线。

### `normalize_keyframes(keyframes)`
清洗并排序关键帧列表：排序、补全缺失的通道、钳制取值范围，返回新的列表（不会改动传入的数据）。

- `keyframes`（`list`）：关键帧字典列表。

### `ease_progress(kind, t)`
把 `0`~`1` 的线性进度映射为指定缓动曲线的进度。

- `kind`（`str`）：`'linear'`、`'ease_in'`、`'ease_out'` 或 `'ease_in_out'`。
- `t`（`float`）：线性进度（`0`~`1`）。

### `DEFAULT_EASING`
默认缓动曲线（`'linear'`）。

### `EASING_CURVES`
全部缓动曲线名：`('linear', 'ease_in', 'ease_out', 'ease_in_out')`。

### `KEYFRAME_CHANNELS`
关键帧动画的通道列表：`('x', 'y', 'scale_x', 'scale_y', 'angle', 'color', 'image_path')`。
