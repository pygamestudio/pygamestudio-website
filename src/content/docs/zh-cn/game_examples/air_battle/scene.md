---
title: 搭建场景
description: 飞机大战的场景——一架三角形飞机、得分、三条命与一个隐藏的结束标签。
---

手动摆放的对象只有四个；子弹与敌机会在之后由脚本动态创建。

## 1. 创建工程

按照[创建工程](/zh-cn/tutorial/create_a_project/)新建工程并打开场景。在[属性面板](/zh-cn/editor_introduction/inspector/)里把 **Canvas** 的 **Color** 设为夜空的深色 `(10, 14, 26, 255)`。窗口为 `800 x 600`。

## 2. 玩家飞机

添加一个**多边形**（[创建对象](/zh-cn/tutorial/create_an_object/)），把它的点列表（**Points** 行）改成恰好三个顶点——一个尖端朝上的三角形：

| 顶点 | 坐标 |
| --- | --- |
| P1 | `370`、`560` |
| P2 | `430`、`560` |
| P3 | `400`、`520` |

然后设置：

| 属性 | 值 |
| --- | --- |
| **Name** | `Player` |
| **Color** | `(90, 200, 255, 255)`——天蓝色 |
| **Enable Collision** | 开 |
| **Collision Shape** | **BBox** |

多边形的顶点直接保存在场景坐标中，位置由顶点推导（[多边形 API](/zh-cn/api/objects/polygon/)）。`BBox` 碰撞形状就是三角形的外接矩形，恰好满足碰撞判定所需。

## 3. HUD

三个**文本**对象：

| 对象 | Pos | Size | Text | Color | 可见性 |
| --- | --- | --- | --- | --- | --- |
| `Score` | `20`、`20` | `200`、`40` | `Score: 0` | 白色 | 开 |
| `Lives` | `580`、`20` | `200`、`40` | `Lives: 3` | 白色 | 开 |
| `GameOver` | `200`、`250` | `400`、`60` | `Press Space` | `(255, 220, 80, 255)` | **关** |

把 `GameOver` 的 **Visibility** 取消勾选：只在生命耗尽时由脚本显示。

## 4. 检查并保存

- [层级面板](/zh-cn/editor_introduction/hierarchy/)中应有 `Player`、`Score`、`Lives`、`GameOver` 位于 `Canvas` 之下。
- 只有玩家飞机开启了碰撞：子弹与敌机的碰撞属性会由脚本在创建时一并写入。
- 按 **Ctrl + S** 保存。

下一步：[脚本（一）：飞行与射击](/zh-cn/game_examples/air_battle/script/)。
