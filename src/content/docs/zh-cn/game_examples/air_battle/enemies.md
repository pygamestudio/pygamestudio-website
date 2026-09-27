---
title: 脚本（二）：敌机与生命
description: 生成俯冲的敌机、用 collides_with_object() 做碰撞判定、得分、三条命与重开——飞机大战脚本的剩余部分。
---

第二部分把 `script/game.py` 补完整：敌机从窗口上方俯冲而下，子弹命中得分，被撞或敌机溜走都会失去一条命；生命耗尽后按 **Space** 重新开始。

## 1. 新增了什么

| 位置 | 新增内容 |
| --- | --- |
| `import` | `import random`——用于随机生成位置 |
| `__init__` | `self.enemies`、`self.spawn_timer`、`self.score`、`self.lives`、`self.state` |
| `on_start` | 获取 `Lives` 与 `GameOver`，记住玩家起始位置，隐藏结束提示 |
| `on_update` | `state == 'over'` 时提前返回（只监听 **Space**），否则执行 `_spawn`、`_move_enemies`、`_hit_test` |
| 新方法 | `_spawn`、`_move_enemies`、`_hit_test`、`_lose_life`、`_clear_dynamic`、`_update_hud`、`_restart` |

## 2. 完整脚本

用下面的完整版本替换 `script/game.py`：

```python
import random

import pygamestudio as studio


class ObjectScript:
    def __init__(self, obj):
        self.obj = obj                  # the Canvas - this script controls the game
        self.player = None
        self.score_text = None
        self.lives_text = None
        self.over_text = None
        self.player_start = (370, 520)
        self.bullets = []               # the controller moves these objects
        self.enemies = []
        self.fire_timer = 0.0
        self.spawn_timer = 0.8
        self.score = 0
        self.lives = 3
        self.state = 'playing'          # playing | over

    def on_start(self):
        self.player = studio.get_object_by_path('Canvas/Player')
        self.score_text = studio.get_object_by_path('Canvas/Score')
        self.lives_text = studio.get_object_by_path('Canvas/Lives')
        self.over_text = studio.get_object_by_path('Canvas/GameOver')
        self.player_start = self.player.get_world_rect().topleft
        self.over_text.hide()
        self._update_hud()

    def on_update(self, dt):
        if self.state == 'over':
            if studio.is_key_pressed(studio.K_SPACE):
                self._restart()
            return

        self._move_player(dt)
        self._fire(dt)
        self._move_bullets(dt)
        self._spawn(dt)
        self._move_enemies(dt)
        self._hit_test()

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
        x = max(0, min(x, width - rect.width))
        self.player.set_world_pos(x, rect.top)

    def _fire(self, dt):
        self.fire_timer -= dt
        if self.fire_timer > 0 or not studio.is_key_pressed(studio.K_SPACE):
            return
        self.fire_timer = 0.18

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
            if bullet.get_world_rect().bottom < 0:
                self._despawn(self.bullets, bullet)

    # ---------- enemies

    def _spawn(self, dt):
        self.spawn_timer -= dt
        if self.spawn_timer > 0:
            return
        self.spawn_timer = max(0.35, 1.1 - self.score * 0.02)   # quicker over time

        width, _ = studio.get_window_size()
        cx = random.randint(30, width - 30)
        enemy = studio.create_object('POLYGON', 'Canvas', 'Enemy', {
            'points': [(cx - 18, -30), (cx + 18, -30), (cx, -4)],
            'color': (230, 90, 90, 255),
            'collision_enabled': True, 'collision_type': 'bbox',
        })
        enemy.speed = 90 + self.score * 3        # the controller moves it by this
        self.enemies.append(enemy)

    def _move_enemies(self, dt):
        _, height = studio.get_window_size()
        for enemy in list(self.enemies):
            rect = enemy.get_world_rect()
            if rect.top > height:                # slipped past the player
                self._despawn(self.enemies, enemy)
                self._lose_life()
                continue
            if enemy.collides_with_object(self.player):
                self._despawn(self.enemies, enemy)
                self._lose_life()
                continue
            enemy.move(0, enemy.speed * dt)

    # ---------- scoring

    def _hit_test(self):
        for bullet in list(self.bullets):
            for enemy in list(self.enemies):
                if bullet.collides_with_object(enemy):
                    self._despawn(self.bullets, bullet)
                    self._despawn(self.enemies, enemy)
                    self.score += 1
                    self._update_hud()
                    break

    def _lose_life(self):
        self.lives -= 1
        self._update_hud()
        if self.lives <= 0:
            self.state = 'over'
            self.over_text.set_text('Game Over - score {}\nPress Space to restart'.format(self.score))
            self.over_text.show()

    # ---------- helpers

    def _despawn(self, items, item):
        items.remove(item)
        studio.destroy_object(item)

    def _clear_dynamic(self):
        for item in self.bullets + self.enemies:
            studio.destroy_object(item)
        self.bullets.clear()
        self.enemies.clear()

    def _update_hud(self):
        self.score_text.set_text('Score: {}'.format(self.score))
        self.lives_text.set_text('Lives: {}'.format(self.lives))

    def _restart(self):
        self._clear_dynamic()
        self.score = 0
        self.lives = 3
        self.fire_timer = 0.0
        self.spawn_timer = 0.8
        self.state = 'playing'
        self.player.set_world_pos(self.player_start[0], self.player_start[1])
        self.over_text.hide()
        self._update_hud()
```

## 3. 逐段理解

| 代码 | 含义 |
| --- | --- |
| `_spawn()` | 用倒计时而不是帧计数：`spawn_timer` 秒后在窗口上方（`y` 为负）生成一架敌机；得分越高，间隔越短。 |
| `'points': [...]` | 直接通过顶点放置三角形；`(cx, -4)` 是向下的机头，所以敌机朝下俯冲。 |
| `enemy.speed` | 对象上的一个普通属性——总控脚本在 `_move_enemies` 里读取它，其余代码无需关心。 |
| `collides_with_object(other)` | 只有当**双方都开启碰撞**且形状相交时才为 `True`——因此每个动态对象都在 `properties` 里带上 `collision_enabled` 与 `collision_type`。 |
| 两处判定 | 子弹 × 敌机：得分并销毁双方；敌机 × 玩家：失去一条命；敌机从底部溜走同样扣命。 |
| `state == 'over'` | 冻结游戏：`on_update` 提前返回，只监听 **Space**。 |
| `_restart()` | 清空脚本创建的所有子弹与敌机，重置分数、生命与计时器，并把玩家放回起始位置。 |
| 标签上的 `set_text(...)` | HUD 只是两个文本对象，由总控脚本持续更新。 |

:::note
任意一侧未开启碰撞时 `collides_with_object()` 都返回 `False`。如果始终打不中，请检查 **Player** 的 **Enable Collision** 是否开启，并核对脚本里的对象名与层级面板是否一致。
:::

## 4. 运行

保存后按 **Ctrl + R**。打不到的就躲开，按住 **Space** 连射，结束画面按 **Space** 重开。三条命全部用完才算一局结束。

下一步：[进阶玩法](/zh-cn/game_examples/air_battle/ideas/)——波次、蛇形敌机与爆炸效果。
