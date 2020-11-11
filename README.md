# ParagraphJump

ParagraphJump allows the user to navigate swiftly between paragraphs.

## Features

* `paragraphjump.up`: Move up a paragraph
* `paragraphjump.down`: Move down a paragraph
* `paragraphjump.selectup`: Select one paragraph up
* `paragraphjump.selectdown`: Select one paragraph down

## Gettings started

This plugin will automatically be enabled after using one of the commands specified above.

### Keyboard shortcuts

To optimally use this plugin it is recommended to re-map your keybindings. You can do this through the **Keyboard Shortcuts** editor available
through the **Preferences** -> **Keyboard Shortcuts** menu.

My personal bindings for this plugin is displayed below as an example:

```JSON
    {
        "key": "ctrl+up",
        "command": "paragraphjump.up",
        "when": "textInputFocus"
    },
    {
        "key": "ctrl+down",
        "command": "paragraphjump.down",
        "when": "textInputFocus"
    },
    {
        "key": "ctrl+shift+down",
        "command": "paragraphjump.selectdown",
        "when": "textInputFocus"
    },
    {
        "key": "ctrl+shift+up",
        "command": "paragraphjump.selectup",
        "when": "textInputFocus"
    }
```

## Known Issues

None at the time.

## Release Notes

### 1.0.0

First full release with all the intended functionality for the plugin.

### 0.0.1

Initial release including move up and down features
