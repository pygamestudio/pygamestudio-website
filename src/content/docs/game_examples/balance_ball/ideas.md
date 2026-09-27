---
title: Make It Better
description: Tune Balance Ball, add sound and particles, and try new rules.
---

Everything that shapes the difficulty sits in a handful of numbers. Change one at a time and feel the difference.

## Tuning

| Want | Change |
| --- | --- |
| A calmer game | `self.speed_x += self.tilt * 340 * dt` → smaller number, e.g. `220` |
| More grip | `self.speed_x *= 0.6 ** dt` → `0.5 ** dt` (slower ball) |
| Less wind | `random.uniform(-80, 80)` → `(-40, 40)`, or a longer `wind_timer` |
| A shorter platform earlier | `max(90, 200 - self.time_alive * 8)` → `* 14` |
| An easier start | `self.platform.set_width(200)` in `_reset()` → `260` |

## Sound

Import a `.wav` file in the Asset panel (for example `audio/fall.wav`) and play it when the ball drops:

```python
    def _fall(self, dt):
        if self.fall_speed == 0.0:                     # first falling frame only
            studio.play_sound('./audio/fall.wav')
        self.fall_speed += 900 * dt
        ...
```

## A burst when the ball hits the bottom

Add a **Particle** object named `Spark` (Emission Rate `0`, Lifetime `0.5`, Spread `360`), fetch it in `on_start()` with `studio.get_object_by_path('Canvas/Spark')` and emit one burst when the fall ends:

```python
    self.spark.set_pos(self.obj.get_x(), self.obj.get_y())
    self.spark.emit_particles(30)
```

## New rules to try

| Idea | Hint |
| --- | --- |
| The platform drifts up and down | In `_play`, `self.platform.set_y(420 + math.sin(self.time_alive) * 40)` (add `import math` at the top) |
| Two balls | A second Ellipse with the same script — each object gets its own script instance, so they balance independently |
| A moving obstacle | A small Rect crossing the platform; use `collides_with_object()` to end the round |
| Mouse control | Lean towards the pointer: `studio.get_mouse_position()[0]` compared with the platform centre |
| Keep the high score | Store it in an extra Text object instead of the `best` variable |

:::note
Each object owns its **own instance** of the script — two balls with `ball.py` never share `self.time_alive`. State that must be shared (like a total score) belongs in one controller script on the Canvas.
:::
