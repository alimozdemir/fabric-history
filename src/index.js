fabric.util.object.extend(fabric.Canvas.prototype, {
  initialize: function(options) {
    options || (options = { });

    this._historyInit();
    this.callSuper('initialize', options);
    console.log(this.callSuper)
  },
  dispose: function(options) {
    options || (options = { });

    this._historyDispose();
    this.callSuper('initialize', options);
  },
  _historyNext: function () {
    return JSON.stringify(this.toDatalessJSON(this.extraProps));
  },
  _historyEvents: function() {
    return {
      "object:added": this._historySaveAction,
      "object:removed": this._historySaveAction,
      "object:modified": this._historySaveAction,
      "object:skewing": this._historySaveAction
    }
  },
  _historyInit: function () {
    this.historyUndo = [];
    this.historyRedo = [];
    this.historyNextState = this._historyNext();
    
    this.on(this._historyEvents());
  },
  _historyDispose: function () {
    this.off(this._historyEvents())
  },
  _historySaveAction: function () {

    if (this.historyProcessing)
      return;
  
    const json = this.historyNextState;
    this.historyUndo.push(json);
    this.historyNextState = this._historyNext();
    this.fire('history:append', { json: json });
  },
  undo: function () {
    // The undo process will render the new states of the objects
    // Therefore, object:added and object:modified events will triggered again
    // To ignore those events, we are setting a flag.
    this.historyProcessing = true;
  
    const history = this.historyUndo.pop();
    if (history) {
      // Push the current state to the redo history
      this.historyRedo.push(this._historyNext());
  
      this.loadFromJSON(history).renderAll();
      this.fire('history:undo');
    }
  
    this.historyProcessing = false;
  },
  redo: function () {
    // The undo process will render the new states of the objects
    // Therefore, object:added and object:modified events will triggered again
    // To ignore those events, we are setting a flag.
    this.historyProcessing = true;
    const history = this.historyRedo.pop();
    if (history) {
      // Every redo action is actually a new action to the undo history
      this.historyUndo.push(this._historyNext());
      
      this.loadFromJSON(history).renderAll();
      this.fire('history:redo');
    }
  
    this.historyProcessing = false;
  },
  clearHistory: function() {
    this.historyUndo = [];
    this.historyRedo = [];
    this.fire('history:clear');
  }
});