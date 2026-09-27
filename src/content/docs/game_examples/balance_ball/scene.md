---
title: Build the Scene
description: Create the Balance Ball project and place the platform, the ball and the two labels.
---

Four objects are enough for the whole game: a platform, a ball and two labels. No images, no sounds, nothing to download.

## 1. Start a project

Create a project and open its scene, exactly as described in [Create a Project](/tutorial/create_a_project/). The **Canvas** already exists — give it a dark blue **Color** in the [Inspector](/editor_introduction/inspector/), e.g. `(14, 18, 30, 255)`.

The window is `800 x 600` pixels by default; all positions below use that size.

## 2. The platform

Add a **Rect** ([Create an Object](/tutorial/create_an_object/)) and set these rows:

| Row | Value |
| --- | --- |
| **Name** | `Platform` |
| **Pos** | `300`, `420` |
| **Size** | `200`, `16` |
| **Color** | `(120, 130, 150, 255)` — grey blue |
| **Corner radius** | `8` (optional, all four corners) |

The script later leans this rectangle with `set_angle()` and shrinks it with `set_width()`, so make sure the name is exactly `Platform`.

## 3. The ball

Add an **Ellipse**:

| Row | Value |
| --- | --- |
| **Name** | `Ball` |
| **Pos** | `380`, `380` |
| **Size** | `40`, `40` |
| **Color** | `(255, 150, 60, 255)` — orange |

## 4. The labels

Two **Text** objects show the time and the final message:

| Object | Type | Pos | Size | Text | Color | Visibility |
| --- | --- | --- | --- | --- | --- | --- |
| `Score` | Text | `200`, `20` | `400`, `40` | `Time: 0.0s` | white | on |
| `GameOver` | Text | `200`, `250` | `400`, `60` | `Press Space` | `(255, 220, 80, 255)` | **off** |

A Text object draws its text centred inside its own rectangle — both labels are therefore centred on the canvas. Uncheck **Visibility** for `GameOver`; the script shows it when the ball falls.

## 5. Check and save

- The [Hierarchy](/editor_introduction/hierarchy/) should list `Platform`, `Ball`, `Score` and `GameOver` under `Canvas`.
- **Collision stays off** on every object: the game only compares positions, it does not need collision shapes.
- Press **Ctrl + S** to save the scene.

Next: [the ball script](/game_examples/balance_ball/script/) turns this static scene into the game.
