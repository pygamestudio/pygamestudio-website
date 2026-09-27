---
title: 脚本（一）：生成棋盘
description: 2048 脚本的上半部分——用循环创建 16 个格块、生成第一批数字，并把棋盘数据画到对象上。
---

与[飞机大战](/zh-cn/game_examples/air_battle/)一样，全部游戏逻辑放在画布上的**一个总控脚本**里。第一部分负责生成棋盘和界面；[第二部分](/zh-cn/game_examples/2048/logic/)会把方向键与合并算法加进同一个文件。

## 1. 创建并挂上脚本

在**资源面板**中选择 **Add → Script**，创建 `script/game.py`（参考[添加脚本](/zh-cn/tutorial/add_script/)）。选中 **Canvas**，把它的 **Script Path** 设置为 `game.py`——画布和普通对象一样出现在层级面板中。

脚本只按名字访问一个编辑器对象：`Canvas/Score`。

## 2. 脚本（第一部分）

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

## 3. 逐段理解

| 代码 | 含义 |
| --- | --- |
| `self.grid` | **唯一数据源**：16 个数字，下标为 `row * 4 + col`。对象只是这份数据的“视图”——每一步都先改列表，再调用 `_render()` 画出来。 |
| `divmod(index, 4)` | 把 `0..15` 变成 `(row, col)`，再由 `_cell_pos()` 换算成该格的像素位置。 |
| `for` 循环 | 一次创建 32 个对象：每格一个 `Tile` 矩形，紧接着一个 `Num` 文本。文本创建得更晚，所以画在矩形之上。 |
| `_build_overlay()` | 在循环之后调用。场景中**越晚创建**的对象画得**越靠上**，因此遮罩盖在所有格块之上（见[场景](/zh-cn/editor_introduction/scene/)）。它初始是隐藏的。 |
| `visible: False` | 与属性面板中的**可见**一栏同名：对象存在、照常更新，只是不绘制。 |
| `_spawn()` | 用 `random.choice` 挑一个空格，写入 2——有 10% 的概率写入 4。 |
| `_render()` | 把棋盘数据抄到对象上：底色查 `COLORS`，数字写进文本，数字越长字体越小，浅色格用深色字、深色格用浅色字（[矩形 API](/zh-cn/api/objects/rect/)、[文本 API](/zh-cn/api/objects/text/)）。 |
| `COLORS.get(value, BIG_COLOR)` | 超出表格的数值（4096、8192……）会落到深色格，而不会抛出 `KeyError`。 |

:::note
不需要手动刷新任何东西：引擎每帧都会按 `color` 重建矩形；文本的 `text`、`color` 或 `font_size` 一变，就会重新渲染。
:::

## 4. 运行

保存（**Ctrl + S**）后按 **Ctrl + R**：整块空棋盘会出现，两个数字落在随机的格子里。方向键暂时还没有作用——[第二部分](/zh-cn/game_examples/2048/logic/)会加入滑动、合并与计分。
