// 맨 처음에 시작하고 나서 클릭이 안됨.
// 시작하고 정지버튼 누르면 시간 5초인데 실패메세지 뜸
// gameBtn.addEventListener('click', () => { ~ 이부분에서
// started = !started; 주석처리 해주니까 제대로 된다.
'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js'
import { GameBuilder, Reason } from './game.js'


// const CARROT_COUNT = 20;
// const BUG_COUNT = 20;
// const GAME_DURATION_SEC = 20;



const gameFinishBanner = new PopUp();
const game = new GameBuilder()
	.gameDuration(5)
	.carrotCount(3)
	.bugCount(3)
	.build();


game.setGameStopListener(reason => {
    let message;
    switch (reason) {
        case Reason.cancel:
            message = 'Replay❓';
						sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WON 🎉';
						sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST 💢'
						sound.playBug();
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
});










