---
title: "2048"
description: The sliding tile puzzle - a 4x4 board, arrow keys, merging numbers, a score and a game-over overlay. The board is drawn by a controller script from a list of 16 numbers.
---

The classic sliding puzzle in a compact edition: sixteen cells, arrow keys to slide every tile in one direction, equal numbers merge into one larger number, and every merge adds points. Reach 2048 - or at least keep the run going until no move is left.

This is the game you will build:

| | |
| --- | --- |
| **Goal** | Merge equal numbers; every merge scores, the run ends when the board is full and no neighbours match any more |
| **Controls** | **←** / **→** / **↑** / **↓** to slide the whole board, **Space** restarts after a game over |
| **Objects in the editor** | `Board` (Rect) plus `Title`, `Score` and `Hint` (Text) |
| **Created by the script** | the 16 tiles (`Tile0`–`Tile15` with `Num0`–`Num15` on top) and the game-over overlay |
| **Script** | one controller script on the Canvas: `script/game.py` |

## What you learn

- Keeping the game state in plain Python (`self.grid`, 16 numbers) and drawing the objects from it
- Creating a whole board of rects and texts with a `for` loop
- Reacting to a key **once per press** instead of once per frame
- A line-based algorithm: slide, merge and score
- Turning data into looks: color and font size chosen per tile value

## Pages

| Page | What it covers |
| --- | --- |
| [1. Build the scene](/game_examples/2048/scene/) | Board background, title, score and the hint line |
| [2. Part 1 — build the board](/game_examples/2048/script/) | Creating the tiles, spawning numbers, drawing the grid |
| [3. Part 2 — slide and merge](/game_examples/2048/logic/) | Arrow keys, the merge rule, score, game over and restart |
| [4. Make it better](/game_examples/2048/ideas/) | Animation, undo, mouse swipes and more |

:::tip
The 16 tiles are **created in code**: one `for` loop with `divmod` places every cell. Editing a list of numbers is also much easier than placing 32 objects by hand.
:::
