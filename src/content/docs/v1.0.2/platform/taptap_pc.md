---
title: TapTap PC
description: Publish a game to TapTap PC — the desktop build with the TapTap SDK added to it.
---

A game on TapTap PC is a Windows executable that uses the TapTap client for login, DLC, achievements, cloud saves, leaderboards, compliance and online battle. Pygame Studio packages that executable and, when **TapTap PC** is picked as the publishing platform, puts the SDK bridge the game code needs into the package.

An example already online: [Just Eat 100 Apples](https://www.taptap.cn/app/981059?os=pc)

## Build

1. On Windows, open **Project → Build** (`Ctrl+B`) and stay on the **Desktop App** tab.
2. Fill in **App Name**, **App Icon** and **Output Dir** as usual.
3. Set **Publishing Platform** to **TapTap PC**.
4. Click **Build** — the engine packs the SDK folder into the bundle as well.

Output:

```text
<Output Dir>/build/Windows/dist/<App Name>/
├─ <App Name>.exe     the game
└─ _internal          dependencies, including the TapTap SDK bridge
```

TapTap PC is Windows x64 only, so the package that goes to the platform is the one built on Windows.

## Use the TapTap PC SDK

The bridge is `studio.sdk.taptap.pc`. It needs the `client_id` and `public_key` of the TapTap developer entry, must be initialised before the main loop starts and has to be driven once per frame:

```python
import pygamestudio as studio

CLIENT_ID = '...'
PUB_KEY = '...'

def main():
    pc = studio.sdk.taptap.pc
    if not pc.available():
        return                                  # editor, another OS, SDK missing

    # TapTap sometimes asks for a relaunch through its client: True means it
    # did, and this process should exit.
    if pc.restart_app_if_necessary(CLIENT_ID):
        return

    pc.init(CLIENT_ID, PUB_KEY)

    class Game(studio.Game):
        def on_update(self, dt):
            pc.run_callbacks()                  # deliver async results every frame
            studio.load_scene(studio.get_screen())

        def on_quit(self):
            pc.shutdown()

    Game().run()

if __name__ == '__main__':
    main()
```

`client_id` and `public_key` may also live in `project.pygs`, in a section the editor never writes:

```json
{ "taptap": { "client_id": "...", "public_key": "..." } }
```

:::tip
`client_id` and `public_key` are found in the [TapTap developer console](https://developer.taptap.cn/), under the game's services → app configuration.
:::

Results arrive in two ways — **events** and **requests**:

```python
pc.on('authorize_finished', lambda data: print('login', data))

request = pc.achievement.unlock('first_win')
pc.wait(request, timeout=5.0)                   # or check request.done later
```

Every call and namespace (user, achievements, cloud saves, DLC, leaderboards, relations, online battle, compliance) is listed under [TapTap PC SDK](/api/sdk/taptap_pc/).

:::tip
See the official [TapTap PC SDK](https://developer.taptap.cn/docs/pc/cpp-sdk/overview/) for how the SDK itself works.
:::

## Publish

1. Compress the built files into an archive.
![compress](/images/doc/taptap_pc_publish0.png)

2. Open the [TapTap developer console](https://developer.taptap.cn/), create the game and open **PC package management**, then upload the archive and wait for review. Once the package has passed and you have tested it yourself, fill in the game information and publish.
![upload](/images/doc/taptap_pc_publish1.png)

:::tip
See the official [TapTap PC documentation](https://developer.taptap.cn/docs/pc-store/) for the PC publishing guide.
:::

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| `pc.available()` is still `False` after building | The build was made without **TapTap PC** selected, or on another operating system. Rebuild on Windows with the platform selected. |
| `init()` returns `NoPlatform` | The TapTap client is not installed (or not running) on that machine. It can be downloaded from [taptap.cn](https://www.taptap.cn/download). |
| `init()` returns `NotLaunchedByPlatform` | The game was started directly. Start it through the TapTap client; `restart_app_if_necessary()` handles the relaunch TapTap asks for. |
| Results never arrive | `pc.run_callbacks()` is not called every frame, or it is called before `init()` succeeded. |
| `TapSDKNotAvailable` raised unexpectedly | The call was made outside a TapTap build, or the SDK was not packed in. Guard with `pc.available()` to avoid the error. |
