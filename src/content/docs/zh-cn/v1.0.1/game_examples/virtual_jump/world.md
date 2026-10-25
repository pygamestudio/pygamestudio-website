---
title: 滚动背景与动态对象
description: 两块背景的无缝循环滚动，以及“隐藏模板 + 运行时复制”生成子弹和水果的模式。
---

这一页讲 `game_manager.py` 的前半部分（挂在画布上的总管脚本），以及子弹、水果两个模板脚本。

![子弹与水果](/images/doc/virtual_jump_world.png)

## 无缝滚动的背景

原理很简单：**两块一样大的面板一上一下摆好，整体向上移动**；上面那块完全滑出屏幕时，就把它挪到另一块下面——如此循环，看起来就是永远滚不完的背景。

```python
    SPEED = 90.0                                # 滚动速度（像素/秒）

    def _start_background(self):
        self.panels = [BackgroundA, BackgroundB]        # 从场景里找到两块面板
        screen_h = studio.get_screen().get_height()
        panel_h = self.panels[0].get_height()
        self.period = panel_h * math.ceil(screen_h / panel_h)   # 回绕周期 ≥ 屏高
        for index, panel in enumerate(self.panels):
            panel.y = self.period * index               # 第一块 y=0，第二块接在下面

    def _update_background(self, dt: float):
        step = self.SPEED * dt
        for panel in self.panels:
            panel.y -= step
            if panel.y <= -self.period:                 # 整块滑出屏幕顶部
                panel.y += self.period * len(self.panels)   # 挪到下面，无缝衔接
```

要点：

- 回绕周期取「**面板高的整数倍、且不小于屏高**」——面板或贴图改成多高都不会出现接缝。
- 想换速度只改 `SPEED`；`BackgroundC` 是静止的背景层，摆好后不用管。
- 面板里的内容跟着面板走，所以整屏图（或铺满的贴图）都适用。

## 子弹：隐藏模板 + 运行时复制

场景里的 `Bullet` 只当**模板**：开场隐藏，需要时复制一颗出来。屏幕上同时飞几十颗也毫不费力。

```python
    def _spawn_bullet(self):
        # 1. 在屏幕外的 上 / 左 / 右 随机一条边出生
        edge = random.choice(("top", "left", "right"))
        # ……按边取出生坐标（屏幕外 40~120 像素）
        # 2. 方向 = 出生点 -> 玩家中心，再加一点抖动（不每次都打同一个点）
        target_x, target_y = self._player_center()
        angle = math.atan2(target_y - (y + bullet_h * 0.5),
                           target_x - (x + bullet_w * 0.5))
        angle += random.uniform(-self.AIM_JITTER, self.AIM_JITTER)
        # 3. 复制模板，并让副本的脚本“发射”
        bullet = self._spawn_copy(template, "bullet_%d" % self.bullet_index,
                                  {"x": x, "y": y})
        bullet.script_instance.launch((math.cos(angle), math.sin(angle)),
                                      random.uniform(*self.BULLET_SPEED))
```

子弹自己的 `bullet.py` 只管三件事：

1. 按 `launch()` 定下的方向与速度**直线飞行**（顺带把贴图转向飞行方向）；
2. 飞出屏幕 220 像素就**自我销毁**；
3. 撞到玩家时把 `hit_player` 标记为 True——加分/判负交给总管脚本（见下一章）。

节奏与保险丝都在常量里：每 **0.8 秒 ± 0.3** 一颗、最多 **25 颗**、速度 **150~300 像素/秒**。

## 水果：同样的模板模式

水果更简单，从屏幕正上方随机 x 落下：

```python
        left = self.APPLE_EDGE
        right = max(left, width - self.APPLE_EDGE - apple_w)
        x = random.uniform(left, right)                          # 水平随机
        y = -apple_h - random.uniform(*self.APPLE_SPAWN_MARGIN)  # 屏幕上方出生
        apple = self._spawn_copy(template, "apple_%d" % self.apple_index,
                                 {"x": x, "y": y})
        apple.script_instance.set_fall_speed(random.uniform(*self.APPLE_SPEED))
```

`apple.py` 负责下落、掉出屏幕销毁、被吃到时把 `collected` 标记为 True。生成间隔故意留得很松（**2.5~4.5 秒**一个），吃到才有成就感。

## 这套写法的两个约定

- **模板只当预制体**：`Bullet` / `apple` 在开场 `hide()`；副本按前缀命名（`bullet_1`、`apple_1`…），重开时按前缀一次性清空。
- **不在碰撞回调里做重活**：子弹与水果只往自己身上记标记（`hit_player` / `collected`），由总管脚本在下一帧统一处理——在引擎的碰撞回调里销毁对象是不安全的。
