---
title: 得分、失败与重开
description: 用引擎自带的碰撞检测收集水果、判定失败，分数文本、冻结玩家与重开流程。
---

游戏的三件“状态事”全在 `game_manager.py` 里：碰撞结果、分数、失败与重开。

![吃水果加分、被命中后显示重开按钮](/images/doc/virtual_jump_gameplay.png)

## 碰撞检测：脚本只记标记，总管统一处理

玩家、子弹、水果都打开**碰撞检测**（`collision_enabled`），并给一个比贴图略小的判定盒，手感更宽容。引擎检测到碰撞会调用对方脚本的 `on_collision_enter()`：

```python
    # bullet.py —— 撞到玩家只记一个标记
    def on_collision_enter(self, other):
        manager = self._manager()
        if manager is not None and manager.is_player(other):
            self.hit_player = True
```

总管脚本**下一帧**再统一处理这些标记：

```python
    def _update_dynamic(self):
        # 子弹撞到玩家 -> 失败
        for bullet in self._live(self.BULLET_PREFIX):
            if self._flag(bullet, "hit_player"):
                self._game_over()
                return
        # 苹果被吃到 -> 加分 + 音效 + 销毁
        for apple in self._live(self.APPLE_PREFIX):
            if self._flag(apple, "collected"):
                self.add_score(self.APPLE_SCORE)
                self._play_sound(self.GET_SOUND)
                self._destroy_object(apple)
```

:::tip
**不要在 `on_collision_enter` 里直接销毁对象**——碰撞回调发生在引擎内部的遍历过程中。记标记、下一帧统一处理，永远安全。
:::

## 分数文本

分数就是一个 `Score` 文本对象；加分时同步刷新它的文本：

```python
    SCORE_FORMAT = "%d"          # 想显示 “分数: 0” 就改这里

    def add_score(self, amount=1):
        if self.game_over:
            return
        self.score += int(amount)
        self.score_text.set_text(self.SCORE_FORMAT % self.score)
```

## 失败

中弹 = 游戏结束：停止生成、清空场上动态对象、**冻结玩家**、显示重开按钮，并播一句失败音效：

```python
    def _game_over(self):
        self._play_sound('./audio/fail.mp3')
        self.game_over = True
        self._clear_dynamic()          # 清掉全部子弹与水果
        self._freeze_player(True)      # player.frozen = True，玩家原地停住
        self.restart.show()
```

冻结后 `on_update` 里 `game_over` 为真，生成与判定全部跳过——场景静止下来等玩家重开。

## 重开

两条路都通向同一个 `_restart()`：点 **Restart** 按钮（会播 `click.mp3`），或按 **R / 回车**（安静重开）：

```python
    def _restart(self, clicked=False):
        self._clear_dynamic()
        self.player.x, self.player.y = self.player_start      # 回到出生点
        self.player.set_scale_x(self.player_scale_x)          # 贴图转回朝右
        self._freeze_player(False)
        self._player_script().reset()                         # 清空跳跃/冲刺状态
        self.restart.hide()
        self.score = 0
        self.game_over = False
        if clicked:
            self._play_sound(self.CLICK_SOUND)
```

重开按钮的点击由 `restart_button.py` 转告总管脚本；脚本里还留了一个兜底：鼠标左键按在按钮范围内同样算点击。

:::tip
重开时玩家脚本按**节点真实的 `scale_x`** 重新对齐朝向——因为 `set_scale_x()` 是直接改节点属性，玩家脚本不会收到通知，不重新同步的话贴图会“记得”上一局的朝向。
:::
