---
title: Add a Script
description: Create a Python script in the Asset panel and attach it to a rectangle, then make it grow and shrink — with code or with blocks.
---

Objects added to the scene just sit there until a script brings them to life. This guide attaches a script to a rectangle and makes it grow and shrink — handwritten in step 4, and built with the Block Editor in step 5.

## 1. Create the object

Follow the steps in [Create an Object](/tutorial/create_an_object/) to add a **Rect** to the scene and select it. The Inspector shows its properties.

## 2. Create the script file

In the **Asset** panel, right-click the `script` folder that should hold the script and choose **Add → Script**:

![Add → Script in the Asset panel](/images/doc/add_script_add_menu.png)

:::note
Custom scripts do not have to live in the `script` folder — creating them anywhere else in the project works just as well.
:::

The script is named `new.py` by default; rename it to `big_small.py`. Double-clicking it opens the [Code Editor](/editor_introduction/code_editor/).

## 3. Attach the script to the rectangle

Select the rectangle in the scene and look at the **Script Path** row of the Inspector: click the browse icon and pick the file you just created (dropping the `.py` file onto the row works as well). The file name then appears in the row, and the **×** button next to it detaches the script again.

![The Script Path row with an attached script](/images/doc/create_an_object_script.png)

:::tip
The row turns red when the file behind it cannot be found, usually because the script was moved or renamed in the Asset panel. Pick the file again to fix the reference.
:::

## 4. Write the grow / shrink logic

Double-click the script file to open it in the Code Editor and replace the body of the template with this code:

```python
import pygamestudio as studio


class ObjectScript:
    def __init__(self, obj):                # 1
        self.obj = obj
        self.factor = 0.1                   # 2

    def on_update(self, dt):                # 3
        if self.obj.scale_x >= 5:           # 4
            self.factor = -0.1
        elif self.obj.scale_x <= 1:         # 4
            self.factor = 0.1

        self.obj.scale_x += self.factor     # 5
        self.obj.scale_y += self.factor
```

What the pieces do:

1. `__init__(self, obj)` — the engine hands the object to the script; keeping it on `self.obj` lets every callback reach it.
2. `self.factor` — the scale factor: how much the object grows (or shrinks) each time.
3. `on_update(self, dt)` — called once per frame while the game runs; `dt` is that frame's duration in seconds.
4. `if / else` — when the object's horizontal scale `scale_x` is greater or equal to `5`, set `self.factor` to `-0.1` to shrink the object; when it is less or equal to `1`, set `self.factor` to `0.1` to grow it.
5. `self.obj.scale_x += self.factor` — adds `self.factor` to the object's `scale_x` and `scale_y`: at `-0.1` the object shrinks, at `0.1` it grows.

![The script in the Code Editor](/images/doc/script_content.png)

Click **Run** button in the Code Editor toolbar (or press **Ctrl + R**) and the rectangle starts growing and shrinking.

:::tip
If the scene has not been saved yet, when the code is run for the first time, a Save As window will pop up first to let the user save the scene.
:::

![The rectangle growing and shrinking](/images/doc/rect_big_small.gif)

## 5. The same effect with the Block Editor

The same logic can be snapped together instead of typed. Add another script (for example `big_small_blocks.py`), drag it onto the rectangle's **Script Path** row to replace the first one, then right-click it in the Asset panel and choose **Open in Block Editor**.

![Open in Block Editor](/images/doc/open_with_block_editor.png)

With the Block Editor open, follow these steps in order:

1. Open the **Variables** tab and create a **Number** variable named `factor` with the initial value `0.1`.
2. Open the **Events** tab, expand the **Rect** group and drag **When each frame updates (dt)** onto the canvas.
3. Open the **Control** tab, drag **If** onto the canvas and snap it below the event block; pick `scale x` as the property, `greater or equal` as the comparison and set the value to `5`.
4. Open the **Actions** tab, drag **Set property to value** inside the **If** block; pick `factor` as the property and set the value to `-0.1`.
5. Open the **Control** tab, drag **else if** onto the canvas and snap it below the **If** block; pick `scale x` as the property, `less or equal` as the comparison and set the value to `1`.
6. Open the **Actions** tab, drag **Set property to value** inside the **else if** block; pick `factor` as the property and set the value to `0.1`.
7. Open the **Actions** tab, drag **2** **Change property by** blocks onto the canvas and snap them below the chain; pick `scale x` and `scale y` as their properties and set their value to `factor`.

![The blocks snapped together](/images/doc/code_with_block_editor.png)

Now make sure that the `big_small_blocks.py` script is attached to the rectangle object. Click **Run** button in the Block Editor toolbar (or press **Ctrl + R**) and the rectangle grows and shrinks just like the code version.
