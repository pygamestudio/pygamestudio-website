---
title: Running & Publishing
description: Play the game in the editor, package it for the web or the desktop, and share it with friends.
---

![The packaged game running in the browser](/images/doc/virtual_jump_publish.png)

## Playing in the editor

Press **Ctrl + R** (or click the run button on the toolbar) to start the game in its own window. The [Console](/editor_introduction/console/) shows everything the scripts `print` - the example logs every score, hit and restart, which makes debugging easy.

## Packaging for the web

Open **Project → Build** and switch to the **Web App** tab:

1. Fill in the app name (the page title); the defaults are fine otherwise;
2. Click **Build**, then **Run in Browser** to try the result right away;
3. The output is the `build/Web/` folder - send the whole folder to a friend (or upload it to any static host) and it plays in a browser with nothing to install.

A few **browser rules** are normal while testing the web build:

- **Sound starts with the first click or key press** (browsers forbid autoplay before any interaction); the game itself starts on its own;
- the game loop follows the **display's refresh rate**, so scrolling stays smooth;
- **switching to another tab pauses the game** automatically, and it resumes when you come back;
- music and sound effects are decoded and played by the browser itself - MP3 / OGG / WAV all work.

## Packaging for the desktop

The **Desktop App** tab of the same window turns the game into a standalone executable for the current system (Windows / macOS / Linux). Click **Run Game** after the build to check it - it plays exactly like the editor run.

## Where to go next

- Tune the feel: the speed, gravity, jump and dash constants at the top of `player.py`;
- Raise the difficulty: the bullet / fruit intervals and speed ranges in `game_manager.py`;
- Swap the art: replace the files in `image/` and `audio/` (keep the names and no code changes are needed);
- Change the rules: browse the [global API](/api/global/) and the [object APIs](/api/objects/) - turn the score into a timer or the fruit into coins.
