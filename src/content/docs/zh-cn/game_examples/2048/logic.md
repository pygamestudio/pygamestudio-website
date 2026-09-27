---
title: 脚本（二）：滑动与合并
description: 2048 脚本的下半部分——让方向键按一次动一步、按行滑动、合并相邻数字、计分、结束判定与重新开始。
---

第二部分补齐[脚本（一）](/zh-cn/game_examples/2048/script/)里的 `script/game.py`。把下面这些方法加进同一个 `ObjectScript` 类。

## 1. 新增的方法

```python
    def on_update(self, dt):
        if self.game_over:
            if studio.is_key_pressed(studio.K_SPACE):
                self._restart()
            return
        key = self._take_key()
        if key is not None and self._move(key):
            self._spawn()                       # a new tile after every real move
            self._render()
            if not self._can_move():
                self._show_game_over()

    # ---------- keyboard

    def _take_key(self):
        pressed = None
        for key in (studio.K_LEFT, studio.K_RIGHT, studio.K_UP, studio.K_DOWN):
            if studio.is_key_pressed(key):
                pressed = key
                break
        if pressed == self.last_key:             # still the same hold
            return None
        self.last_key = pressed                  # None once everything is released
        return pressed

    # ---------- sliding and merging

    def _move(self, key):
        if key == studio.K_LEFT:
            lines = [[r * 4 + c for c in range(4)] for r in range(4)]
        elif key == studio.K_RIGHT:
            lines = [[r * 4 + (3 - c) for c in range(4)] for r in range(4)]
        elif key == studio.K_UP:
            lines = [[c + r * 4 for r in range(4)] for c in range(4)]
        else:
            lines = [[c + (3 - r) * 4 for r in range(4)] for c in range(4)]

        moved = False
        for line in lines:
            values = [self.grid[index] for index in line]
            merged, gained = self._merge_line(values)
            self.score += gained
            if merged != values:
                moved = True
            for index, value in zip(line, merged):
                self.grid[index] = value
        return moved

    @staticmethod
    def _merge_line(values):
        values = [value for value in values if value]     # drop the gaps
        merged = []
        gained = 0
        index = 0
        while index < len(values):
            if index + 1 < len(values) and values[index] == values[index + 1]:
                gained += values[index] * 2               # a merge scores its result
                merged.append(values[index] * 2)
                index += 2                                # both tiles are used up
            else:
                merged.append(values[index])
                index += 1
        merged += [0] * (4 - len(merged))                 # pad with empty slots
        return merged, gained

    # ---------- end of the run

    def _can_move(self):
        if any(value == 0 for value in self.grid):
            return True
        for row in range(4):
            for col in range(4):
                index = row * 4 + col
                if col < 3 and self.grid[index] == self.grid[index + 1]:
                    return True                           # a pair inside the row
                if row < 3 and self.grid[index] == self.grid[index + 4]:
                    return True                           # a pair inside the column
        return False

    def _show_game_over(self):
        self.game_over = True
        for obj in self.over_objects:
            obj.show()

    def _restart(self):
        self.game_over = False
        self.score = 0
        self.grid = [0] * 16
        self.last_key = None
        for obj in self.over_objects:
            obj.hide()
        self._spawn()
        self._spawn()
        self._render()
```

## 2. 逐段理解

| 代码 | 含义 |
| --- | --- |
| `_take_key()` | 按住方向键时 `is_key_pressed()` **每帧**都为真，而 2048 需要“按一次动一步”。这个方法把上一个按键记在 `self.last_key` 里，只有按键变化时才返回新按键；全部松开后它回到 `None`，下一次按下才会重新计数。 |
| 四份 `lines` 列表 | 一次移动就是同样的工作做 4 遍。**向左**时每行从前向后读；**向右**时每行从后向前读；**向上**、**向下**则按列读。每份列表都是 4 个格子下标，按“靠近目标的一侧在前”排列。 |
| `_merge_line()` | 对一行数字处理：去掉空格，从头往后走，相邻且相同的两块合并成一块加倍的；最后补零。`index += 2` 是 2048 的经典细节——刚合并出来的块**当场用完**，所以 `[2, 2, 4]` 得到 `[4, 4]` 而不是 `[8]`。 |
| `gained` | 每次合并给**合并结果**计分：`2 + 2` 得 4 分，`1024 + 1024` 得 2048 分。这里不能用 `sum(merged) - sum(values)`，所以让函数自己回报得分。 |
| `moved` | 如果一次按键什么都没改变（比如所有数字已经在左边时再按 **←**），棋盘保持原样，也**不会**生成新数字——此时 `_move()` 返回 `False`。 |
| 移动后的 `_spawn()` | 只有发生**真实移动**之后才生成一个新的 2（或 4）。 |
| `_can_move()` | 结束条件 = 没有空格，**并且**横向、纵向都没有相同的邻居。两个判断都只看数字，不看对象。 |
| `_show_game_over()` / `_restart()` | 用 `show()` / `hide()` 切换第一部分创建的遮罩；重新开始则重置状态并生成两个新数字。 |

:::tip
合并规则值得亲手验算一次：`[2, 2, 2, 2]` 按 **←** 得到 `[4, 4]`、得 **8** 分；而 `[2, 2, 4]` 得到 `[4, 4]`、只得 **4** 分。原版游戏正是这样。
:::

## 3. 运行——完整游戏

**Ctrl + S** 保存，再按 **Ctrl + R**。方向键可以滑动整个棋盘，相同的数字自动合并，分数不断上涨；当再也无法移动时，遮罩出现，按 **Space** 带着两个新数字开一局。

整个拼图是纯 Python 逻辑——对象从不移动，只有文字和颜色在变。[进阶玩法](/zh-cn/game_examples/2048/ideas/)收集了下一步可以做的改进。
