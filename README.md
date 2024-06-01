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

## Excluding Objects
Objects can be excluded from history by setting the excludeFromExport property to true on the object. This prevents any history records for actions involving this object.

```javascript
const text = new fabric.Text('Hello', {
  excludeFromExport: true // This object will not be recorded in history.
});
canvas.add(text);
```
Caution: doing this will also exclude this object from exporting to JSON/Object.

# Example (only for demo purposes)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fabric with history</title>
</head>
<body>
  <canvas style="border:1px solid black;" width="800" height="400"></canvas>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.4.0/fabric.min.js"></script>
  <script src="https://alimozdemir.com/fabric-history/src/index.js"></script>

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
