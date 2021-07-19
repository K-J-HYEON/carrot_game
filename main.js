// 맨 처음에 시작하고 나서 클릭이 안됨.
// 시작하고 정지버튼 누르면 시간 5초인데 실패메세지 뜸
// gameBtn.addEventListener('click', () => { ~ 이부분에서
// started = !started; 주석처리 해주니까 제대로 된다.
'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;



const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');


const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');



const carrotSound = new Audio('./sound/carrot_pull.mp3')
const alertSound = new Audio('./sound/alert.wav')
const bgSound = new Audio('./sound/bg.mp3')
const bugSound = new Audio('./sound/bug_pull.mp3')
const winSound = new Audio('./sound/game_win.mp3')


let started = false;
let score = 0;
let timer = undefined;


// 이벤트위임을 이용하자
// field.addEventListener('click', (event) => onFieldClick(event)); 이것을
field.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
    // started = !started;
});


popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopUp();
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('REPLAY❓')
    playSound(alertSound);
    stopSound(bgSound)
}

// 당근 다 체크했는데 숫자 안깍이고 메세지도 안나온다.
function finishGame(win) {
    started = false;
    hideGameButton();
    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpWithText(win ? 'YOU WON 💥' : 'YOU LOST 💢');
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas')
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}



function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}


// 시간이 안나옴,
// 왜냐 fuction startGame()함수에 startGameTimer(); 안넣어줬기 때문
function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}


function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}


// 메세지 안나옴
// 왜냐 function hideGameBuntton()의 함수를 안줬기 때문
function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
    popUp.classList.add('pop-up--hide');
}


function initGame() {
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    // 벌레와 당근을 생성한뒤 field에 추가해줌
    // console.log(fieldRect);
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        // 당근!!
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            // API에서 boolean으로 하는 것은 좋지않다.
            finishGame(true);
        }
    } else if (target.matches('.bug')) {
        // stopGameTimer();
        finishGame(false);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

