---
title: Audio Manager
description: Play sound effects and background music from a script — play_sound, play_music, volumes and stopping.
---

## Sound effects

### `get_sound_volume()`
The volume of all sound effects (`0.0`-`1.0`).

### `is_sound_playing(path)`
`True` while that effect is playing on any channel — handy to avoid restarting a sound that is still running.

- `path` (`str`): audio file, relative to the project folder.

### `load_sound(path)`
Loads a sound file into the cache and returns the `pygame.mixer.Sound` — useful to warm up a file before it is needed.

- `path` (`str`): audio file, relative to the project folder.

### `play_sound(path, volume=1.0, loops=0, fade_ms=0)`
Plays a sound effect and returns its `pygame` channel (`None` on failure). Every file is loaded once and reused, so calling it from `on_update` is fine — a sound is only retriggered from the start once the previous play of that file has finished.

- `path` (`str`): audio file, relative to the project folder.
- `volume` (`float`): playback volume, `0.0`-`1.0`.
- `loops` (`int`): repeats — `0` plays once, `-1` loops forever.
- `fade_ms` (`int`): fade-in time in milliseconds.

### `set_sound_volume(volume)`
Sets the volume of **all** sound effects. It works like the game's volume slider: it also changes the sounds that are playing right now, and is multiplied with the `volume` of every later `play_sound()`.

- `volume` (`float`): new master volume, `0.0`-`1.0`.

### `stop_all_sounds()`
Stops every effect that is currently playing.

### `stop_sound(path)`
Stops that effect wherever it is playing — a one-shot sound as well as one started with `play_sound(..., loops=...)`.

- `path` (`str`): audio file, relative to the project folder.

## Background music

### `get_music_volume()`
The current music volume.

### `is_music_playing()`
`True` while a track is playing.

### `pause_music()`
Pauses the current track.

### `play_music(path, loops=-1, fade_ms=0)`
Plays a music track; returns `True` when playback started. Only one track plays at a time — starting another one replaces it; a new track starts at the volume that was set before.

- `path` (`str`): audio file, relative to the project folder.
- `loops` (`int`): `-1` (default) loops forever, `0` plays once.
- `fade_ms` (`int`): fade-in time in milliseconds.

### `resume_music()`
Continues the current track.

### `set_music_volume(volume)`
Sets the music volume; values outside `0.0`-`1.0` are clamped.

- `volume` (`float`): new music volume, `0.0`-`1.0`.

### `stop_music(fade_ms=0)`
Stops the music.

- `fade_ms` (`int`): fade-out time in milliseconds.
