---
title: 进阶玩法
description: 调整飞机大战的手感，并加入波次、蛇形敌机、血量、粒子与音效。
---

游戏已经自带难度曲线，所有旋钮都是 `script/game.py` 里的某个数字。

## 参数调整

| 想要的效果 | 修改位置 |
| --- | --- |
| 更快或更慢的射速 | `self.fire_timer = 0.18`——数值越小越快 |
| 子弹更慢 | `_move_bullets` 里的 `620` |
| 更宽裕的节奏 | `self.spawn_timer = max(0.35, 1.1 - self.score * 0.02)` → 起始值改大（`1.6`）或收缩变慢（`* 0.01`） |
| 敌机更慢 | `enemy.speed = 90 + self.score * 3` → 改小 |
| 更多生命 | `__init__` **和** `_restart()` 里的 `self.lives = 3` |

## 蛇形敌机

给敌机一个方向、让它碰到边缘时反弹——只需在 `_spawn` 与 `_move_enemies` 中做三处小改动：

```python
        enemy.direction = random.choice([-1, 1]) * 120     # in _spawn
```

```python
            enemy.move(enemy.direction * dt, enemy.speed * dt)   # in _move_enemies
            width, _ = studio.get_window_size()
            if rect.left < 0 or rect.right > width:
                enemy.direction = -enemy.direction
```

## 需要打两下的敌机

```python
        enemy.hp = 2                                       # in _spawn
```

```python
                if bullet.collides_with_object(enemy):
                    self._despawn(self.bullets, bullet)
                    enemy.hp -= 1
                    if enemy.hp <= 0:
                        self._despawn(self.enemies, enemy)
                        self.score += 1
                        self._update_hud()
                    break
```

## 爆炸与音效

- **粒子**——添加一个名为 `Spark` 的粒子对象（Emission Rate 设 `0`、Spread `360`），在 `on_start()` 中获取，并在敌机被击落处触发：
  先 `self.spark.set_pos(*enemy.get_center())`，再 `self.spark.emit_particles(24)`。
- **音效**——导入 `audio/hit.wav`，在击落处调用 `studio.play_sound('./audio/hit.wav')`。

## 更多想法

| 想法 | 提示 |
| --- | --- |
| 真正的飞机贴图 | 把玩家多边形换成**图像**对象（**image_path** 行）；脚本只用到它的名字与位置 |
| 被撞后的短暂无敌 | 记录 `self.invulnerable = 1.0` 秒，在无敌期间跳过"敌机 × 玩家"判定 |
| 暂停键 | 在 `main.py` 的 `Game` 类里用 `on_key_down(key, ...)` 切换 `paused` 标志（[Game API](/zh-cn/api/game/)） |
| 屏幕上的最高分 | 用第四个文本对象保存历史最高分，而不是每次把 `self.score` 归零 |
| 每 50 分出一次 BOSS | 在 `_spawn` 中当 `self.score` 越过阈值时，创建一个更宽、`hp = 10` 的多边形 |

:::note
每份状态只由一个地方拥有：分数、生命与动态对象列表都在总控脚本里；敌机身上的 `speed`、`hp` 等属性则随对象携带，供总控脚本读取。
:::
