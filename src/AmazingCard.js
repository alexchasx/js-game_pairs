import Card from './Card.js';

export default class AmazingCard extends Card {
  static DEFAULT_IMAGE = './img/default.svg';

  _defineFace(face) {
    const url = `./img/${this._cardNumber}.svg`;

    // <img> только для проверки на загрузку, а используется "background-image"
    let preloaderImg = document.createElement('img');
    preloaderImg.src = url;

    preloaderImg.onerror = () => {
      preloaderImg = null;
      face.style.backgroundImage = `url(${AmazingCard.DEFAULT_IMAGE})`;

      throw new Error('Ошибка загрузки ' + url);
    };

    face.style.cssText = `
      background-image: url(${url});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    `;
  }
}
