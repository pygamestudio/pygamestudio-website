---
title: Part 1 — Build the Board
description: The first half of the 2048 script - creating 16 tiles with a loop, spawning the first numbers and drawing the grid data onto the objects.
---

The whole game lives in **one controller script** on the Canvas, the same pattern as [Air Battle](/game_examples/air_battle/). Part 1 builds the board and the view; [Part 2](/game_examples/2048/logic/) adds the keys and the merge logic to the same file.

## 1. Create and attach the script

In the **Asset** panel choose **Add → Script** and create `script/game.py` ([Add a Script](/tutorial/add_script/)). Select the **Canvas** and set its **Script Path** to `game.py` — the Canvas is in the Hierarchy like any other object.

The script addresses one editor object by name: `Canvas/Score`.

## 2. The script (part 1)

```python
import random
import pygamestudio as studio

CELL = 100                                  # one tile is 100 x 100 pixels
GAP = 10                                    # gap between two tiles
X0, Y0 = 175, 90                            # top-left corner of the board

COLORS = {                                  # the classic 2048 palette
    0: (205, 193, 180, 255),                # empty slot
    2: (238, 228, 218, 255),
    4: (237, 224, 200, 255),
    8: (242, 177, 121, 255),
    16: (245, 149, 99, 255),
    32: (246, 124, 95, 255),
    64: (246, 94, 59, 255),
    128: (237, 207, 114, 255),
    256: (237, 204, 97, 255),
    512: (237, 200, 80, 255),
    1024: (237, 197, 63, 255),
    2048: (237, 194, 46, 255),
}
BIG_COLOR = (60, 58, 50, 255)               # any value past the table
TEXT_DARK = (119, 110, 101, 255)            # numbers on light tiles
TEXT_LIGHT = (249, 246, 242, 255)           # numbers on dark tiles


class ObjectScript:
    def __init__(self, obj):
        self.obj = obj                      # the Canvas - this script controls the game
        self.grid = [0] * 16                # the game state: 16 numbers, 0 = empty
        self.tiles = []                     # (rect, text) for every cell
        self.score = 0
        self.score_text = None
        self.over_objects = []              # the game-over overlay
        self.game_over = False
        self.last_key = None

    def on_start(self):
        self.score_text = studio.get_object_by_path('Canvas/Score')
        self._build_board()
        self._spawn()
        self._spawn()
        self._render()

    # ---------- the board

    def _cell_pos(self, index):
        row, col = divmod(index, 4)         # 0..15 -> (row, col)
        return X0 + GAP + col * (CELL + GAP), Y0 + GAP + row * (CELL + GAP)

    def _build_board(self):
        for index in range(16):
            x, y = self._cell_pos(index)
            rect = studio.create_object('RECT', 'Canvas', f'Tile{index}', {
                'x': x, 'y': y, 'width': CELL, 'height': CELL,
                'color': COLORS[0],
            })
            rect.set_border_radius(8)
            text = studio.create_object('TEXT', 'Canvas', f'Num{index}', {
                'x': x, 'y': y, 'width': CELL, 'height': CELL,
                'text': '', 'font_size': 42, 'color': TEXT_DARK,
            })
            self.tiles.append((rect, text))
        self._build_overlay()

    def _build_overlay(self):
        # Created after the tiles, so it is drawn on top of all of them.
        background = studio.create_object('RECT', 'Canvas', 'OverBg', {
            'x': X0, 'y': Y0 + 130, 'width': 450, 'height': 190,
            'color': (60, 58, 50, 230),
            'visible': False,
        })
        background.set_border_radius(12)
        title = studio.create_object('TEXT', 'Canvas', 'OverTitle', {
            'x': X0, 'y': Y0 + 160, 'width': 450, 'height': 70,
            'text': 'GAME OVER', 'font_size': 44,
            'color': TEXT_LIGHT, 'visible': False,
        })
        hint = studio.create_object('TEXT', 'Canvas', 'OverHint', {
            'x': X0, 'y': Y0 + 240, 'width': 450, 'height': 40,
            'text': 'Press Space to restart', 'font_size': 22,
            'color': TEXT_LIGHT, 'visible': False,
        })
        self.over_objects = [background, title, hint]

    # ---------- numbers

    def _spawn(self):
        empty = [index for index, value in enumerate(self.grid) if value == 0]
        if empty:
            index = random.choice(empty)
            self.grid[index] = 4 if random.random() < 0.1 else 2   # 10% fours

    def _render(self):
        for index, value in enumerate(self.grid):
            rect, text = self.tiles[index]
            rect.set_color(COLORS.get(value, BIG_COLOR))
            text.set_text(str(value) if value else '')
            if value:
                text.set_font_size(42 if value < 100 else 34 if value < 1000 else 28)
                text.set_color(TEXT_DARK if value <= 4 else TEXT_LIGHT)
        self.score_text.set_text(f'Score: {self.score}')
```

## 3. How it works

| Piece | Meaning |
| --- | --- |
| `self.grid` | The **single source of truth**: 16 numbers, index `row * 4 + col`. The objects are only a view of this list — every move edits the list first, then calls `_render()`. |
| `divmod(index, 4)` | Turns `0..15` into `(row, col)`, which `_cell_pos()` converts into the pixel position of that cell. |
| the `for` loop | Creates 32 objects in one pass: a `Tile` rect per cell, and a `Num` text right after it. The text is created later, so it is drawn on top of its rect. |
| `_build_overlay()` | Runs after the loop. In a scene, objects created **later** are drawn **higher**, so the overlay lands on top of every tile (see [Draw order](/editor_introduction/scene/)). It starts hidden. |
| `visible: False` | The same name as the inspector's **Visibility** row: the object exists and is updated, it is just not drawn. |
| `_spawn()` | Picks one empty cell (`random.choice`) and writes a 2 — or, with a 10% chance, a 4. |
| `_render()` | Copies the grid onto the objects: tile color from `COLORS`, the number as text, a smaller font for longer numbers, and dark or light text depending on the tile ([Rect API](/api/objects/rect/), [Text API](/api/objects/text/)). |
| `COLORS.get(value, BIG_COLOR)` | Values above the table (4096, 8192 ...) fall back to a dark tile instead of raising a `KeyError`. |

:::note
Nothing has to be refreshed by hand: the engine rebuilds a Rect from its `color` every frame, and re-renders a Text whenever `text`, `color` or `font_size` changed.
:::

## 4. Run it

Save (**Ctrl + S**) and press **Ctrl + R**: the full board of empty slots appears with two numbers in random cells. The arrow keys do nothing yet — [Part 2](/game_examples/2048/logic/) adds sliding, merging and the score.
