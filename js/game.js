let maximalTableSize = window.innerWidth <= 1024 || (window.innerHeight <= 1024 && window.innerWidth <= 768);
let canvas = document.getElementById('canvas');
let world;
let keyboard;
let levelRunning = false;
let fullScreen = false;
let soundsOn = true;
let openMenu = false;
let intervallIds = [''];
let gameGuideOpen = false;
let originalCanvasWidth = canvas.width;
let originalCanvasHeight = canvas.height;

function init() {
	keyboard = new Keyboard();
	canvas;
	world = new World(canvas, keyboard);
}

/**
 * Starte Spiel und zurücksetzten von Spiel
 */
function startGame() {
	stopAllIntervals();
	setsScreen();
	initLevel1();
	init();
    document.getElementById('restart').classList.add('d-none');
}

/**
 * Start, end und loos Screen verbergern
 */
function setsScreen() {
	document.getElementById('startScreen').classList.add('d-none');
	document.getElementById('endScreen').classList.add('d-none');
	document.getElementById('loosesEndScreen').classList.add('d-none');
    document.getElementById('turn').classList.add('d-none');
}

/**
 * Musik an und ab
 * @param {boolean} soundsOn
 */
function toggleSounds() {
	soundsOn ? (soundsOn = false) : (soundsOn = true);
	toggleSoundButton();
}

function toggleSoundButton(){
    if(soundsOn){
        document.getElementById('soundOnIcon').classList.remove('d-none');
    } else{
        document.getElementById('soundOnIcon').classList.add('d-none');
    }
}



//FULLSCREEN//

/**
 * Umschalten auf Fullscreen
 * @param {fullScreen} is a boolean
 */

let isFullscreen = false; // Variable, um den Vollbildmodus-Status zu speichern

function openFullscreen() {
    let elem = document.getElementById('fullscreen'); // Dieses Element ermöglicht den Vollbildmodus für das gesamte Dokument
    
    if (!isFullscreen) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { // Safari
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE11
            elem.msRequestFullscreen();
        }

        canvas.width = window.innerWidth;
        isFullscreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        // Setze die Canvas-Größe auf den ursprünglichen Wert
        canvas.width = originalCanvasWidth; // Setze originalCanvasWidth auf den ursprünglichen Wert vor dem Vollbildmodus
        isFullscreen = false;
    }
    toggleFullscreenButton();
}

function toggleFullscreenButton(){
    if(!isFullscreen){
        document.getElementById('fullscreenIcon').classList.remove('d-none');
    } else{
        document.getElementById('fullscreenIcon').classList.add('d-none');
    }
}

/**
 * Setintervall wird mit der variable fn und time gefühlt, 
 * die id wird an intervallid weiter gegeben und clearInterval stopt dann alle 
 * intervale.
 * @param {function} fn
 * @param {number} time
 */
function setStoppableInterval(fn, time) {
	let id = setInterval(fn, time);
	intervallIds.push(id);
}

function stopAllIntervals() {
	intervallIds.forEach((id) => {
		clearInterval(id);
	});
}
