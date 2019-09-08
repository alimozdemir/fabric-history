# fabric-history
Basic undo and redo prototype implementation on Fabric.js

# Setup

```bash
npm i fabric-history
```

Node projects
```javascript
import 'fabric-history';
```

Or html

```html
<script src="//raw.githubusercontent.com/lyzerk/fabric-history/master/index.js"></script>
```

Initialization of the plugin is important, it listening the actions by that event registrations.
Don't call `historyInit` more than once. And don't forget to dispose it.

## Example setup

```
const canvas = new fabric.Canvas('canvas');

// historyInit is registers the events
canvas.historyInit();

// historyDispose is un-register the events
canvas.historyDispose();
```

# Usage

Following commands will undo and redo the canvas.

```
canvas.undo();

canvas.redo();
```

## Example

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fabric with history</title>
</head>
<body>
  <canvas></canvas>
  <script>
    const canvas = new Canvas(document.querySelector('canvas'), {
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
