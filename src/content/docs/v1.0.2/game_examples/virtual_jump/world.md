---
title: Scrolling Background & Dynamic Objects
description: Seamless looping of two background panels, and the "hidden template + runtime copies" pattern behind the bullets and the fruit.
---

This page covers the first half of `game_manager.py` (the director script on the canvas) plus the two template scripts, `bullet.py` and `apple.py`.

![Bullets and fruit](/images/doc/virtual_jump_world.png)

## A seamlessly scrolling background

The idea is simple: **place two equally sized panels one after the other, move them all upwards**, and when the top panel has fully left the screen, move it below the other one - repeat forever.

```python
    SPEED = 90.0                                # scroll speed (pixels / second)

    def _start_background(self):
        self.panels = [BackgroundA, BackgroundB]        # found in the scene
        screen_h = studio.get_screen().get_height()
        panel_h = self.panels[0].get_height()
        self.period = panel_h * math.ceil(screen_h / panel_h)   # wrap distance >= screen
        for index, panel in enumerate(self.panels):
            panel.y = self.period * index               # first at y=0, second below it

    def _update_background(self, dt: float):
        step = self.SPEED * dt
        for panel in self.panels:
            panel.y -= step
            if panel.y <= -self.period:                 # fully above the screen
                panel.y += self.period * len(self.panels)   # move it below - seamless
```

Why it never shows a seam:

- The wrap distance is **a whole multiple of the panel height and at least the screen height**, so the seam always lines up no matter how tall the panels or their images are.
- To change the speed, edit `SPEED`. `BackgroundC` is a static layer and needs no script.

## Bullets: hidden template + runtime copies

The `Bullet` object in the scene is only a **template**: hidden at start, and copied whenever a bullet is needed. Dozens of bullets on screen cost almost nothing.

```python
    def _spawn_bullet(self):
        # 1. spawn just outside a random edge (top / left / right)
        edge = random.choice(("top", "left", "right"))
        # ...pick the spawn position 40-120 px outside the screen
        # 2. aim from the spawn point at the player's centre, with a little jitter
        target_x, target_y = self._player_center()
        angle = math.atan2(target_y - (y + bullet_h * 0.5),
                           target_x - (x + bullet_w * 0.5))
        angle += random.uniform(-self.AIM_JITTER, self.AIM_JITTER)
        # 3. copy the template and let the copy's script launch itself
        bullet = self._spawn_copy(template, "bullet_%d" % self.bullet_index,
                                  {"x": x, "y": y})
        bullet.script_instance.launch((math.cos(angle), math.sin(angle)),
                                      random.uniform(*self.BULLET_SPEED))
```

`bullet.py` itself only does three things:

1. flies **straight** along the direction and speed fixed by `launch()` (turning the sprite towards its heading);
2. **destroys itself** once it is 220 px outside the screen;
3. sets `hit_player = True` when it touches the player - scoring and losing are handled by the manager (next page).

The rhythm and the safety net are all constants: one bullet every **0.8 s ± 0.3**, at most **25** at once, at **150-300 px/s**.

## Fruit: the same template pattern

Fruit is even simpler - it falls from a random x above the screen:

```python
        left = self.APPLE_EDGE
        right = max(left, width - self.APPLE_EDGE - apple_w)
        x = random.uniform(left, right)                          # random horizontal spot
        y = -apple_h - random.uniform(*self.APPLE_SPAWN_MARGIN)  # born above the screen
        apple = self._spawn_copy(template, "apple_%d" % self.apple_index,
                                 {"x": x, "y": y})
        apple.script_instance.set_fall_speed(random.uniform(*self.APPLE_SPEED))
```

`apple.py` falls, destroys itself below the screen, and sets `collected = True` when the player touches it. The spawn interval is deliberately loose (**2.5-4.5 s**), so catching one actually feels good.

## Two ground rules of this pattern

- **Templates are prefabs only**: `Bullet` / `apple` are `hide()`-den at start; runtime copies are named with a prefix (`bullet_1`, `apple_1`, ...) so a restart can clear them all in one sweep.
- **Never do heavy work inside a collision callback**: the bullet and fruit only set a flag on themselves (`hit_player` / `collected`); the manager processes them on the next frame - destroying objects inside the engine's collision callback is not safe.
