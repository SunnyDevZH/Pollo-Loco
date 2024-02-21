class Coins extends MovableObject {
	height = 150;
	width = 150;
	y = 0;
	growthRate = 10;

	offset = {
		top: 50,
		bottom: 20,
		left: 50,
		right: 50,
	};

	constructor(imagePath, x) {
		super().loadImage(imagePath, x);
		this.y = 80 + Math.random() * 200;
		this.x = x;
	}
}
