---
title: 虚拟跳跃
description: 完整的 2D 横版小游戏案例：无限滚动背景、会二段跳和冲刺的小人、飞来的子弹、天上掉下的水果、分数与重开。
---

**虚拟跳跃（Virtual Jump）** 是一个完整的游戏开发案例：小人站在不断向上滚动的荒原上，一边躲开从四面飞来的子弹，一边接住从天而降的水果。它用到了编辑器里最常用的一批功能——图片、关键帧动画、粒子、文本、按钮、碰撞检测、音效——全部由一个画布脚本和四个小脚本驱动。

![虚拟跳跃：游戏画面](/images/doc/virtual_jump_cover.png)

## 玩法

| 操作 | 效果 |
| --- | --- |
| ← / → | 左右奔跑，朝向自动翻转 |
| 空格 / ↑ / W | 跳跃；在空中再按一次就是二段跳 |
| D | 冲刺（短距离突进，有冷却时间） |
| R / 回车 | 游戏结束后重新开始 |

吃到一个水果 **+1 分**；被子弹命中 = 游戏结束，点击 **Restart** 按钮或按 R 重开。

## 本章导航

1. [搭建场景](/zh-cn/game_examples/virtual_jump/scene/)——对象结构和每个对象的职责
2. [玩家控制](/zh-cn/game_examples/virtual_jump/player/)——奔跑、跳跃、二段跳、冲刺与动画切换
3. [滚动背景与动态对象](/zh-cn/game_examples/virtual_jump/world/)——无缝滚动、"模板复制"生成子弹和水果
4. [得分、失败与重开](/zh-cn/game_examples/virtual_jump/gameplay/)——碰撞检测、分数文本、冻结与重置
5. [运行与发布](/zh-cn/game_examples/virtual_jump/publish/)——编辑器里试玩、打包成网页版或桌面版

## 需要的素材

角色动画帧（站立 / 奔跑 / 二段跳）、水果帧、背景图、音效都放在项目文件夹的 `image/` 与 `audio/` 里，可以随时替换成自己的素材——名字保持一样就不用改代码。

:::tip
建议先熟悉[添加脚本](/zh-cn/tutorial/add_script/)和[动画编辑器](/zh-cn/editor_introduction/animation_editor/)；本文假设你已经会在场景里创建对象。
:::
