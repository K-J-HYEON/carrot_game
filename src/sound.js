const carrotSound = new Audio('./sound/carrot_pull.mp3')
const alertSound = new Audio('./sound/alert.wav')
const bgSound = new Audio('./sound/bg.mp3')
const bugSound = new Audio('./sound/bug_pull.mp3')
const winSound = new Audio('./sound/game_win.mp3')


// 사용자가 어떤 사운드를 재생해야 되는지 일일히 인자를 전달하지 않아도 되게
// 유용한 함수를 만들어본다.

export function playCarrot() {
    playSound(carrotSound);
}

export function playBug() {
    playSound(bugSound);
}


export function playAlert() {
    playSound(alertSound);
}


export function playWin() {
    playSound(winSound);
}

export function playBackground() {
    playSound(bgSound);
}

export function stopBackground() {
    stopSound(bgSound);
}


function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}