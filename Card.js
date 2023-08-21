export default class Card {
  constructor(container, cardNumber, flip) {
    this.container = container;
    this._cardNumber = cardNumber;
    this.flip = flip;
  }

  set cardNumber(value) {
    this._cardNumber = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  _defineFace(face) {
    face.textContent = this._cardNumber;
  }

  createElement(inputData) {
    this.cardElement = document.createElement('div');
    this.cardElement.classList.add('card', 'size-' + inputData);
    this.cardElement.setAttribute('data-number', this._cardNumber);

    const face = document.createElement('div');
    face.classList.add('face');
    this._defineFace(face);
    this.cardElement.append(face);

    const shirt = document.createElement('div');
    shirt.classList.add('shirt');
    this.cardElement.append(shirt);

    this.container.append(this.cardElement);

    this.cardElement.addEventListener('click', () => {
      this.flip(this);
    });
  }

  open() {
    this.cardElement.classList.add('flip');
  }
}
