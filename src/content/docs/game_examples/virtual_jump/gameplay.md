---
title: Score, Failure & Restart
description: Collecting fruit with the engine's collision detection, the score text, freezing the player and the restart flow.
---

The three "state" jobs of the game all live in `game_manager.py`: collision results, the score, and failure / restart.

![Scoring and the restart button](/images/doc/virtual_jump_gameplay.png)

## Collision detection: scripts only set flags

The player, the bullets and the fruit all turn on **collision detection** with a hit box slightly smaller than the sprite (forgiving gameplay). When the engine detects a hit it calls the other object's `on_collision_enter()`:

```python
    # bullet.py - touching the player only records a flag
    def on_collision_enter(self, other):
        manager = self._manager()
        if manager is not None and manager.is_player(other):
            self.hit_player = True
```

The manager processes those flags **on the next frame**:

```python
    def _update_dynamic(self):
        # a bullet hit -> game over
        for bullet in self._live(self.BULLET_PREFIX):
            if self._flag(bullet, "hit_player"):
                self._game_over()
                return
        # fruit collected -> score + sound + destroy
        for apple in self._live(self.APPLE_PREFIX):
            if self._flag(apple, "collected"):
                self.add_score(self.APPLE_SCORE)
                self._play_sound(self.GET_SOUND)
                self._destroy_object(apple)
```

:::tip
**Never destroy an object inside `on_collision_enter`** - the callback runs while the engine is walking its object list. Set a flag and handle it on the next frame; that is always safe.
:::

## The score text

The score is just a `Score` text object; scoring refreshes its text:

```python
    SCORE_FORMAT = "%d"          # change it to "Score: %d" if you like

    def add_score(self, amount=1):
        if self.game_over:
            return
        self.score += int(amount)
        self.score_text.set_text(self.SCORE_FORMAT % self.score)
```

## Failure

A bullet hit ends the game: spawning stops, the field is cleared, the player is **frozen**, the restart button appears, and a failure sound plays:

```python
    def _game_over(self):
        self._play_sound('./audio/fail.mp3')
        self.game_over = True
        self._clear_dynamic()          # remove every bullet and fruit
        self._freeze_player(True)      # player.frozen = True - stands still
        self.restart.show()
```

With `game_over` set, `on_update` skips spawning and judging entirely - the scene goes quiet and waits.

## Restart

Both paths lead to the same `_restart()`: clicking the **Restart** button (plays `click.mp3`), or pressing **R / Enter** (a silent restart):

```python
    def _restart(self, clicked=False):
        self._clear_dynamic()
        self.player.x, self.player.y = self.player_start      # back to the spawn point
        self.player.set_scale_x(self.player_scale_x)          # sprite faces right again
        self._freeze_player(False)
        self._player_script().reset()                         # clear jump / dash state
        self.restart.hide()
        self.score = 0
        self.game_over = False
        if clicked:
            self._play_sound(self.CLICK_SOUND)
```

The button click is forwarded to the manager by `restart_button.py`; the script also keeps a fallback - a left mouse button pressed inside the button's rectangle counts as a click too.

:::tip
On restart the player script re-syncs its facing with the node's **real `scale_x`**: `set_scale_x()` writes the property directly and the script is not notified, so without the re-sync the sprite would "remember" the previous round's facing.
:::
