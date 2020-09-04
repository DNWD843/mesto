/**
 * @module Section
 * @description Класс Section<br>
 * Отвечает за отрисовку элементов на странице
 * Принимает в конструктор объект с данными для создания и отрисовки элементов
 * @param {Object} Object   - { items, renderer } - объект с данными для отрисовки элементов на странице 
 * @param {Array} Object.items - Массив объектов, содержащих данные, для создания элементов
 * @param {Function} Object.renderer - Коллбэк, создающий элемент и размещающий созданный элемент на странице.<br>
 * Принимает на вход объект item с данными для создания элемента.
 * @param {String} containerSelector - Селектор контейнера, в который будут размещаться элементы
 * @example
 * const container = new Section({
 *   items: [{object1}, {object2}, {object3}],
 *   renderer: someCallback(item)               //где item - объект с данными для создания элемента
 * }, '.someSelector');                         //селектор контейнера
 */

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._toContainer = document.querySelector(containerSelector);
  }

  /**
   * @description Публичный метод<br>
   * Создает элементы и размещает их на странице<br>
   * Вызывается один раз для отрисовки всех элементов. 
   * @public 
   */
  render() {
    this._items.forEach((item) => {
      this._renderer(item, this._toContainer);
    });
  }

  /**
   * @description Публичный метод<br>
   * Добавляет элемент на страницу<br>
   * Вызывается каждый раз, когда необходимо добавить элемент на страницу
   * @public
   * @param {HTMLElement} domElement - элемент (DOM-нода), который необходимо добавить на страницу 
   */
  addItem(domElement) {
    this._toContainer.prepend(domElement);
  }
}