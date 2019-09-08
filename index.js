import fabric from 'fabric'

export default class Canvas extends fabric.Canvas {
  constructor (el, options) {
    super(el, options)

    this._undoList = []
    this._redoList = []
    this._nextState = this._historyNext()

    this.on({
      'object:added': this._saveHistory,
      'object:removed': this._saveHistory,
      'object:modified': this._saveHistory
    })
  }

  _historyNext () {
    return JSON.stringify(this.toDatalessJSON(this.extraProps))
  }

  _historyDispose () {
    this.off({
      'object:added': this._saveHistory,
      'object:removed': this._saveHistory,
      'object:modified': this._saveHistory
    })
  }

  _saveHistory () {
    if (this._isProcessing) {
      return
    }

    this._undoList.push(this._nextState)

    this._nextState = this._historyNext()
  }

  undo () {
    this._isProcessing = true

    const history = this._undoList.pop()

    if (history) {
      this._redoList.push(this._historyNext())
      this.loadFromJSON(history).renderAll()
    }

    this._isProcessing = false
  }

  redo () {
    this._isProcessing = true

    const history = this._redoList.pop()

    if (history) {
      this._saveHistory()
      this.loadFromJSON(history).renderAll()
    }

    this._isProcessing = false
  }
}
