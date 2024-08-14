export class Card {

  _open = false;
  _success = false;

  constructor(container, cardNumber, flip) {
    this.container = container;
    this.cardNumber = cardNumber;
    this.flip = flip;

    this.createElement()
  }

  createElement() {
    this.card = document.createElement('div');

    this.card.classList.add('card');

    this.card.addEventListener('click', () => {
      if (this.open === false && this.success === false) {
        this.open = true;
      }
      this.flip(this)
    })

    this.container.append(this.card);

    return this.card;
  }

  set cardNumber(value) {
    this._cardNumber = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    this._open = value;
    value ? this.card.classList.add('open') : this.card.classList.remove('open')
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    value ? this.card.classList.add('success') : this.card.classList.remove('success')
  }

  get success() {
    return this._success
  }

}

export class AmazingCard extends Card {

  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip).card.append(this.img)
  }

  set cardNumber(value) {
    this.img = document.createElement('img')
    this._cardNumber = value
    this.img.classList.add('card-img')
    this.img.src = `img/img-${this._cardNumber}.jpg`
    this.img.onerror = () => {
      this.img.src = `img/img-err.jpg`
    }
  }

  get cardNumber () {
    return this._cardNumber;
  }

}

