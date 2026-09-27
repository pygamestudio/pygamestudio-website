---
title: Part 2 — Slide and Merge
description: The second half of the 2048 script - reading the arrow keys once per press, sliding every line, merging equal neighbours, scoring, game over and restart.
---

Part 2 completes `script/game.py` from [Part 1](/game_examples/2048/script/). Add these methods to the same `ObjectScript` class.

## 1. The new methods

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

## 2. How it works

| Piece | Meaning |
| --- | --- |
| `_take_key()` | `is_key_pressed()` is true on **every frame** while a key is held; 2048 needs one move per press. The method remembers the last key in `self.last_key` and returns a key only when it changed. Letting go of everything sets it back to `None`, so the next press counts again. |
| the four `lines` lists | One move is the same job done on 4 independent lines. For **left** each row is read front to back; for **right** the row is read backwards; **up** and **down** read the columns. Every line is a list of 4 cell indices, in "front first" order. |
| `_merge_line()` | Works on one line of numbers: drop the gaps, walk from the front, merge two equal neighbours into one doubled tile, then pad with zeros. `index += 2` is the classic 2048 detail — a tile created by a merge is **used up**, so `[2, 2, 4]` becomes `[4, 4]` and not `[8]`. |
| `gained` | Every merge scores the **result**: `2 + 2` gives 4 points, `1024 + 1024` gives 2048. `sum(merged) - sum(values)` would be wrong here, so the function reports the gain itself. |
| `moved` | When a key changes nothing (for example **←** with everything already on the left), the grid stays untouched and **no** new tile is spawned — `_move()` returns `False`. |
| `_spawn()` after a move | Only after a *real* move: slide, then one new 2 (or 4). |
| `_can_move()` | Game over = no empty cell **and** no equal neighbours, horizontally and vertically. Both checks run on the numbers, not on the objects. |
| `_show_game_over()` / `_restart()` | `show()` / `hide()` flip the overlay created in Part 1; the restart resets the state and spawns two fresh tiles. |

:::tip
Worth checking the merge rule by hand once: `[2, 2, 2, 2]` with **←** becomes `[4, 4]` and scores **8**, while `[2, 2, 4]` becomes `[4, 4]` and scores only **4**. That is exactly how the original behaves.
:::

## 3. Run it — the complete game

**Ctrl + S**, then **Ctrl + R**. Arrow keys slide the whole board, equal numbers merge, the score climbs, and when nothing can move any more the overlay appears; **Space** starts a new run with two tiles.

The puzzle is pure Python — the objects never move, only their text and color change. [Make it better](/game_examples/2048/ideas/) collects the next steps.
