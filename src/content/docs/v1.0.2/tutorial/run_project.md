---
title: Run the Project
description: Start the project from the editor and read its output and errors in the Console.
---

Once the scene and the scripts are ready, it is time to run the project and see how it plays. The run opens a game window of its own, and everything the game logs can be read in the **Console** panel.

## Starting the run

Any of these starts the run:

1. Click the **Run** button — the [Scene](/editor_introduction/scene/), [Code Editor](/editor_introduction/code_editor/) and [Block Editor](/editor_introduction/block_editor/) toolbars all carry it;
2. Press **Ctrl + R**;
3. Use the **Project → Run** menu at the top of the editor;
4. Right-click **main.py → Run** in the Asset panel.

:::note
The entry point is always the project root's `main.py`: it loads the scene and starts the main loop. Please do not delete or move that file (editing it is fine).
:::

Clicking Run first saves the current scene, then starts the game. The game runs in a separate Python process and reads the `.scene` file and the scripts from the project folder, so a run always uses the newest saved content. (The Code and Block editors save automatically a moment after you stop typing.)

:::tip
When the scene has not been saved yet, the first run shows a Save As dialog so the scene is saved before the game starts.
:::

While the game is running, changes made to the scene or to a script are not synced into the game window. To make a change take effect, close the game window and run again.

## Output and errors

Everything the game prints — `print()` output as well as Python errors — shows up in the [Console](/editor_introduction/console/) in real time.

When a script fails, the console shows the full traceback: **Ctrl + click** a line with `File "…", line N` to jump to the failing line in the [Code Editor](/editor_introduction/code_editor/).

## Troubleshooting

- **The game window never appears, or flashes and closes.** A script usually raised an error right at startup — look for the red log lines in the Console.
- **A change has no effect when running.** Changes made in the editor are not synced into a running game: close the game window and run again, and make sure the change was saved (the editors save automatically; you can also press **Ctrl + S** to save by hand).
