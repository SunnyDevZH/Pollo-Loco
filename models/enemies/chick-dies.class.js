class ChickDies extends MovableObject {
	IMAGES_CHICK_DIES = [
		'./img/3_enemies_chicken/chicken_small/2_dead/dead.png',
	];

	constructor(x, y) {
		super().loadImage(this.IMAGES_CHICK_DIES[0]); 
		this.x = x;
		this.y = y;
		this.height = 75;
		this.width = 75;
		this.loadImages(this.IMAGES_CHICK_DIES); 
	}
}
