---
title: Make It Better
description: Tune Air Battle and add waves, zigzag enemies, health, particles and sound.
---

The game already contains its difficulty curve. All knobs are single numbers in `script/game.py`.

## Tuning

| Want | Change |
| --- | --- |
| Faster or slower shooting | `self.fire_timer = 0.18` — smaller is faster |
| Slower bullets | `620` in `_move_bullets` |
| More breathing room | `self.spawn_timer = max(0.35, 1.1 - self.score * 0.02)` → a larger start (`1.6`) or a slower shrink (`* 0.01`) |
| Slower enemies | `enemy.speed = 90 + self.score * 3` → smaller numbers |
| More lives | `self.lives = 3` in `__init__` **and** in `_restart()` |

## Zigzag enemies

Give an enemy a direction and let it bounce off the edges — three small changes in `_spawn` and `_move_enemies`:

```python
        enemy.direction = random.choice([-1, 1]) * 120     # in _spawn
```

```python
            enemy.move(enemy.direction * dt, enemy.speed * dt)   # in _move_enemies
            width, _ = studio.get_window_size()
            if rect.left < 0 or rect.right > width:
                enemy.direction = -enemy.direction
```

## Enemies that take two hits

```python
        enemy.hp = 2                                       # in _spawn
```

```python
                if bullet.collides_with_object(enemy):
                    self._despawn(self.bullets, bullet)
                    enemy.hp -= 1
                    if enemy.hp <= 0:
                        self._despawn(self.enemies, enemy)
                        self.score += 1
                        self._update_hud()
                    break
```

## Explosions and sound

- **Particles** — add a Particle object named `Spark` (Emission Rate `0`, Spread `360`), fetch it in `on_start()` and emit a burst where an enemy was destroyed:
  `self.spark.set_pos(*enemy.get_center())` then `self.spark.emit_particles(24)`.
- **Sound** — import `audio/hit.wav` and call `studio.play_sound('./audio/hit.wav')` next to it.

## More ideas

| Idea | Hint |
| --- | --- |
| Real plane graphics | Replace the player Polygon with an **Image** object (`image_path` row); the script only uses its name and position |
| A short invulnerability after a hit | Remember `self.invulnerable = 1.0` seconds and skip the enemy × player test while it runs |
| A pause key | Toggle a `paused` flag in `on_key_down(key, ...)` of the `Game` class in `main.py` ([Game API](/api/game/)) |
| A high score on screen | Keep the best score in a fourth Text object instead of resetting `self.score` |
| A boss every 50 points | In `_spawn`, create a wider polygon with `enemy.hp = 10` when `self.score` crosses the mark |

:::note
Keep one owner per piece of state: the controller script owns score, lives and the dynamic object lists. Enemy attributes like `speed` or `hp` travel with the object and stay readable for the controller.
:::
