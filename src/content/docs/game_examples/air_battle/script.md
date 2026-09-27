---
title: Part 1 — Fly and Shoot
description: The first half of the Air Battle script - moving the plane, holding Space to fire, flying bullets and cleaning them up.
---

The whole game logic lives in **one controller script** on the Canvas. It reads the keyboard and moves and removes every bullet and enemy itself — no per-object scripts are needed.

Part 1 builds a plane that flies and shoots. [Part 2](/game_examples/air_battle/enemies/) adds the enemies, the score and the lives to the same file.

## 1. Create and attach the script

In the **Asset** panel choose **Add → Script** and create `script/game.py` ([Add a Script](/tutorial/add_script/)). Select the **Canvas** and set its **Script Path** to `game.py` — the Canvas is in the Hierarchy like any other object.

Two names are addressed by the script and have to match the Hierarchy: `Canvas/Player` and `Canvas/Score`.

## 2. The script (part 1)

```python
import pygamestudio as studio


class ObjectScript:
    def __init__(self, obj):
        self.obj = obj                  # the Canvas - this script controls the game
        self.player = None
        self.score_text = None
        self.bullets = []               # the controller moves these objects
        self.fire_timer = 0.0

    def on_start(self):
        self.player = studio.get_object_by_path('Canvas/Player')
        self.score_text = studio.get_object_by_path('Canvas/Score')

    def on_update(self, dt):
        self._move_player(dt)
        self._fire(dt)
        self._move_bullets(dt)

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
        x = max(0, min(x, width - rect.width))     # stay inside the window
        self.player.set_world_pos(x, rect.top)

    def _fire(self, dt):
        self.fire_timer -= dt
        if self.fire_timer > 0 or not studio.is_key_pressed(studio.K_SPACE):
            return
        self.fire_timer = 0.18                     # shortest gap between two shots

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
            if bullet.get_world_rect().bottom < 0:      # left the window
                self._despawn(self.bullets, bullet)

    def _despawn(self, items, item):
        items.remove(item)
        studio.destroy_object(item)
```

## 3. How it works

| Piece | Meaning |
| --- | --- |
| Script on the **Canvas** | The canvas never moves, but its script runs every frame — a convenient place for game-wide logic. `self.obj` is the canvas itself. |
| `self.bullets` | The list is the game's own bookkeeping: the engine draws objects, the **controller** moves and removes them. |
| `create_object(...)` | Creates the bullet right away; it is drawn from the next frame. `properties` uses the same names as the editor rows. |
| `collision_enabled / collision_type` | Every bullet is born with its collision shape — the `bbox` type picks the size up from the object. |
| `fire_timer` | Holding **Space** fires, not once per frame: `0.18` seconds between shots (about 5.5 per second). |
| `set_world_pos(x, rect.top)` | Moving a **polygon** goes through the world position — its vertices are shifted along ([Polygon API](/api/objects/polygon/)). |
| `_despawn()` | One helper used by bullets, enemies and the restart: take it out of the list and remove it from the scene. |
| `list(self.bullets)` | Iterating over a copy makes removing items inside the loop safe. |

:::tip
`destroy_object()` removes the object at the **end of the frame** — calling it inside `on_update` is always safe, even for several objects at once.
:::

## 4. Run it

Save (**Ctrl + S**) and press **Ctrl + R**. You can fly with **←** / **→** and spray bullets with **Space**. There is nothing to hit yet — [Part 2](/game_examples/air_battle/enemies/) adds the enemies and turns it into a game.
