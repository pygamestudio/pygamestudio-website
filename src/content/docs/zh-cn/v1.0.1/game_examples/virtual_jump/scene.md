---
title: 搭建场景
description: 虚拟跳跃的全部对象：背景、玩家（四种动画 + 尘土粒子）、子弹与水果模板、分数与重开按钮。
---

整个场景挂在**画布**下面，[层级面板](/zh-cn/editor_introduction/hierarchy/)里的结构如下：

![层级面板：场景结构](/images/doc/virtual_jump_scene.png)

| 对象 | 类型 | 作用 |
| --- | --- | --- |
| `Canvas` | 画布 | 挂 `game_manager.py`——整个游戏的总指挥 |
| `BackgroundC` | 图像 | 静止的整屏背景 |
| `BackgroundA` / `BackgroundB` | 图像 | 两张 800×600 的整屏背景图，由脚本循环滚动，拼出无限背景 |
| `Player` | 空节点 | 玩家本体，挂 `player.py` |
| `Player/idle`、`Player/run`、`Player/jump`、`Player/double jump` | 关键帧 | 四套角色动画 |
| `Player/dust` | 粒子 | 奔跑 / 冲刺时脚下的尘土 |
| `Bullet` | 图像 | 子弹**模板**（运行时隐藏，只用来复制） |
| `apple` | 图像 | 水果**模板**（同上） |
| `Score` | 文本 | 显示分数 |
| `Restart` | 按钮 | 失败后出现的重开按钮 |

搭场景时的几个要点：

- 所有对象都是画布的子对象，用的是画布坐标（左上角是原点）。
- **Player 用空节点**：贴图交给下面的四个动画子对象，换动画 = 显示其中一个、隐藏其余（空节点在游戏里不可见，只当"逻辑本体"）。
- 玩家动画用**关键帧**对象制作：把序列帧图片拖进[动画编辑器](/zh-cn/editor_introduction/animation_editor/)会自动生成逐帧关键帧，循环播 `idle`、`run`，只播一次 `jump`、`double jump`。
- **子弹与水果两种"模板"**在脚本开场时被隐藏，游戏中每次生成的都是它们的副本——这样就能在运行时无限产出（详见[滚动背景与动态对象](/zh-cn/game_examples/virtual_jump/world/)）。
- `Score` 文本放在屏幕顶部，字号调大一些；`Restart` 按钮先隐藏，失败后才由脚本显示。

:::tip
**枢轴保持在"中心"**：奔跑转身、冲刺翻转都靠把缩放 X 改成负数来镜像，中心枢轴可以原地翻转不跑位（见[属性检查器](/zh-cn/editor_introduction/inspector/)的"枢轴与翻转"）。
:::
