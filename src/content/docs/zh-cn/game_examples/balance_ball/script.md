---
title: 小球脚本
description: 用一个脚本完成平衡球的全部逻辑——倾斜平台、滚动小球、阵风、掉落与重新开始。
---

全部游戏逻辑都放在**一个**挂在球上的脚本里：读取键盘、移动小球、倾斜并收窄平台，同时管理整局的流程。

## 1. 创建并挂载脚本

在**资源面板**中选择 **Add → Script**，创建 `script/ball.py`（参考[添加脚本](/zh-cn/tutorial/add_script/)）。选中 **Ball**，把它的 **Script Path** 设置为 `ball.py`。

脚本会按名字访问三个对象，名称必须与层级面板完全一致：

```text
Canvas/Platform   Canvas/Score   Canvas/GameOver
```

## 2. 脚本内容

```python
import random

import pygamestudio as studio


class ObjectScript:
    def __init__(self, obj):
        self.obj = obj                 # the ball
        self.state = 'playing'         # playing | falling | over
        self.tilt = 0                  # -1, 0 or +1: which way the player leans
        self.speed_x = 0.0             # ball speed in pixels per second
        self.fall_speed = 0.0
        self.time_alive = 0.0
        self.best = 0.0
        self.wind_timer = 1.5
        self.platform = None
        self.score_text = None
        self.over_text = None

    def on_start(self):
        self.platform = studio.get_object_by_path('Canvas/Platform')
        self.score_text = studio.get_object_by_path('Canvas/Score')
        self.over_text = studio.get_object_by_path('Canvas/GameOver')
        self._reset()

    def on_update(self, dt):
        if self.state == 'playing':
            self._play(dt)
        elif self.state == 'falling':
            self._fall(dt)
        elif studio.is_key_pressed(studio.K_SPACE):
            self._reset()

    # ---------- the round

    def _play(self, dt):
        self.time_alive += dt
        self._update_hud()

        # 1. lean the platform while the player holds a key
        self.tilt = 0
        if studio.is_key_pressed(studio.K_LEFT):
            self.tilt -= 1
        if studio.is_key_pressed(studio.K_RIGHT):
            self.tilt += 1
        self.platform.set_angle(self.tilt * 10)

        # 2. the ball rolls downhill, friction slows it down ...
        self.speed_x += self.tilt * 340 * dt
        self.speed_x *= 0.6 ** dt          # 40% of the speed is lost per second
        self.wind_timer -= dt
        if self.wind_timer <= 0:           # ... and a gust of wind pushes it
            self.wind_timer = random.uniform(1.2, 2.6)
            self.speed_x += random.uniform(-80, 80)
        self.obj.set_x(self.obj.get_x() + self.speed_x * dt)

        # 3. the platform shrinks over time
        self.platform.set_width(max(90, 200 - self.time_alive * 8))

        # 4. rolled over the edge?
        ball_center = self.obj.get_x() + self.obj.get_width() / 2
        half = self.platform.get_width() / 2
        platform_center = self.platform.get_x() + half
        if abs(ball_center - platform_center) > half:
            self.state = 'falling'
            self.fall_speed = 0

    def _fall(self, dt):
        self.fall_speed += 900 * dt        # gravity
        self.obj.set_y(self.obj.get_y() + self.fall_speed * dt)
        if self.obj.get_y() > studio.get_window_size()[1]:
            self.state = 'over'
            self.best = max(self.best, self.time_alive)
            self.over_text.set_text(
                'Fell off after {:.1f}s\nBest: {:.1f}s - press Space'.format(self.time_alive, self.best))
            self.over_text.show()

    # ---------- helpers

    def _reset(self):
        self.state = 'playing'
        self.time_alive = 0.0
        self.speed_x = 0.0
        self.fall_speed = 0.0
        self.tilt = 0
        self.wind_timer = 1.5
        self.platform.set_angle(0)
        self.platform.set_width(200)
        self.obj.set_pos(self.platform.get_x() + self.platform.get_width() / 2 - self.obj.get_width() / 2,
                         self.platform.get_y() - self.obj.get_height())
        self.over_text.hide()
        self._update_hud()

    def _update_hud(self):
        self.score_text.set_text('Time: {:.1f}s    Best: {:.1f}s'.format(self.time_alive, self.best))
```

## 3. 逐段理解

| 代码 | 含义 |
| --- | --- |
| `self.state` | 每一局是一个很小的状态机：`playing` → `falling` → `over`，再按 **Space** 进入下一局。 |
| `dt` | 距上一帧的秒数。乘上它，游戏在任何电脑上都是同样的速度。 |
| `set_angle(self.tilt * 10)` | 倾斜只是视觉反馈；真正的"物理"在下一行：`speed_x += tilt * 340 * dt`。 |
| `self.speed_x *= 0.6 ** dt` | 指数式摩擦：不论帧率如何，小球每秒损失 40% 的速度。 |
| 阵风部分 | 每 1.2–2.6 秒追加一次最多 ±80 px/s 的随机推力，让每一局都不一样。 |
| `set_width(max(90, 200 - time * 8))` | 平台从 200 px 逐渐收窄到 90 px，这就是难度曲线。 |
| 边缘判定 | 用小球的中心与平台中心、半宽比较；掉落只是动画，不会真的穿模。 |
| `_reset()` | 把所有数值复位，`on_start()`（第一局）与 **Space**（下一局）共用它。 |
| `get_x()` / `set_x()` | 读写单个坐标分量——对于只做水平移动的游戏非常方便。 |

:::tip
路径写错时 `get_object_by_path()` 会返回 `None`。如果对象不动，且[控制台](/zh-cn/editor_introduction/console/)里出现 `NoneType` 错误，请对照层级面板检查三个路径。
:::

## 4. 运行

保存脚本（**Ctrl + S**）后按 **Ctrl + R** 运行。试着平衡小球、观察平台变窄，掉落后按 **Space** 再来一局；本次运行中的最佳成绩会被记住。

下一步：[进阶玩法](/zh-cn/game_examples/balance_ball/ideas/)——参数调整、音效与粒子。
