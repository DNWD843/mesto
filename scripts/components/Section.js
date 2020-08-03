export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._toContainer = document.querySelector(containerSelector);
  }

  render() {
    this._items.forEach((item) => {
      this._renderer({ title: item.name, link: item.link }, this._toContainer);
    });
  }

  addItem(domElement) {
    this._toContainer.prepend(domElement);
  }



}