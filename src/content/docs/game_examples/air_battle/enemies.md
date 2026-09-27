---
title: Part 2 — Enemies and Lives
description: Spawning enemy planes, hit tests with collides_with_object(), score, three lives and a restart - the rest of the Air Battle script.
---

Part 2 completes `script/game.py`: enemy planes dive from the top of the window, bullets score, the player loses a life on a hit or a plane slipping past, and **Space** starts a fresh round when it is over.

## 1. What gets added

| Place | Addition |
| --- | --- |
| `import` | `import random` — for the spawn position |
| `__init__` | `self.enemies`, `self.spawn_timer`, `self.score`, `self.lives`, `self.state` |
| `on_start` | fetch `Lives` and `GameOver`, remember the player's start position, hide the game-over label |
| `on_update` | stop when `state == 'over'` (only **Space** runs), then `_spawn`, `_move_enemies`, `_hit_test` |
| new methods | `_spawn`, `_move_enemies`, `_hit_test`, `_lose_life`, `_clear_dynamic`, `_update_hud`, `_restart` |

## 2. The full script

Replace `script/game.py` with the complete version:

```python
import random

import pygamestudio as studio


class ObjectScript:
    def __init__(self, obj):
        self.obj = obj                  # the Canvas - this script controls the game
        self.player = None
        self.score_text = None
        self.lives_text = None
        self.over_text = None
        self.player_start = (370, 520)
        self.bullets = []               # the controller moves these objects
        self.enemies = []
        self.fire_timer = 0.0
        self.spawn_timer = 0.8
        self.score = 0
        self.lives = 3
        self.state = 'playing'          # playing | over

    def on_start(self):
        self.player = studio.get_object_by_path('Canvas/Player')
        self.score_text = studio.get_object_by_path('Canvas/Score')
        self.lives_text = studio.get_object_by_path('Canvas/Lives')
        self.over_text = studio.get_object_by_path('Canvas/GameOver')
        self.player_start = self.player.get_world_rect().topleft
        self.over_text.hide()
        self._update_hud()

    def on_update(self, dt):
        if self.state == 'over':
            if studio.is_key_pressed(studio.K_SPACE):
                self._restart()
            return

        self._move_player(dt)
        self._fire(dt)
        self._move_bullets(dt)
        self._spawn(dt)
        self._move_enemies(dt)
        self._hit_test()

    # ---------- the player

    def _move_player(self, dt):
        speed = 420
        rect = self.player.get_world_rect()
        x = rect.left
        if studio.is_key_pressed(studio.K_LEFT):
            x -= speed * dt
        if studio.is_key_pressed(studio.K_RIGHT):
            x += speed * dt
        width, _ = studio.get_window_size()
        x = max(0, min(x, width - rect.width))
        self.player.set_world_pos(x, rect.top)

    def _fire(self, dt):
        self.fire_timer -= dt
        if self.fire_timer > 0 or not studio.is_key_pressed(studio.K_SPACE):
            return
        self.fire_timer = 0.18

        rect = self.player.get_world_rect()
        bullet = studio.create_object('RECT', 'Canvas', 'Bullet', {
            'x': rect.centerx - 3, 'y': rect.top - 18,
            'width': 6, 'height': 16,
            'color': (255, 220, 80, 255),
            'collision_enabled': True, 'collision_type': 'bbox',
        })
        self.bullets.append(bullet)

    # ---------- bullets

    def _move_bullets(self, dt):
        for bullet in list(self.bullets):
            bullet.set_y(bullet.get_y() - 620 * dt)
            if bullet.get_world_rect().bottom < 0:
                self._despawn(self.bullets, bullet)

    # ---------- enemies

    def _spawn(self, dt):
        self.spawn_timer -= dt
        if self.spawn_timer > 0:
            return
        self.spawn_timer = max(0.35, 1.1 - self.score * 0.02)   # quicker over time

        width, _ = studio.get_window_size()
        cx = random.randint(30, width - 30)
        enemy = studio.create_object('POLYGON', 'Canvas', 'Enemy', {
            'points': [(cx - 18, -30), (cx + 18, -30), (cx, -4)],
            'color': (230, 90, 90, 255),
            'collision_enabled': True, 'collision_type': 'bbox',
        })
        enemy.speed = 90 + self.score * 3        # the controller moves it by this
        self.enemies.append(enemy)

    def _move_enemies(self, dt):
        _, height = studio.get_window_size()
        for enemy in list(self.enemies):
            rect = enemy.get_world_rect()
            if rect.top > height:                # slipped past the player
                self._despawn(self.enemies, enemy)
                self._lose_life()
                continue
            if enemy.collides_with_object(self.player):
                self._despawn(self.enemies, enemy)
                self._lose_life()
                continue
            enemy.move(0, enemy.speed * dt)

    # ---------- scoring

    def _hit_test(self):
        for bullet in list(self.bullets):
            for enemy in list(self.enemies):
                if bullet.collides_with_object(enemy):
                    self._despawn(self.bullets, bullet)
                    self._despawn(self.enemies, enemy)
                    self.score += 1
                    self._update_hud()
                    break

    def _lose_life(self):
        self.lives -= 1
        self._update_hud()
        if self.lives <= 0:
            self.state = 'over'
            self.over_text.set_text('Game Over - score {}\nPress Space to restart'.format(self.score))
            self.over_text.show()

    # ---------- helpers

    def _despawn(self, items, item):
        items.remove(item)
        studio.destroy_object(item)

    def _clear_dynamic(self):
        for item in self.bullets + self.enemies:
            studio.destroy_object(item)
        self.bullets.clear()
        self.enemies.clear()

    def _update_hud(self):
        self.score_text.set_text('Score: {}'.format(self.score))
        self.lives_text.set_text('Lives: {}'.format(self.lives))

    def _restart(self):
        self._clear_dynamic()
        self.score = 0
        self.lives = 3
        self.fire_timer = 0.0
        self.spawn_timer = 0.8
        self.state = 'playing'
        self.player.set_world_pos(self.player_start[0], self.player_start[1])
        self.over_text.hide()
        self._update_hud()
```

## 3. How it works

| Piece | Meaning |
| --- | --- |
| `_spawn()` | A countdown instead of a frame counter: after `spawn_timer` seconds a new enemy appears above the window (negative `y`). The delay shrinks as the score grows. |
| `'points': [...]` | The triangle is placed directly through its vertices; `(cx, -4)` is the bottom tip, so the plane dives downwards. |
| `enemy.speed` | A plain attribute on the object — the controller reads it in `_move_enemies`. Nothing else has to know about it. |
| `collides_with_object(other)` | `True` only while **both** objects have collision enabled and their shapes overlap — that is why every created object passes `collision_enabled` and `collision_type` in its properties. |
| Two hit tests | Bullet × enemy scores and removes both; enemy × player costs a life. An enemy leaving the window at the bottom costs a life too. |
| `state == 'over'` | Freezes the game: `on_update` returns early and only listens for **Space**. |
| `_restart()` | Clears every bullet and enemy it created, resets score, lives and timers and puts the player back at its start position. |
| `set_text(...)` on labels | The HUD is just two text objects the controller keeps up to date. |

:::note
`collides_with_object()` returns `False` when either side has collision disabled. If hits never register, open the **Player** in the Inspector and check **Enable Collision**, and compare the names in the script with the Hierarchy.
:::

## 4. Run it

Save and press **Ctrl + R**. Dodge what you cannot shoot, hold **Space** to fire, and press **Space** on the game-over screen for a new round. A full run needs all three lives.

Next: [make it better](/game_examples/air_battle/ideas/) — waves, zigzag enemies and explosions.
