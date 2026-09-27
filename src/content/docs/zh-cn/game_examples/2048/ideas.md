---
title: 进阶玩法
description: 2048 的调参、滑动动画、撤销、胜利遮罩、鼠标滑动、音效与更多可以尝试的改进。
---

完成[脚本（二）](/zh-cn/game_examples/2048/logic/)后游戏已经完整——下面的内容都是可选的润色或新规则，脚本本身很短，任何一条都可以单独尝试。

## 调参

| 项目 | 位置 | 试试看 |
| --- | --- | --- |
| **4** 的多少 | `_spawn()` | `0.1` 表示十个里出一个 4；`0.05` 开局更轻松，`0.25` 更难 |
| 开局数字个数 | `on_start()` | 再多调用一次 `_spawn()` |
| 配色 | `COLORS`、`BIG_COLOR` | 每个数值一条；`0` 是空格的颜色 |
| 数字大小 | `_render()` | 三档字号 `42 / 34 / 28` |
| 棋盘几何 | 文件开头的常量 | `CELL`、`GAP`、`X0`、`Y0` |

几何上只要保证 `4 x CELL + 5 x GAP` 不超出窗口即可；数字和遮罩的位置都由 `X0`、`Y0` 推算，换格子大小是改一行的事。

**改为 5x5 棋盘**要动的地方多一些：`[0] * 25`、`divmod(index, 5)`、四份 `lines` 列表各 5 个元素、`_can_move()` 里的 `range(5)`，以及场景中更大的 `Board`。等 4x4 版本跑通之后，这是一个不错的练习。

## 滑动动画

目前 `_render()` 直接在落点重画数字，没有任何滑动过程。想让格块“滑”过去：在 `_move()` 返回 `True` 时，把每个位置发生变化的格块记进 `self.animations`，保存 `(rect, text, 目标 x, 目标 y, 进度)`；在 `on_update` 里用 `dt` 推进进度，用 `set_pos()` 把对象放在旧位置与新位置之间；进度到 `1` 后删掉这一条并调用 `_render()`。棋盘数据（`self.grid`）在移动时就已经正确，等着的只有视图。

## 撤销一步

在 `_move()` 的最前面，先留一份复制：

```python
        self.previous = (list(self.grid), self.score)
```

然后在 `on_update()` 里、`_take_key()` 之前检查 **Z** 键：

```python
        if studio.is_key_pressed(studio.K_z) and self.previous:
            self.grid, self.score = self.previous
            self.previous = None
            self._render()
            return
```

（`self.previous` 在 `__init__` 里初始化为 `None`。）对这种拼图来说，撤销一步已经够用；把状态存成列表就能撤更多步。

## 到达 2048

金色的 `2048` 格块已经有专属颜色。像结束遮罩那样在 `_build_overlay()` 里再做一份、文字换成 `YOU WIN`，然后在 `on_update` 中显示它：

```python
            if 2048 in self.grid and not self.won:
                self.won = True                 # show the overlay, keep playing
```

胜利后可以继续玩（与原版一致），也可以把 `self.game_over = True` 来结束这一局。

## 鼠标滑动

鼠标也能像手指一样用：按下时记住位置，松开时和按下位置比较，然后调用 `_move()` 并传入对应的方向键。

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

`self.drag_start` 在 `__init__` 里初始化为 `None`。生成新数字、重绘、判负这三步和 `on_update()` 中方向键的分支重复——把它们抽成一个小方法 `_after_move(key)`，两条路径都会干净很多。

## 合并音效

`gained` 正好告诉你“发生了合并”。在它不为零时播放一个短音效：

```python
            if gained:
                studio.play_sound('audio/merge.wav', volume=0.4)
```

先在**资源面板**中加入音频文件；`play_sound()` 还可以传 `loops` 与 `fade_ms`，为更大的合并换一个音高也是不错的细节。

## 更多想法

| 想法 | 提示 |
| --- | --- |
| 合并特效 | 在合并格块的 `get_center()` 处生成一次 `PARTICLE` 粒子（[粒子](/zh-cn/api/objects/particle/)） |
| 最高分 | 在脚本里保存 `self.best`，用第二个标签显示 |
| 按键连发 | 按住方向键时每 `0.15` 秒移动一次，用 `dt` 驱动一个计时器 |
| 五乘五 | 见上文——更大的棋盘，同一套算法 |
| 主题皮肤 | 准备两三份 `COLORS` 表来回切换 |
