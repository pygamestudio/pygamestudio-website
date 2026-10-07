---
title: 玩家控制
description: 一个脚本完成奔跑、翻转、重力跳跃、二段跳、冲刺与动画切换。
---

Player 的 `player.py` 每帧读取键盘，更新位置、速度与动画。核心是**自己算重力**而不是使用物理引擎——这种追求精确手感的平台跳跃，用代码控制更简单、更稳。

![玩家对象](/images/doc/virtual_jump_player.png)

## 奔跑与翻转

```python
    MOVE_SPEED = 260.0              # 水平移动速度（像素/秒）

    def _update_horizontal(self, dt: float):
        dx = 0.0
        if self._any_key(self.LEFT_KEYS) and not self._any_key(self.RIGHT_KEYS):
            dx = -self.MOVE_SPEED * dt
        elif self._any_key(self.RIGHT_KEYS) and not self._any_key(self.LEFT_KEYS):
            dx = self.MOVE_SPEED * dt
        if dx:
            self.obj.x += dx
            self._clamp_x()                     # 别走出屏幕左右边界
            self._set_facing(self.FACING_LEFT if dx < 0 else self.FACING_RIGHT)
        self.moving = dx != 0.0
```

**翻转不换贴图**：把缩放 X 设为负数即可镜像；枢轴在中心，原地翻转不会跑位：

```python
    def _set_facing(self, facing: int):
        if facing == self.facing:
            return
        self.facing = facing
        self.obj.set_scale_x(self.base_scale_x * facing)   # 朝左 = 缩放 X 取负
```

## 重力、跳跃与二段跳

```python
    GRAVITY = 2000.0            # 重力加速度（像素/秒²）
    JUMP_SPEED = 700.0          # 一段跳初速度
    DOUBLE_JUMP_SPEED = 600.0   # 二段跳初速度（略小一点，手感更干脆）
```

每帧给竖直速度加上 `重力 × dt`、再按速度移动位置；回到地面高度就落地：

```python
        self.velocity_y += self.GRAVITY * dt
        self.obj.y += self.velocity_y * dt
        if self.obj.y >= self.ground_y:          # 落地
            self.obj.y = self.ground_y
            self.velocity_y = 0.0
            self.on_ground = True
            self.jumps_used = 0
```

跳跃用「**刚按下**」判断（记录上一帧是否按住），按住不放不会连跳：

```python
        jump_down = (studio.is_key_pressed(studio.K_SPACE)
                     or studio.is_key_pressed(studio.K_UP)
                     or studio.is_key_pressed(studio.K_w))
        just_pressed = jump_down and not self.jump_key_down
        self.jump_key_down = jump_down
        if not just_pressed:
            return
        if self.on_ground:                       # 一段跳
            self.velocity_y = -self.JUMP_SPEED
            self.on_ground = False
            self.jumps_used = 1
        elif self.jumps_used < 2:                # 空中二段跳
            self.velocity_y = -self.DOUBLE_JUMP_SPEED
            self.jumps_used = 2
```

## 冲刺（D 键）

按下 D 后 **0.18 秒**内以 **950 像素/秒**朝当前朝向突进（约 170 像素），随后进入 0.45 秒冷却；冲刺期间方向锁定、不再接受左右键：

```python
        if just_pressed and not self.is_dashing() and self.dash_cooldown <= 0.0:
            self._start_dash()
        if self.dash_timer > 0.0:
            self.dash_timer = max(0.0, self.dash_timer - dt)
            self.obj.x += self.dash_dir * self.DASH_SPEED * dt
            self._clamp_x()          # 贴到屏幕边缘只是不前进，冲刺照常结束
```

## 动画切换

四个关键帧动画（`idle` / `run` / `jump` / `double jump`）同一时刻只显示一个：

```python
    def _update_anim(self):
        if not self.on_ground:
            want = self.double_jump if self.jumps_used >= 2 else self.jump
        else:
            want = self.run if (self.moving or self.is_dashing()) else self.idle
        if want is None or want is self.current_anim:
            return
        if want in (self.run, self.jump, self.double_jump):
            want.restart()               # 从第一帧开始播
        self._show_anim(want)

    def _show_anim(self, anim):
        for other in (self.idle, self.run, self.jump, self.double_jump):
            if other is not None and other is not anim:
                other.hide()
        if anim is not None:
            anim.show()
            anim.play()
        self.current_anim = anim
```

- `idle` / `run` 在 `on_start` 里设为**循环播放**，`jump` / `double jump` 只播一次、播完停在最后一帧；
- 奔跑与冲刺时打开脚下的**尘土粒子**（`set_emission_rate`），停下时先停速率再隐藏（隐藏中的发射器仍会生成粒子）。

## 音效

- 一段跳 / 二段跳共用 `jump.mp3`，冲刺用 `dash.mp3`；
- 在 `on_start` 里用 `studio.load_sound()` **预载**，真正播放时就不用现读文件——网页版上这一步尤其重要。

## 留给游戏管理器的接口

失败时总管脚本把 `player.frozen = True`，本脚本直接跳过更新（原地停住）；重开时调用 `reset()` 清空速度、跳跃、冲刺状态，并把贴图按节点真实的 `scale_x` 重新对齐朝向。

:::tip
想调手感，只改 `MOVE_SPEED`、`GRAVITY`、`JUMP_SPEED`、`DASH_*` 这几个常量即可，脚本里都写了注释。
:::
