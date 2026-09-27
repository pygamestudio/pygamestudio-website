---
title: Balance Ball
description: Keep a ball on a tilting, shrinking platform for as long as you can - a small game about movement, feedback and restarting.
---

A ball sits on a platform. **←** and **→** lean the platform so the ball rolls to the other side; random gusts of wind and a platform that slowly shrinks make staying on harder every second. When the ball rolls over the edge it falls out of the window and the round is over.

This is the game you will build:

| | |
| --- | --- |
| **Goal** | Keep the ball on the platform as long as possible |
| **Controls** | **←** / **→** lean the platform, **Space** restarts after a fall |
| **Objects** | `Platform` (Rect), `Ball` (Ellipse), `Score` and `GameOver` (Text) |
| **Script** | one script on the ball: `script/ball.py` |
| **What you learn** | frame-rate independent movement with `dt`, keyboard input, text labels, a small state machine |

## Pages

| Page | What it covers |
| --- | --- |
| [1. Build the scene](/game_examples/balance_ball/scene/) | Create the project and place every object |
| [2. The ball script](/game_examples/balance_ball/script/) | The complete game logic, piece by piece |
| [3. Make it better](/game_examples/balance_ball/ideas/) | Tuning, sound, particles and new rules |

:::tip
New to the editor? Follow [Create a Project](/tutorial/create_a_project/) and [Add a Script](/tutorial/add_script/) first — this guide assumes those basics.
:::
