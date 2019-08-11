
fabric.Canvas.prototype.historyUndo = []
fabric.Canvas.prototype.historyRedo = []

fabric.Canvas.prototype.historyNext = function () {
  return JSON.stringify(this.toDatalessJSON(this.extraProps));
}

fabric.Canvas.prototype.historyInit = function () {
  this.historyUndo = [];
  this.historyRedo = [];
  this.historyNextState = this.historyNext();

  this.on({
    "object:added": this.historySaveAction,
    "object:removed": this.historySaveAction,
    "object:modified": this.historySaveAction
  })

}

fabric.Canvas.prototype.historyDispose = function () {
  this.off({
    "object:added": this.historySaveAction,
    "object:removed": this.historySaveAction,
    "object:modified": this.historySaveAction
  })
}

fabric.Canvas.prototype.historySaveAction = function () {
  if (this.historyProcessing)
    return;

  const json = this.historyNextState;
  this.historyUndo.push(json);
  this.historyNextState = this.historyNext();
}

fabric.Canvas.prototype.undo = function () {
  // The undo process will render the new states of the objects
  // Therefore, object:added and object:modified events will triggered again
  // To ignore those events, we are setting a flag.
  this.historyProcessing = true;

  const history = this.historyUndo.pop();
  if (history) {
    // Push the current state to the redo history
    this.historyRedo.push(this.historyNext());

    this.loadFromJSON(history).renderAll();
  }

  this.historyProcessing = false;
}

fabric.Canvas.prototype.redo = function () {
  // The undo process will render the new states of the objects
  // Therefore, object:added and object:modified events will triggered again
  // To ignore those events, we are setting a flag.
  this.historyProcessing = true;
  const history = this.historyRedo.pop();
  if (history) {
    // Every redo action is actually a new action to the undo history
    this.historySaveAction();
    
    this.loadFromJSON(history).renderAll();
  }

  this.historyProcessing = false;
}
