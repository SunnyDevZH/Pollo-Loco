class BottlesInAir extends MovableObject {
	height = 90;
	width = 90;
	y = 0;

	constructor(imagePath, x) {
		super().loadImage(imagePath, x);
		this.y = 80 + Math.random() * 200;
		this.x = x;
	}
}
