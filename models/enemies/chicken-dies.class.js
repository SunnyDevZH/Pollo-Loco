class ChickenDies extends MovableObject {
	IMAGES_CHICKEN_DIES = [
		'./img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
	];

	constructor(x, y) {
		super().loadImage(this.IMAGES_CHICKEN_DIES[0]);
		this.loadImages(this.IMAGES_CHICKEN_DIES);
		this.x = x;
		this.y = y;
		this.height = 75;
		this.width = 75;
	}
}
