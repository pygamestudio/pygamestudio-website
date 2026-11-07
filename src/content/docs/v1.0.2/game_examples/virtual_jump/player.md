---
title: Player Control
description: One script handles running, flipping, gravity jumps, the double jump, the dash and animation switching.
---

The player's `player.py` reads the keyboard every frame and updates position, velocity and animation. The core decision is **computing gravity by hand** instead of using the physics engine - for a precision platformer like this, scripted movement is simpler and steadier.

![The Player node](/images/doc/virtual_jump_player.png)

## Running and flipping

```python
    MOVE_SPEED = 260.0              # horizontal speed (pixels / second)

    def _update_horizontal(self, dt: float):
        dx = 0.0
        if self._any_key(self.LEFT_KEYS) and not self._any_key(self.RIGHT_KEYS):
            dx = -self.MOVE_SPEED * dt
        elif self._any_key(self.RIGHT_KEYS) and not self._any_key(self.LEFT_KEYS):
            dx = self.MOVE_SPEED * dt
        if dx:
            self.obj.x += dx
            self._clamp_x()                     # never leave the screen
            self._set_facing(self.FACING_LEFT if dx < 0 else self.FACING_RIGHT)
        self.moving = dx != 0.0
```

**Turning around does not swap sprites**: making the X scale negative mirrors the image; with a centered pivot it flips in place:

```python
    def _set_facing(self, facing: int):
        if facing == self.facing:
            return
        self.facing = facing
        self.obj.set_scale_x(self.base_scale_x * facing)   # left = negative X scale
```

## Gravity, jumping and the double jump

```python
    GRAVITY = 2000.0            # pixels / second²
    JUMP_SPEED = 700.0          # first jump
    DOUBLE_JUMP_SPEED = 600.0   # double jump (a bit softer: snappier feel)
```

Every frame adds `gravity × dt` to the vertical speed and moves by it; landing resets everything:

```python
        self.velocity_y += self.GRAVITY * dt
        self.obj.y += self.velocity_y * dt
        if self.obj.y >= self.ground_y:          # landed
            self.obj.y = self.ground_y
            self.velocity_y = 0.0
            self.on_ground = True
            self.jumps_used = 0
```

Jumping uses a "**just pressed**" check (remembering whether the key was held last frame), so holding the key does not keep jumping:

```python
        jump_down = (studio.is_key_pressed(studio.K_SPACE)
                     or studio.is_key_pressed(studio.K_UP)
                     or studio.is_key_pressed(studio.K_w))
        just_pressed = jump_down and not self.jump_key_down
        self.jump_key_down = jump_down
        if not just_pressed:
            return
        if self.on_ground:                       # first jump
            self.velocity_y = -self.JUMP_SPEED
            self.on_ground = False
            self.jumps_used = 1
        elif self.jumps_used < 2:                # double jump in mid-air
            self.velocity_y = -self.DOUBLE_JUMP_SPEED
            self.jumps_used = 2
```

## Dash (the D key)

Pressing D burst-moves the player at **950 px/s** for **0.18 s** (about 170 pixels) towards the current facing, followed by a 0.45 s cooldown; during the dash the direction is locked and left/right are ignored:

```python
        if just_pressed and not self.is_dashing() and self.dash_cooldown <= 0.0:
            self._start_dash()
        if self.dash_timer > 0.0:
            self.dash_timer = max(0.0, self.dash_timer - dt)
            self.obj.x += self.dash_dir * self.DASH_SPEED * dt
            self._clamp_x()          # at the screen edge it just stops moving; the dash still ends
```

## Animation switching

Only one of the four Keyframe animations (`idle` / `run` / `jump` / `double jump`) is visible at a time:

```python
    def _update_anim(self):
        if not self.on_ground:
            want = self.double_jump if self.jumps_used >= 2 else self.jump
        else:
            want = self.run if (self.moving or self.is_dashing()) else self.idle
        if want is None or want is self.current_anim:
            return
        if want in (self.run, self.jump, self.double_jump):
            want.restart()               # play from the first frame
        self._show_anim(want)

    def _show_anim(self, anim):
        for other in (self.idle, self.run, self.jump, self.double_jump):
            if other is not None and other is not anim:
                other.hide()
        if anim is not None:
            anim.show()
            anim.play()
        self.current_anim = anim
```

- `idle` / `run` loop (set in `on_start`); `jump` / `double jump` play once and hold the last frame;
- Running and dashing turn on the **dust particles** (`set_emission_rate`); stopping first stops the rate, then hides the emitter (a hidden emitter would still spawn particles).

## Sound

- First jump and double jump share `jump.mp3`; the dash uses `dash.mp3`;
- `on_start` **preloads** them with `studio.load_sound()`, so playing later never has to read a file - especially important in the web build.

## The interface the game manager uses

On a game over the manager sets `player.frozen = True` and this script simply skips updating (the player stands still); on restart it calls `reset()`, which clears velocity, jump and dash state and re-syncs the facing with the node's real `scale_x`.

:::tip
To tune the feel, change `MOVE_SPEED`, `GRAVITY`, `JUMP_SPEED` or the `DASH_*` constants - every one of them is commented in the script.
:::
