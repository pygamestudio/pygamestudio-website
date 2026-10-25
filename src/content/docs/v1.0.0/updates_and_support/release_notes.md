---
title: Release Notes
---
## [v1.0.1](https://pypi.org/project/pygamestudio/1.0.1/) - 2026.10.07
### New Features
- Add keyframe animation object
- Add animation editor
- Add audio clipping function
- Add transform anchor point, anchor position can be set in the property inspector
- Add empty node object

### Optimizations
- Optimize loading speed and runtime performance for web packaging
- Optimize image editor with pixel drawing capability
- Optimize AI assistant, support saving session history locally
- Optimize child object display in scene editor: child objects moved outside parent can be rendered normally

### Bug Fixes
- Fix abnormal window stretching issue
- Fix MCP cannot save scene when no scene file exists

<br>

## [v1.0.0](https://pypi.org/project/pygamestudio/1.0.0/) - 2026.09.27
### New Features
1. The editor default language automatically follows the system language.
2. Added new Web platform build function.
3. Added new AI Assistant.
4. Added window menu items to toggle visibility of each window.
5. Added new Block Editor.
6. Added new Slider object.
7. Added new ProgressBar object.
8. Added new Tilemap object and Tilemap Editor.
9. Added new Text Input object.
10. Added auto-save project feature while running the game.

### Optimizations
1. Optimized all window components to support popping up as separate windows.
2. Optimized desktop application build function.
3. Scene Editor: Objects can still be displayed when dragged outside the scene view.

<br>

## [v1.0.0.dev7](https://pypi.org/project/pygamestudio/1.0.0.dev7/) - 2026.09.06
### New Features
- Added smart guide lines feature in the scene window
- Added refresh button in the scene window
- Added built‑in audio player
- Added built‑in image editor
- Added built‑in code editor
- Added collision detection feature

### Optimizations
- Optimized marquee‑selection behavior in scene window, Canvas node is excluded from selection

<br>

## [v1.0.0.dev6](https://pypi.org/project/pygamestudio/1.0.0.dev6/) - 2026.08.29
### New Features
- Support attaching scripts to objects for custom logic control. Developers can select and add scripts within the property inspector window
- Added audio manager
- New projects include a default audio asset for beginners' learning and testing
- Added more available interfaces for all scene objects

### Optimizations
- Improved prompt for unsaved scene changes
- Game runtime logs are output to the console window in real‑time
- Optimized project and file deletion logic: deleted projects are moved to recycle bin instead of permanent removal

### Bug Fixes
- Fixed window resizing bug
- Fixed undo bug where only a small offset was reverted after moving objects
- Fixed bug of creating new files under collapsed folders in resource manager
- Fixed exception bug when Dashboard attempts to delete a non‑existent project
- Fixed bug where RGB values changed while adjusting hue in color picker
- Fixed bug that input boxes inside color picker cannot gain input focus


<br>

## [v1.0.0.dev5](https://pypi.org/project/pygamestudio/1.0.0.dev5/) - 2026.06.21
### New Features
- Added button object
- Added shortcuts in property panel to switch among selected objects
- Added custom color picker with alpha transparent channel support

### Optimizations
- Refactored template main.py code, built-in lifecycle and event callbacks to simplify development workflow
- Adjusted Gizmo position to prevent covering object highlight border

<br>

## [v1.0.0.dev4](https://pypi.org/project/pygamestudio/1.0.0.dev4/) - 2026.06.01
### Bug Fixes
- Fixed a critical bug in v1.0.0.dev3. [(#1)](https://github.com/pygamestudio/pygamestudio/issues/1)

<br>

## [v1.0.0.dev3](https://pypi.org/project/pygamestudio/1.0.0.dev3/) - 2026.05.30
### New Features
- Added light theme
- Added image object
- Added multi-selection box feature in the scene editor
- Text objects now fully support Chinese display
- A font folder will be automatically created in the project directory after creating a new project, containing the SIMHEI.ttf font file

### Optimizations
- Added timestamps to all log outputs
- Optimized the style of non-editable input controls in the property editor
- Fixed styling issues of QComboBox on Linux and MacOS

### Bug Fixes
- Fixed the issue where Gizmo position failed to update when moving line objects
- Fixed the window dragging problem on Linux
- Fixed the bug that `get_object_by_path` could not locate objects by given path
- Fixed the progress bar rebound issue during project packaging

<br>

## [v1.0.0.dev2](https://pypi.org/project/pygamestudio/1.0.0.dev2/) - 2026.05.15
### New Features
- Added one-click desktop application packaging function, which can package the project into an independent executable file. Other users can run the game directly without installing the Python environment.
- Added line drawing object to enrich scene editing elements.
- Added move Gizmo controller to support visual drag-and-drop movement of scene objects.
- Added `get_object_by_path` interface to support precise acquisition of specified objects in the scene through paths.
- Added release notes entry in the help menu bar for easy viewing of version iteration records.

### Optimizations
- Optimized the layout of the new project window to improve operational interaction experience.
- Optimized the initial code of `main.py` in the project template, with a more standardized structure and stronger usability.

### Bug Fixes
- Fixed the issue of incorrect mouse pointer style display in some windows.
- Fixed the bug that project deletion failed in the Dashboard panel.
---

<br>

## [v1.0.0.dev1](https://pypi.org/project/pygamestudio/1.0.0.dev1/) - 2026.05.05
### New Features
- Completed the construction of the basic visual editing interface, including core panels such as hierarchy window, asset window, scene window, console window, and inspector window.
- Supported the creation of three basic editable objects: rectangle, ellipse, and text.
- Realized support for three major operating systems: Windows, macOS, and Linux.
- Added project creation and management functions to support independent project engineering management.
- Integrated real-machine running preview function to view the project running effect in real time.
- Added interface language switching function, supporting free switching between Simplified Chinese and English.