class SplashedBottle extends MovableObject {
	groundPosition = 320;
	throwableBottle;
	height = 100;
	width = 100;

	IMAGES_SPLASHED_BOTTLES = [
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
	];

	constructor(x, y) {
		super().loadImage(this.IMAGES_SPLASHED_BOTTLES[0]);
		this.x = x;
		this.y = y;
		this.loadImages(this.IMAGES_SPLASHED_BOTTLES);
		this.splashAnimationApplied();
	}

	/**
	 * Wendet die Splash-Animation mit der richtigen Geschwindigkeit 
	 */
	splashAnimationApplied() {
		this.setIntervalId = setStoppableInterval(
			this.splashAnimation.bind(this),
			50
		);
	}

	/**
	 * Die Bilder werden angezeigt
	 */
	splashAnimation() {
		this.playAnimation(this.IMAGES_SPLASHED_BOTTLES);
	}
}
