class Cloud extends MovableObject {
	y = 20;
	height = 250;
	width = 500;
	speed = 0.4;

	constructor() {
		super().loadImage('./img/5_background/layers/4_clouds/1.png');
		this.x = Math.random() * 4200;
		this.moveLeftAnimation();
	}

	/**
	 * Bewegt die Wolken nach lnínks
	 */
	moveLeftAnimation() {
		this.playInterval = setStoppableInterval(
			this.moveLeft.bind(this),
			1000 / 60
		);
	}
}
