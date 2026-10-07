---
title: Virtual Jump
description: A complete 2D side-scrolling game example - an endlessly scrolling background, a runner with double jump and dash, flying bullets, falling fruit, score and restart.
---

**Virtual Jump** is a complete game development example: a little runner on a wasteland that scrolls forever, dodging bullets that fly in from every side while catching fruit falling from above. It uses the editor's everyday feature set - images, Keyframe animations, particles, text, buttons, collision detection and sound - driven by one canvas script and four small object scripts.

![Virtual Jump: the game running](/images/doc/virtual_jump_cover.png)

## How to play

| Control | Effect |
| --- | --- |
| ← / → | Run left / right; the character flips automatically |
| Space / ↑ / W | Jump; press again in mid-air for a double jump |
| D | Dash (a short burst with a cooldown) |
| R / Enter | Restart after a game over |

Catching one fruit scores **+1**; a bullet hit ends the game - click the **Restart** button or press R to play again.

## What this chapter covers

1. [Building the scene](/game_examples/virtual_jump/scene/) - every object and its job
2. [Player control](/game_examples/virtual_jump/player/) - running, jumping, double jump, dash and animation switching
3. [Scrolling background & dynamic objects](/game_examples/virtual_jump/world/) - seamless scrolling and the "hidden template + runtime copies" pattern
4. [Score, failure & restart](/game_examples/virtual_jump/gameplay/) - collision detection, the score text, freezing and resetting
5. [Running & publishing](/game_examples/virtual_jump/publish/) - play it in the editor, package it for the web or the desktop

## What you need

The character animation frames (idle / run / double jump), the fruit frames, the background image and the sound files live in the project's `image/` and `audio/` folders - swap in your own art any time; keep the file names and nothing else has to change.

:::tip
It helps to know [Add a Script](/tutorial/add_script/) and the [Animation Editor](/editor_introduction/animation_editor/) first; this chapter assumes you can create objects in the scene.
:::
