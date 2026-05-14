---
title: Installation
---

This guide will walk you through installing **Pygame Studio** and verifying the installation on your system.

## Prerequisites
Ensure you have **Python 3.9 or higher** installed on your machine.

You can check your Python version by running this command in your terminal:

```bash
python --version
```

## Install Pygame Studio
Open your **terminal** and run the following **pip command**:

```bash
pip install --upgrade pygamestudio
```

> **Note:** Since current releases are development versions, please include --upgrade to ensure pip installs the latest development version instead of an older cached one.

This command will automatically download and install the latest stable version of Pygame Studio and all required dependencies.

| Name | Version |
|-----|-----|
| pygame-ce | >=2.5.6 |
| PySide6 | >=6.10.0 | 
| platformdirs | >=3.5.1 | 
| numpy | >=1.26.0 | 
| pyinstaller | >=6.18.0 | 

## Verify the Installation
After installation, run the following command in your terminal:

```bash
pygamestudio
```

Or use the shortcut command:

```bash
pygs
```

If the Pygame Studio editor launches successfully, your installation is complete.

![Pygame Studio Dashboard](../../../assets/images/doc/dashboard.png)

## Next Steps
Once installed, you’re ready to start creating projects with Pygame Studio!