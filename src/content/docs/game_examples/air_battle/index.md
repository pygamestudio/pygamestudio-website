---
title: Air Battle
description: A tiny shoot 'em up - fly, fire, dodge the diving planes and keep three lives alive. Built with objects created at runtime.
---

An air battle in the classic style: your plane sits at the bottom, enemy planes dive from the top, and every hit scores a point. Three lives, faster waves over time, and one **Space** press for a new round.

This is the game you will build:

| | |
| --- | --- |
| **Goal** | Shoot as many enemies as possible before three hits (or three escapes) cost all lives |
| **Controls** | **←** / **→** to fly, **Space** to fire, **Space** also restarts after a game over |
| **Objects in the editor** | `Player` (Polygon), `Score`, `Lives` and `GameOver` (Text) |
| **Created by the script** | `Bullet` (Rect) and `Enemy` (Polygon) — created and removed while the game runs |
| **Script** | one controller script on the Canvas: `script/game.py` |

## What you learn

- Creating and destroying objects with `studio.create_object()` / `studio.destroy_object()`
- Hit tests with `collides_with_object()` and per-frame collision checks
- A controller script that owns the state of the whole game
- Timers written with `dt`: fire rate, spawn rate and shrinking delays

## Pages

| Page | What it covers |
| --- | --- |
| [1. Build the scene](/game_examples/air_battle/scene/) | Player plane, HUD and the hidden game-over label |
| [2. Part 1 — fly and shoot](/game_examples/air_battle/script/) | Movement, firing, bullets, cleanup |
| [3. Part 2 — enemies and lives](/game_examples/air_battle/enemies/) | Spawning, hits, score, lives and restart |
| [4. Make it better](/game_examples/air_battle/ideas/) | Waves, zigzag enemies, particles and more |

:::tip
This example creates its enemies and bullets **at runtime**. The scene itself stays tiny — only the plane and the three labels are placed in the editor.
:::
