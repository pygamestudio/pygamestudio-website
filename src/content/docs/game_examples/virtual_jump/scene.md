---
title: Building the Scene
description: Every object of Virtual Jump - the backgrounds, the player (four animations + dust), the bullet and fruit templates, the score and the restart button.
---

The whole scene lives under the **Canvas**; the [Hierarchy](/editor_introduction/hierarchy/) looks like this:

![Hierarchy: the scene structure](/images/doc/virtual_jump_scene.png)

| Object | Type | Job |
| --- | --- | --- |
| `Canvas` | Canvas | Carries `game_manager.py` - the director of the whole game |
| `BackgroundC` | Image | A static full-screen background |
| `BackgroundA` / `BackgroundB` | Image | Two 800×600 full-screen images that the script scrolls in a loop for an endless background |
| `Player` | Empty Node | The player itself, carrying `player.py` |
| `Player/idle`, `Player/run`, `Player/jump`, `Player/double jump` | Keyframe | The four character animations |
| `Player/dust` | Particle | Dust kicked up while running / dashing |
| `Bullet` | Image | The bullet **template** (hidden at runtime, only copied) |
| `apple` | Image | The fruit **template** (same idea) |
| `Score` | Text | Shows the score |
| `Restart` | Button | The restart button that appears after a game over |

A few things that matter while building this:

- Every object is a child of the canvas and uses canvas coordinates (origin at the top-left).
- **The player is an Empty Node**: the visuals are the four animation children; switching an animation means showing one and hiding the others (the node itself is invisible in the game - it is only the "logic body").
- The character animations are made with **Keyframe** objects: drop the frame images onto the [Animation Editor](/editor_introduction/animation_editor/) and it turns them into one keyframe per frame. `idle` and `run` loop, `jump` and `double jump` play once.
- The bullet and fruit **templates** are hidden when the game starts; everything spawned at runtime is a copy of them (see [Scrolling Background & Dynamic Objects](/game_examples/virtual_jump/world/)).
- The `Score` text sits at the top of the screen with a larger font; the `Restart` button starts hidden and is shown by the script after a game over.

:::tip
**Keep the pivot at "Center"**: turning around and dashing both mirror the sprite by making its X scale negative, and a centered pivot mirrors in place without shifting the object (see "Pivot & Flip" in the [Inspector](/editor_introduction/inspector/) page).
:::
