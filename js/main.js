import {Card, AmazingCard} from './index.js'


let firstClick = null;
let secondClick = null;

class CardList {

  arrNumbres = [];

  constructor(container) {
    this.container = container;


    this.createCardList()
  }

  createCardList() {
    this.listCard = document.createElement('div');
    const title = document.createElement('h1');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');

    title.textContent = 'Игра впары';
    input.placeholder = 'Введите количество карточек';
    button.textContent = 'Начать игру!';

    input.type = 'number';

    this.listCard.classList.add('game');
    button.classList.add('btn', 'btn-primary');
    input.classList.add('form-control');
    form.classList.add('input-group', 'mb-3');

    form.addEventListener('submit', e => {
      e.preventDefault();

      this.arrNumbres = [];

      if (input.value % 2 !== 0 || input.value < 4 || input.value > 12) {
        input.value = 4;
      }
      switch (input.value) {
        case '4':
          this.listCard.style.width = '320px'
          break;
        case '6':
          this.listCard.style.width = '510px'
          break;
        case '8':
          this.listCard.style.width = '680px'
          break;
        case '10':
          this.listCard.style.width = '800px'
          break;
        case '12':
          this.listCard.style.width = '680px'
          break;
      }

      for (let i = 1; i <= input.value / 2; i++) {
        this.arrNumbres.push(i);
        this.arrNumbres.push(i);
      }

      this.gameCreation(this.arrNumbres.sort(() => Math.random() - 0.5))

      input.value = ''
    })

    buttonWrapper.append(button);
    form.append(input, buttonWrapper)
    this.container.append(title, form, this.listCard);

    return this.listCard;
  }

  flip(card) {
    if (firstClick && secondClick) {
      if (firstClick.cardNumber !== secondClick.cardNumber) {
        firstClick.open = false;
        secondClick.open = false;
        secondClick = null;
        firstClick = null;
      }
    }

    if (!firstClick) {
      firstClick = card;
    } else {
      if (!secondClick) {
        secondClick = card;
      }
    }

    if (firstClick && secondClick) {
      if (firstClick.cardNumber === secondClick.cardNumber) {
        firstClick.success = true;
        secondClick.success = true;
        secondClick = null;
        firstClick = null;
      }
    }
    if (document.querySelectorAll('.card.success').length === document.querySelectorAll('.card').length) {
      setTimeout(() => {
        alert('Победа!');
        document.getElementsByClassName('button-wrap')[0].style.display = 'flex';
      }, 300)

    }
  }

  gameCreation(arr) {
    this.listCard.innerHTML = ''
    for (const num of arr) {
      new AmazingCard(this.listCard, num, this.flip)
    }
  }
}
new CardList(document.getElementById('game'));
document.getElementsByClassName('button-wrap')[0].addEventListener('click', () => {
  document.getElementById('game').innerHTML = '';
  document.getElementsByClassName('button-wrap')[0].style.display = 'none'
  new CardList(document.getElementById('game'));
})
