# fabric-history

[![npm](https://img.shields.io/npm/v/fabric-history)](https://www.npmjs.com/package/fabric-history) ![npm](https://img.shields.io/npm/dw/fabric-history)

Fabric.js history implementation

# Setup

## Node projects
```bash
npm i fabric-history
```

```javascript
import 'fabric-history';
```

## HTML

```html
<script src="https://raw.githubusercontent.com/lyzerk/fabric-history/master/src/index.js"></script>
```

# Usage

Following commands will undo and redo the canvas.

```javascript
canvas.undo();

canvas.redo();
```

# Example

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fabric with history</title>
</head>
<body>
  <canvas></canvas>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.4.0/fabric.min.js"></script>
  <script src="//raw.githubusercontent.com/lyzerk/fabric-history/master/src/index.js"></script>

  <script>
    const canvas = new fabric.Canvas(document.querySelector('canvas'), {
      isDrawingMode: true
    })

    document.addEventListener('keyup', ({ keyCode, ctrlKey } = event) => {
      // Check Ctrl key is pressed.
      if (!ctrlKey) {
        return
      }

      // Check pressed button is Z - Ctrl+Z.
      if (keyCode === 90) {
        canvas.undo()
      }

      // Check pressed button is Y - Ctrl+Y.
      if (keyCode === 89) {
        canvas.redo()
      }
    })
    </script>
</body>
</html>
```

You can find an advanced example on demo folder.

# Events

- history:append
  - Fired when a history appended to stack
- history:undo
  - Fired when an undo process is happening
- history:redo
  - Fired when a redo process is happening
- history:clear
  - Fired when whole history cleared

# Callbacks


```javascript
canvas.undo(function() { 
  console.log('post undo');
});

canvas.redo(function() { 
  console.log('post redo');
});
```

# Functions

- undo
- redo
- clearHistory
