'use strict';

// 필드클래스만들기 망함


import * as sound from './sound.js'

const CARROT_SIZE = 80;



export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug',
});





export class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        // 필드에서 아이템 클릭이 되면 콜백함수가 호출된다.

        // onClick함수 니는 바인딩이 되어야 한다.
        // 클래스와 함수를 바인딩한 아이를 다시 onClick에다가 할당한다.
        // this.onClick = this.onClick.bind(this);

        this.field.addEventListener('click', this.onClick);
    }

    init() {
        this.field.innerHTML = '';
        this._addItem('carrot', this.carrotCount, 'img/carrot.png');
        this._addItem('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    // 프라이빗한 아이인 것을 알 수 있도록
    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }



    onClick = (event) => {
        const target = event.target;
        if (target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick(ItemType.carrot);
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    };
}


function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}



