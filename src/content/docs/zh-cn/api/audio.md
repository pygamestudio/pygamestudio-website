---
title: 音频管理器
description: 在脚本中播放音效与背景音乐 —— play_sound、play_music、音量与停止播放。
---

## 音效

### `get_sound_volume()`
当前全部音效的总音量（`0.0`-`1.0`）。

### `is_sound_playing(path)`
该音效正在任意声道上播放时为 `True`——避免重复触发还没播完的音效。

- `path`（`str`）：音频文件（相对于工程目录）。

### `load_sound(path)`
把音频文件载入缓存并返回 `pygame.mixer.Sound`，可用于提前预加载。

- `path`（`str`）：音频文件（相对于工程目录）。

### `play_sound(path, volume=1.0, loops=0, fade_ms=0)`
播放音效并返回对应的 `pygame` 声道（失败时为 `None`）。每个文件只会加载一次然后复用，因此在 `on_update` 中调用也没问题；同一个文件要等上一次播放结束后才会从头再次播放。

- `path`（`str`）：音频文件（相对于工程目录）。
- `volume`（`float`）：播放音量，`0.0`-`1.0`。
- `loops`（`int`）：重复次数——`0` 播放一次，`-1` 无限循环。
- `fade_ms`（`int`）：淡入时长（毫秒）。

### `set_sound_volume(volume)`
设置**全部**音效的总音量，相当于游戏的音量滑条：会立即影响正在播放的音效，并与之后每次 `play_sound()` 的 `volume` 相乘。

- `volume`（`float`）：新的总音量，`0.0`-`1.0`。

### `stop_all_sounds()`
停止当前正在播放的所有音效。

### `stop_sound(path)`
停止这个音效——无论是单次播放的，还是用 `play_sound(..., loops=...)` 开启的循环音效。

- `path`（`str`）：音频文件（相对于工程目录）。

## 背景音乐

### `get_music_volume()`
当前音乐音量。

### `is_music_playing()`
有音乐正在播放时为 `True`。

### `pause_music()`
暂停当前音乐。

### `play_music(path, loops=-1, fade_ms=0)`
播放背景音乐，开始播放时返回 `True`。同一时间**只有一首**音乐——播放新音乐会替换掉旧的；新音乐会沿用之前设置的音量。

- `path`（`str`）：音频文件（相对于工程目录）。
- `loops`（`int`）：`-1`（默认）无限循环，`0` 只播放一次。
- `fade_ms`（`int`）：淡入时长（毫秒）。

### `resume_music()`
继续当前音乐。

### `set_music_volume(volume)`
设置音乐音量，超出 `0.0`-`1.0` 的值会被截断。

- `volume`（`float`）：新的音乐音量，`0.0`-`1.0`。

### `stop_music(fade_ms=0)`
停止音乐。

- `fade_ms`（`int`）：淡出时长（毫秒）。
