
/**
 * Tastatur
 */

window.addEventListener('keydown', (event) => {
	if (event.keyCode == 37) {
		keyboard.LEFT = true;
	}

	if (event.keyCode == 38) {
		keyboard.UP = true;
	}

	if (event.keyCode == 39) {
		keyboard.RIGHT = true;
	}

	if (event.keyCode == 68) {
		keyboard.D = true;
	}
});

window.addEventListener('keyup', (event) => {
	if (event.keyCode == 37) {
		keyboard.LEFT = false;
	}

	if (event.keyCode == 38) {
		keyboard.UP = false;
	}

	if (event.keyCode == 39) {
		keyboard.RIGHT = false;
	}

	if (event.keyCode == 68) {
		keyboard.D = false;
	}
});

/**
 * Handy
 */ 

function handleKeyPress(key, isPressed) {
	switch (key) {
	  case 'LEFT':
		keyboard.LEFT = isPressed;
		break;
		case 'RIGHT':
		keyboard.RIGHT = isPressed;
		break;
		case 'UP':
		keyboard.UP = isPressed;
		break;
		case 'D':
		keyboard.D = isPressed;
		break;
	  // Füge weitere Cases hinzu, wenn nötig
	}
  }


