---
title: Make It Better
description: Tuning, a slide animation, undo, a win overlay, mouse swipes, sound and other next steps for 2048.
---

The game is complete after [Part 2](/game_examples/2048/logic/) — everything here is optional polish or a new rule, and the script is small enough to try each idea on its own.

## Tuning

| What | Where | Try |
| --- | --- | --- |
| Fewer or more **4** tiles | `_spawn()` | the `0.1` means one tile in ten; `0.05` makes the start easier, `0.25` harder |
| Starting tiles | `on_start()` | call `_spawn()` one more time |
| Palette | `COLORS`, `BIG_COLOR` | one entry per value; the `0` entry is the empty slot |
| Number sizes | `_render()` | the three font sizes `42 / 34 / 28` |
| Board geometry | the constants at the top | `CELL`, `GAP`, `X0`, `Y0` |

The geometry just has to keep `4 x CELL + 5 x GAP` inside the window; positions of the numbers and the overlay are computed from `X0` and `Y0`, so a different cell size is a one-line change.

A **5x5 board** is a bigger edit: `[0] * 25`, `divmod(index, 5)`, five entries in every `lines` list, `range(5)` in `_can_move()` and a larger `Board` in the scene. A good exercise once the 4x4 version runs.

## A slide animation

Right now `_render()` repaints every tile where it landed — nothing glides. To animate a move, remember for every changed cell its `(rect, text, target_x, target_y, progress)` in `self.animations` whenever `_move()` returns `True`. In `on_update`, push `progress` with `dt`, call `set_pos()` with a value between the old and the new cell position, and once `progress >= 1` drop the entry and `_render()`. The state (`self.grid`) is already correct — only the view catches up.

## Undo one move

At the top of `_move()`, store a copy before editing anything:

```python
        self.previous = (list(self.grid), self.score)
```

Then check the **Z** key in `on_update()`, before `_take_key()`:

```python
        if studio.is_key_pressed(studio.K_z) and self.previous:
            self.grid, self.score = self.previous
            self.previous = None
            self._render()
            return
```

(`self.previous` starts as `None` in `__init__`.) One history step is plenty for a puzzle like this — a list of states gives you as many as you like.

## Win at 2048

The golden `2048` tile already has its color. Build a second overlay in `_build_overlay()` exactly like the game-over one, with `YOU WIN` as its text, and show it from `on_update`:

```python
            if 2048 in self.grid and not self.won:
                self.won = True                 # show the overlay, keep playing
```

Keep playing after the win (like the original) or set `self.game_over = True` to end the run.

## Swipe with the mouse

The mouse can work like a finger: remember the position when the button goes down, compare it with the position when it comes up, and call `_move()` with the matching arrow key.

```python
        # in on_update, after the arrow-key part
        if studio.is_mouse_button_pressed(1):
            self.drag_start = studio.get_mouse_position()
        elif self.drag_start:
            x0, y0 = self.drag_start
            x1, y1 = studio.get_mouse_position()
            self.drag_start = None
            dx, dy = x1 - x0, y1 - y0
            if max(abs(dx), abs(dy)) > 30:              # a real swipe, not a click
                if abs(dx) > abs(dy):
                    key = studio.K_LEFT if dx < 0 else studio.K_RIGHT
                else:
                    key = studio.K_UP if dy < 0 else studio.K_DOWN
                if self._move(key):
                    self._spawn()
                    self._render()
                    if not self._can_move():
                        self._show_game_over()
```

`self.drag_start` starts as `None` in `__init__`. The spawn/render/check part repeats the arrow-key branch of `on_update()` — pulling it into a small `_after_move(key)` helper keeps both paths tidy.

## Sound on a merge

`gained` tells you exactly when a merge happened. Play a short sound when it is not zero:

```python
            if gained:
                studio.play_sound('audio/merge.wav', volume=0.4)
```

Add the file in the **Asset** panel first; `play_sound()` also takes `loops` and `fade_ms`, and a different pitch for bigger merges is a nice touch.

## Ideas to pick from

| Idea | Hint |
| --- | --- |
| Merge effect | create a `PARTICLE` burst at the merged tile ([Particle](/api/objects/particle/)) |
| Best score | keep `self.best` in the script and show it in a second label |
| Key repeat | move again every `0.15` seconds while an arrow is held, with a timer fed by `dt` |
| Five by five | see the note above — a bigger board, same algorithm |
| Themes | keep two or three `COLORS` tables and switch between them |
