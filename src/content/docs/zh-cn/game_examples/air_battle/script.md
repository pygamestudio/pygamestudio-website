---
title: 脚本（一）：飞行与射击
description: 飞机大战脚本的前半部分——移动飞机、长按 Space 连续开火、子弹飞行与回收。
---

全部游戏逻辑放在画布上的**一个总控脚本**里：它读取键盘，并亲自移动、销毁每一颗子弹和每一架敌机，不需要给对象单独挂脚本。

第一部分先做出"能飞、能打"的飞机；[第二部分](/zh-cn/game_examples/air_battle/enemies/)在同一个文件里加上敌机、得分与生命。

## 1. 创建并挂载脚本

在**资源面板**中选择 **Add → Script**，创建 `script/game.py`（参考[添加脚本](/zh-cn/tutorial/add_script/)）。选中 **Canvas**，把它的 **Script Path** 设置为 `game.py`——画布和普通对象一样出现在层级面板中。

脚本会按名字访问两个对象，名称必须与层级面板一致：`Canvas/Player` 与 `Canvas/Score`。

## 2. 脚本内容（第一部分）

```python
import pygamestudio as studio


class ObjectScript:
    def __init__(self, obj):
        self.obj = obj                  # the Canvas - this script controls the game
        self.player = None
        self.score_text = None
        self.bullets = []               # the controller moves these objects
        self.fire_timer = 0.0

    def on_start(self):
        self.player = studio.get_object_by_path('Canvas/Player')
        self.score_text = studio.get_object_by_path('Canvas/Score')

    def on_update(self, dt):
        self._move_player(dt)
        self._fire(dt)
        self._move_bullets(dt)

    # ---------- the player

    def _move_player(self, dt):
        speed = 420
        rect = self.player.get_world_rect()
        x = rect.left
        if studio.is_key_pressed(studio.K_LEFT):
            x -= speed * dt
        if studio.is_key_pressed(studio.K_RIGHT):
            x += speed * dt
        width, _ = studio.get_window_size()
        x = max(0, min(x, width - rect.width))     # stay inside the window
        self.player.set_world_pos(x, rect.top)

    def _fire(self, dt):
        self.fire_timer -= dt
        if self.fire_timer > 0 or not studio.is_key_pressed(studio.K_SPACE):
            return
        self.fire_timer = 0.18                     # shortest gap between two shots

        rect = self.player.get_world_rect()
        bullet = studio.create_object('RECT', 'Canvas', 'Bullet', {
            'x': rect.centerx - 3, 'y': rect.top - 18,
            'width': 6, 'height': 16,
            'color': (255, 220, 80, 255),
            'collision_enabled': True, 'collision_type': 'bbox',
        })
        self.bullets.append(bullet)

    # ---------- bullets

    def _move_bullets(self, dt):
        for bullet in list(self.bullets):
            bullet.set_y(bullet.get_y() - 620 * dt)
            if bullet.get_world_rect().bottom < 0:      # left the window
                self._despawn(self.bullets, bullet)

    def _despawn(self, items, item):
        items.remove(item)
        studio.destroy_object(item)
```

## 3. 逐段理解

| 代码 | 含义 |
| --- | --- |
| 脚本挂在 **Canvas** 上 | 画布本身从不移动，但它的脚本每帧都会执行——适合放置全局逻辑。`self.obj` 就是画布。 |
| `self.bullets` | 这份列表是游戏自己的"账本"：引擎负责绘制对象，**总控脚本**负责移动与销毁。 |
| `create_object(...)` | 立刻创建子弹，从下一帧开始绘制；`properties` 的字段与编辑器里的属性行同名。 |
| `collision_enabled / collision_type` | 子弹一出生就带碰撞形状；`bbox` 类型会自动采用对象自身的大小。 |
| `fire_timer` | 长按 **Space** 并不是每帧发射一次，而是每 `0.18` 秒一发（约每秒 5.5 发）。 |
| `set_world_pos(x, rect.top)` | **多边形**的移动通过世界坐标进行——它的顶点会一起平移（[多边形 API](/zh-cn/api/objects/polygon/)）。 |
| `_despawn()` | 一个通用小助手：先从列表移除，再从场景销毁。子弹、敌机与重开都会用到。 |
| `list(self.bullets)` | 遍历副本，循环里删除元素才是安全的。 |

:::tip
`destroy_object()` 会在**本帧结束时**真正移除对象——因此在 `on_update` 里随时调用都是安全的，同时销毁多个对象也没问题。
:::

## 4. 运行

保存（**Ctrl + S**）后按 **Ctrl + R**：可以用 **←** / **→** 飞行，长按 **Space** 连续射击。现在还没有可以打的目标——[第二部分](/zh-cn/game_examples/air_battle/enemies/)会加入敌机，把它变成一个真正的游戏。
