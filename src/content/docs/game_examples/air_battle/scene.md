---
title: Build the Scene
description: The Air Battle scene - a triangle plane, a score, three lives and a hidden game-over label.
---

Only four objects are placed by hand. The bullets and the enemy planes appear later, created by the script.

## 1. Start a project

Create a project and open its scene ([Create a Project](/tutorial/create_a_project/)). Give the **Canvas** a night-sky **Color** of `(10, 14, 26, 255)` in the [Inspector](/editor_introduction/inspector/). The window is `800 x 600`.

## 2. The player plane

Add a **Polygon** ([Create an Object](/tutorial/create_an_object/)) and replace its point list (the **Points** row) with exactly three vertices — a triangle with the tip up:

| Points | |
| --- | --- |
| P1 | `370`, `560` |
| P2 | `430`, `560` |
| P3 | `400`, `520` |

Then set:

| Row | Value |
| --- | --- |
| **Name** | `Player` |
| **Color** | `(90, 200, 255, 255)` — sky blue |
| **Enable Collision** | on |
| **Collision Shape** | **BBox** |

A polygon stores its vertices in scene coordinates and derives its position from them ([Polygon API](/api/objects/polygon/)). The `BBox` collision shape is the triangle's bounding box — exactly what the hit tests need.

## 3. The HUD

Three **Text** objects:

| Object | Pos | Size | Text | Color | Visibility |
| --- | --- | --- | --- | --- | --- |
| `Score` | `20`, `20` | `200`, `40` | `Score: 0` | white | on |
| `Lives` | `580`, `20` | `200`, `40` | `Lives: 3` | white | on |
| `GameOver` | `200`, `250` | `400`, `60` | `Press Space` | `(255, 220, 80, 255)` | **off** |

Uncheck **Visibility** for `GameOver`: the script shows it only when the last life is gone.

## 4. Check and save

- The [Hierarchy](/editor_introduction/hierarchy/) lists `Player`, `Score`, `Lives` and `GameOver` under `Canvas`.
- The player is the only object with collision enabled — bullets and enemies get theirs when the script creates them.
- Press **Ctrl + S** to save.

Next: [Part 1 — fly and shoot](/game_examples/air_battle/script/).
