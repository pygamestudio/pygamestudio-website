---
title: Platform SDK
description: The vendor SDK bridges shipped with the engine — the TapTap PC SDK and the bilibili Toy SDK.
---

| Page | Contents |
| --- | --- |
| [TapTap PC](/api/sdk/taptap_pc/) | `studio.sdk.taptap.pc`: starting the SDK, login, achievements, cloud saves, DLC, leaderboards, relations, online battle, compliance, platform random numbers. |
| [bilibili Toy](/api/sdk/bilibili_toy/) | `studio.sdk.toy`: container state, navigation, user and author data, sharing, cloud storage, scores, camera and microphone. |

## Availability

`available()` answers whether the SDK can work here: Windows x64 with the TapTap runtime installed for TapTap PC, a page opened by the Toy container for bilibili Toy. Off the platform every call raises — `TapSDKNotAvailable` for TapTap, `ToyUnavailableError` for Toy — so a call that is not guarded would stop a desktop or a web build.

Importing either namespace costs nothing: no library is loaded until the SDK is initialised, so one `main.py` serves every build and the editor.

## Publishing

Which platform a build targets is chosen in the build window, and each target has its own guide: [TapTap PC](/platform/taptap_pc/) and [bilibili Toy](/platform/bilibili_toy/).
