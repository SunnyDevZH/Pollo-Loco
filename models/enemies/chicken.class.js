class Chicken extends MovableObject {
	IMAGES_WALKING = [
		'./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
		'./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
		'./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
	];

	offset = {
		top: 0,
		bottom: 10,
		left: 20,
		right: 20,
	};

	constructor() {
		super().loadImage(
			'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'
		);
		this.loadImages(this.IMAGES_WALKING);
		this.x = 1500 + Math.random() * 2500; // chicks werden an verschiedenen Positionen erstellt
		this.y = 350;
		this.height = 75;
		this.width = 75;
		this.animation();
		this.speed = 0.15 + Math.random() * 0.9; // chicks laufen verschieden schnell
	}

	animation() {
		this.moveLeftAnimation();
		this.walkingAnimationApplied();
	}

	/**
	 * Die chicken bewegen sich nach links
	 */
	moveLeftAnimation() {
		this.playInterval = setStoppableInterval(this.moveLeft.bind(this),1000 / 60);
	}

	/**
	 * Führt die Animation aus
	 */
	walkingAnimationApplied() {
		this.playInterval = setStoppableInterval(this.walkingAnimation.bind(this),100);
	}

	walkingAnimation() {
		this.playAnimation(this.IMAGES_WALKING);
	}
}
