---
title: 多边形
description: 由顶点列表构成的自由形状。
---

类型标识：`POLYGON`

## 属性

### `angle`
旋转角度（度），顺时针为正。类型 `float`，默认 `0`。

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

### `name`
层级面板中显示的名称。运行时只读。类型 `str`。

### `points`
顶点列表（场景坐标）；顶点 `(0, 0)` 位于画布原点，因此顶点列表描述的是形状的绝对位置。类型 `list`，默认 = 五边形。

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
类型标识，如 `RECT`、`TEXT_INPUT`。运行时只读。类型 `str`。

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

### `get_angle()`
旋转角度（度）。

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

### `get_height()`
高度（像素）。

### `get_name()`
对象名称。

### `get_points()`
顶点列表（场景坐标）。

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

### `reset_collision_shape()`
把形状字段重置为对象自身尺寸。

### `set_angle(degrees)`
设置旋转角度。

- `degrees`（`float`）：角度（度），顺时针为正。

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

### `set_height(h)`
设置高度。

- `h`（`int`）：新的高度（像素）。

### `set_points(points)`
替换顶点。

- `points`（`list`）：顶点列表（场景坐标），例如 `[(0, 0), (100, 0), (50, 80)]`。

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

## 事件

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
