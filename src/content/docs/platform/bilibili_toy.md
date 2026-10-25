---
title: bilibili Toy
description: Publish a game to bilibili Toy — the web build, with the SDK bridge the Toy container needs.
---

bilibili Toy runs a game as a web page inside the Toy container. Pygame Studio produces that page and, when **bilibili Toy** is picked as the publishing platform, puts the SDK bridge the game code needs into the package.

An example already online: [Just Eat 100 Apples](https://www.bilibili.com/toy/IyPbFQZSMs2HrwoK/index.html)

## Build

1. Open **Project → Build** (`Ctrl+B`) and switch to the **Web App** tab.
2. Fill in **App Name**, **App Icon** and **Output Dir** as usual.
3. Set **Publishing Platform** to **bilibili Toy**.
4. Click **Build** and check the result in the Console.

Output:

```text
<Output Dir>/build/Web/
├─ index.html            the page (loads the runtime, shows progress and errors)
├─ game.data             the protected project + the engine
├─ pyodide/              folder holding the game's runtime dependencies
└─ favicon.ico           the browser tab icon
```

## Toy platform adaptation

The container only serves a fixed set of file types, so the build reorganises the bundle for it:

- archives are renamed from `.zip` to `.data` (`game.data`, `python_stdlib.data`) and every wheel from `.whl` to `.data`;
- the Pyodide runtime is patched so it loads those names, and every `.mjs` file is removed;
- the platform script `<script src="//s1.hdslb.com/bfs/seed/toy/app/sdk/toy-sdk.js">` is added to `index.html`, which puts `window.toy` on the page;
- before finishing, every file is checked against the whitelist and the build **stops with an error** as soon as something the container would drop is still there.

Allowed file types (anything else fails the build):

| Kind | Extensions |
| --- | --- |
| Pages, code, data | `.html` `.htm` `.css` `.js` `.json` `.wasm` `.data` `.md` `.csv` `.tsv` |
| Images | `.png` `.jpg` `.jpeg` `.gif` `.svg` `.webp` `.ico` |
| Fonts | `.woff2` `.woff` `.ttf` `.eot` |
| Audio and video | `.mp3` `.wav` `.ogg` `.m4a` `.mp4` `.webm` |

## Use the Toy SDK

The container injects the platform's JavaScript SDK, and the engine's code editor reaches it through `studio.sdk.toy`. Call `available()` first to check whether the game is running inside a Toy container.

```python
import pygamestudio as studio

class ObjectScript:
    def __init__(self, obj):
        self.obj = obj

    def on_start(self):
        toy = studio.sdk.toy
        if not toy.available():
            return
        toy.get_user_profile().then(
            lambda user: self.obj.set_text('Hi, ' + user['nickname'])
        )
```

The other calls are listed under [bilibili Toy SDK](/api/sdk/bilibili_toy/) — sharing, cloud storage, scores, QR codes, camera and microphone, input safety and more.

:::tip
See the official [bilibili Toy SDK](https://www.bilibili.com/toy/publish/sdk) for how the SDK itself works.
:::

## Publish

1. Compress the built files into an archive.
![compress](/images/doc/bilibili_toy_publish0.png)

2. Open the [bilibili Toy site](https://www.bilibili.com/toy/intro) and click the publish button in the top right corner.
![bilibili Toy official site](/images/doc/bilibili_toy_publish1.png)

3. Upload the archive, fill in the rest of the game information and publish — the game goes live once it passes review.
![upload](/images/doc/bilibili_toy_publish2.png)

:::tip
See the official [bilibili Toy manual](https://www.bilibili.com/toy/publish/guide) for the publishing flow.
:::

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| The build stops with *These files are not supported by Bilibili Toy and would be dropped…* | An asset uses an extension outside the whitelist. Convert or remove it, then build again. |
| `ToyUnavailableError` in the browser | The page is not inside the Toy container (opened locally, for example). Expected outside the platform — check with `toy.available()`. |
| A sound or image does not show in the container | Its file type is not on the whitelist and the platform dropped it. |

:::tip
See the official [bilibili Toy FAQ](https://www.bilibili.com/toy/publish/guide/faq) for solutions to common problems.
:::
