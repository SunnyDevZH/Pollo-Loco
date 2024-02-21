class ThrowableObjects extends MovableObject {
	groundPosition = 320;
	speedY = 50;

	offset = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	IMAGES_FLYING_BOTTLES = [
		'./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
		'./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
		'./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
		'./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
	];

	constructor(x, y) {
		super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
		this.loadImages(this.IMAGES_FLYING_BOTTLES);
		this.x = x;
		this.y = y;
		this.width = 90;
		this.height = 90;
		this.throw();
		this.bottleBeingThrownAnimation();
	}

	/**
	 * Funktion für die Geschwindigkeit von Wurf
	 */
	throw() {
		this.speedY = this.speedY;
		this.applyGravity();
		this.playInterval = setStoppableInterval(this.throwToRightSide.bind(this),120);
	}

	throwToRightSide() {
		this.x += this.speedX;
	}

	/**
	 * Führt die Animation in der richtigen Geschwindigkeit aus
	 */
	bottleBeingThrownAnimation() {
		this.playInterval = setStoppableInterval(this.bottleAnimation.bind(this),90);
	}

	/**
	 * Führt die Animation aus
	 */
	bottleAnimation() {
		this.playAnimation(this.IMAGES_FLYING_BOTTLES);
	}
}
