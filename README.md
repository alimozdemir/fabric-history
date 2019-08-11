# fabric-history
Basic undo and redo prototype implementation on Fabric.js

# Setup

```
future npm command
```

```
var canvas = new fabric.Canvas('canvas');

// historyInit is registers the events
canvas.historyInit();

// historyDispose is un-register the events
canvas.historyDispose();


```


# usage
```
canvas.undo();

canvas.redo();

```