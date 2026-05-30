---
title: Release Notes
---

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