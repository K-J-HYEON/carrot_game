'use strict'
// export하면 class를 바깥으로 노출시키는 것이다.
// html파일에 type=module라고 지정해줘야 한다.
export default class PopUp {
    constructor() {
        // class이기 때문이 const => this(각각의 DOM요소에서 ~주황색깔 받아온다.)
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        // popUp내부에서 refresh 버튼의 클릭이 발생하면 등록된 콜백이 있다면
        // onclick을 호출해주고 PopUp 자체를 없애준다.
        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        })

    }

    // 호출해다오로 인해서 onClick에 이 클릭이 할당이된다.
    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }

    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}

// 정리하면 main.js에 있는 팝업에 관련된 아이들을 뽑아다가
// popoup.js에 정의했다.
// 클래스를 이용해서 popup이라는 클래스 안에 ~정의하고
// 팝업은 자신의 DOM요소를 가져와서
// showWithText라는 API를 사용자가 호출하면 받아온 텍스트를
// 팝업창에 보여주게 되고
// 사용자가 onclick이라는 clickListener을 등록해놓으면
// 팝업의 버튼이 클릭될 때 마다 그 등록된 콜백함수를 호출해 주는 역할을 한다.
// 결론=? PopUp이라는 class는 팝업에 관련된 로직들만
// 신경쓴다.js에
