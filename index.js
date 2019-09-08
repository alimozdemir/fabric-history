import fabric from 'fabric'

export default class Canvas extends fabric.Canvas {
  constructor (el, options) {
    super(el, options)

    this._undoList = []
    this._redoList = []
    this._nextState = this._historyNext()

    this.on({
      'object:added': this._historySave,
      'object:removed': this._historySave,
      'object:modified': this._historySave
    })
  }

  _historyNext () {
    return JSON.stringify(this.toDatalessJSON(this.extraProps))
  }

  _historyDispose () {
    this.off({
      'object:added': this._historySave,
      'object:removed': this._historySave,
      'object:modified': this._historySave
    })
  }

  _historySave () {
    if (this._isProcessing) {
      return
    }

    const json = this._nextState

    this._undoList.push(json)
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
      this._historySave()
      this.loadFromJSON(history).renderAll()
    }

    this._isProcessing = false
  }
}
