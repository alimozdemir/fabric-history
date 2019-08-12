# fabric-history
Basic undo and redo prototype implementation on Fabric.js

# Setup

```
npm i fabric-history
```

Node projects
```javascript
import 'fabric-history';
```

Or html
```html
<script src="https://raw.githubusercontent.com/lyzerk/fabric-history/master/index.js"></script>
```

Initialization of the plugin is important, it listening the actions by that event registrations.
Don't call `historyInit` more than once. And don't forget to dispose it.

## Example setup
```
var canvas = new fabric.Canvas('canvas');

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