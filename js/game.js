let canvas;
let world;
let keyboard = new Keyboard();
let background_Music = new Audio('./audio/background_music.mp3');
background_Music.volume = 0.2;
background_Music.loop = true;
let master_sound = false;
let GAME_INTERVALS = [];
lost_sound = new Audio('./audio/pepe_death.mp3');
win_sound = new Audio('./audio/win.mp3');


function playBackgroundMusic() {
    if (master_sound) {
        background_Music.play();
    } else {
        background_Music.pause();
    }
}


function pushInterval(interval) {
    GAME_INTERVALS.push(interval);
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    GAME_INTERVALS = [];
}


function init() {
    initLevel();
    startTouchEvent();
    endTouchEvent();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('canvas-container').classList.remove('d-none');
}


function restart() {
    init();
    document.getElementById('end-screen').classList.add('d-none');
    playBackgroundMusic();
}


function openImprint() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('imprint').classList.remove('d-none');
}


function closeImprint() {
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('imprint').classList.add('d-none');
}


function muteAll() {
    document.getElementById('unmute').classList.add('d-none');
    document.getElementById('mute').classList.remove('d-none');
    document.getElementById('ingame-audio').classList.add('d-none');
    document.getElementById('ingame-mute').classList.remove('d-none');
    master_sound = false;
    playBackgroundMusic();
}


function unmuteAll() {
    document.getElementById('unmute').classList.remove('d-none');
    document.getElementById('mute').classList.add('d-none');
    document.getElementById('ingame-audio').classList.remove('d-none');
    document.getElementById('ingame-mute').classList.add('d-none');
    master_sound = true;
    playBackgroundMusic();
}


function showEndscreen(result) {
    background_Music.pause();
    document.getElementById('canvas-container').classList.add('d-none');
    document.getElementById('end-screen').classList.remove('d-none');
    setBackgroundImage(result);
}


function setBackgroundImage(result) {
    if (result == 'win') {
        document.getElementById('end-screen').style.backgroundImage = "url('./img/9_intro_outro_screens/game_over/game over.png')";
        if (master_sound) {
            win_sound.play();
        }
    } if (result == 'lost') {
        document.getElementById('end-screen').style.backgroundImage = "url('./img/9_intro_outro_screens/game_over/oh no you lost!.png')";
        if (master_sound) {
            lost_sound.play();
        }
    }
}


function backToMenu() {
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
    playBackgroundMusic();
}


window.addEventListener("keydown", (e) => {
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.key == 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.key == ' ') {
        keyboard.SPACE = true;
    }
    if (e.key == 'd')
        keyboard.D = true;
});


window.addEventListener("keyup", (e) => {
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.key == 'ArrowUp') {
        keyboard.UP = false;
    }
    if (e.key == ' ') {
        keyboard.SPACE = false;
    }
    if (e.key == 'd')
        keyboard.D = false;
});


function startTouchEvent() {
    document.getElementById('touch-left').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('touch-right').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('touch-jump').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('touch-throw').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
}


function endTouchEvent() {
    document.getElementById('touch-left').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('touch-right').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('touch-jump').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('touch-throw').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}