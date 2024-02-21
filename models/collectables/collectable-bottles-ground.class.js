class BottlesOnGround extends MovableObject {
	height = 90;
	width = 90;
	y = 340;

	offset = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 25,
	};

	constructor() {
		super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
		this.x = 2500 + Math.random() * 200;
	}
}
