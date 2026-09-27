---
title: 进阶玩法
description: 调整平衡球的手感，加入音效与粒子，并尝试新的规则。
---

所有影响难度的数值都集中在脚本的几行里。每次只改一处，感受一下区别。

## 参数调整

| 想要的效果 | 修改位置 |
| --- | --- |
| 更温和的游戏 | `self.speed_x += self.tilt * 340 * dt` → 改小，例如 `220` |
| 更强的抓地力 | `self.speed_x *= 0.6 ** dt` → `0.5 ** dt`（球减速更快） |
| 更少的阵风 | `random.uniform(-80, 80)` → `(-40, 40)`，或延长 `wind_timer` |
| 更快收窄平台 | `max(90, 200 - self.time_alive * 8)` → `* 14` |
| 更轻松的起步 | `_reset()` 里的 `self.platform.set_width(200)` → `260` |

## 音效

在资源面板导入一个 `.wav` 文件（例如 `audio/fall.wav`），在掉落瞬间播放：

```python
    def _fall(self, dt):
        if self.fall_speed == 0.0:                     # first falling frame only
            studio.play_sound('./audio/fall.wav')
        self.fall_speed += 900 * dt
        ...
```

## 落到底部时的粒子迸发

添加一个名为 `Spark` 的**粒子**对象（Emission Rate 设 `0`、Lifetime `0.5`、Spread `360`），在 `on_start()` 里用 `studio.get_object_by_path('Canvas/Spark')` 获取它，然后在掉落结束时触发一次：

```python
    self.spark.set_pos(self.obj.get_x(), self.obj.get_y())
    self.spark.emit_particles(30)
```

## 可以尝试的新规则

| 想法 | 提示 |
| --- | --- |
| 平台上下漂移 | 在 `_play` 中：`self.platform.set_y(420 + math.sin(self.time_alive) * 40)`（需要在文件开头加上 `import math`） |
| 两个球 | 再加一个椭圆并使用同一个脚本——每个对象拥有各自的脚本实例，互不干扰 |
| 移动的障碍物 | 一块横穿平台的小矩形，用 `collides_with_object()` 判定并结束本局 |
| 鼠标控制 | 让平台向指针倾斜：比较 `studio.get_mouse_position()[0]` 与平台中心 |
| 记录最高分 | 把 `best` 变量换成第三个文本对象来显示 |

:::note
每个对象都有**自己的**脚本实例——两个都挂 `ball.py` 的球不会共享 `self.time_alive`。需要共享的状态（例如总分）应该放在画布上的一个总控脚本里。
:::
