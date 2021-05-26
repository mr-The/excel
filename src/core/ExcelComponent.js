import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store || []
    this.unsubscribers = []

    this.prepare()
  }

  // Настраиваем компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    const unsub = this.emitter.emit(event, ...args)
    this.unsubscribers.push(unsub)
  }

  // Подписываемся на событие event
  $on(event, fn) {
    this.emitter.subscribe(event, fn)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Сюда приходят только изменения по тем полям, на которые мы подписались
  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners()
  }

  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
