class Chick extends MovableObject {
	IMAGES_WALKING = [
		'./img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
		'./img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
		'./img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
	];

	offset = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	constructor() {
		super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
		this.loadImages(this.IMAGES_WALKING);
		this.x = 600 + Math.random() * 1000; // chicks werden an verschiedenen Positionen erstellt
		this.y = 365;
		this.height = 60;
		this.width = 60;
		this.speed = 0.15 + Math.random() * 1.9; // chicks laufen verschieden schnell
		this.animation();
	}

	animation() {
		this.chickMovesLeft();
		this.walkingAnimationApplied();
	}

	/**
	 * Führt die Animation aus
	 */
	walkingAnimationApplied() {
		this.playInterval = setStoppableInterval(this.walkingAnimation.bind(this), 100);
	}

	walkingAnimation() {
		this.playAnimation(this.IMAGES_WALKING);
	}

	/**
	 * Die chicken bewegen sich nach links
	 */
	chickMovesLeft() {
		this.playInterval = setStoppableInterval(this.moveLeft.bind(this), 1000 / 60);
	}
}
