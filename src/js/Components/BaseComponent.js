export default class BaseComponent {
  constructor() {
    this._listeners = []
  }

  // Установка слушателей на каждый элемент
  _setListeners(listeners) {
    listeners.forEach(listener => {
      this._addListener({...listener});
    });
  }

  // Установка каждого отдельного слушателя
  _addListener({element, event, callback}) {
    element.addEventListener(event, callback);
    this._listeners.push({element, event, callback});
  }

  // Удаление всех слушателей
  _clearListeners() {
    this._listeners.forEach(({element, event, callback}) => {
      element.removeEventListener(event, callback);
    })
  }
}