---
title: The Ball Script
description: The complete Balance Ball logic in one script - leaning the platform, rolling the ball, wind, falling and restarting.
---

All of the game logic lives in **one** script attached to the ball. It reads the keyboard, moves the ball, leans the platform, shrinks it, and manages the round.

## 1. Create and attach the script

In the **Asset** panel choose **Add → Script** and create `script/ball.py` ([Add a Script](/tutorial/add_script/)). Select the **Ball** and set its **Script Path** row to `ball.py`.

Three names are addressed by the script — they have to match the Hierarchy exactly:

```text
Canvas/Platform   Canvas/Score   Canvas/GameOver
```

## 2. The script

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

## 3. How it works

| Piece | Meaning |
| --- | --- |
| `self.state` | The round is a tiny state machine: `playing` → `falling` → `over`, and **Space** starts the next round. |
| `dt` | Seconds since the last frame. Multiplying by it makes the game run at the same speed on every computer. |
| `set_angle(self.tilt * 10)` | Leaning the platform is feedback, the physics is the next line: `speed_x += tilt * 340 * dt`. |
| `self.speed_x *= 0.6 ** dt` | Exponential friction: the ball loses 40% of its speed per second, whatever the frame rate. |
| Wind block | Every 1.2–2.6 seconds an extra push of up to ±80 px/s keeps the run unpredictable. |
| `set_width(max(90, 200 - time * 8))` | The platform shrinks from 200 px down to 90 px — the difficulty curve. |
| Edge check | The ball's centre is compared with the platform's centre and half-width; nothing falls through, the drop is animation only. |
| `_reset()` | Puts every value back and is shared by `on_start()` (first round) and **Space** (next round). |
| `get_x()` / `set_x()` | Reading and writing a single position component — handy for a game that only moves horizontally. |

:::tip
`get_object_by_path()` returns `None` for a wrong path. If nothing moves and the [Console](/editor_introduction/console/) shows `NoneType` errors, compare the paths with the names in the Hierarchy panel.
:::

## 4. Run it

Save the script (**Ctrl + S**) and press **Ctrl + R**. Balance the ball, watch the platform shrink, and press **Space** after a fall. Every run remembers the best time of the session.

Next: [make it better](/game_examples/balance_ball/ideas/) — tuning, sound and particles.
