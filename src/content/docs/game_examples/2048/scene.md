---
title: Build the Scene
description: Create the 2048 project and place the board background, the title, the score and the hint line.
---

The editor only holds the static parts of the game: the board background and three labels. The 32 tile objects (a background and a number for each cell) are created by the script, cell by cell.

## 1. Start a project

Create a project and open its scene, exactly as described in [Create a Project](/tutorial/create_a_project/). Give the **Canvas** a light **Color** in the [Inspector](/editor_introduction/inspector/) — `(250, 248, 245, 255)`, the paper tone of the original game.

The window is `800 x 600` pixels by default; all positions below use that size.

## 2. The board background

Add a **Rect** ([Create an Object](/tutorial/create_an_object/)):

| Row | Value |
| --- | --- |
| **Name** | `Board` |
| **Pos** | `175`, `90` |
| **Size** | `450`, `450` |
| **Color** | `(187, 173, 160, 255)` — warm grey |
| **Border Radius** | `12` |

One cell is `100` pixels wide with a `10` pixel gap, so four cells span `4 x 100 + 5 x 10 = 450` pixels. Cell (row, col) starts at `x = 185 + col x 110`, `y = 100 + row x 110` — the script uses exactly this formula.

## 3. The labels

Add three **Text** objects:

| Object | Pos | Size | Text | Font Size | H Align | Color |
| --- | --- | --- | --- | --- | --- | --- |
| `Title` | `175`, `26` | `200`, `48` | `2048` | `40` | `left` | `(119, 110, 101, 255)` |
| `Score` | `375`, `30` | `250`, `40` | `Score: 0` | `26` | `right` | `(119, 110, 101, 255)` |
| `Hint` | `175`, `556` | `450`, `32` | `Arrow keys to move, Space to restart` | `18` | `center` | `(150, 140, 130, 255)` |

The two top labels share a row with the board: `Title` on the left, `Score` on the right. The hint sits below the board (the board ends at `y = 540`).

## 4. Check and save

- The [Hierarchy](/editor_introduction/hierarchy/) shows `Board`, `Title`, `Score` and `Hint` under `Canvas`.
- **No collisions are needed** — 2048 is a game of numbers, nothing ever touches anything.
- Press **Ctrl + S** to save the scene.

Next: [Part 1 — build the board](/game_examples/2048/script/) creates the tiles and brings the first numbers onto the board.
