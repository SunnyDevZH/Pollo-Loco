class BottlesStatusBar extends DrawableObject {
	IMAGES = [
		'./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
		'./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
		'./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
		'./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
		'./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
		'./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
	];

	collectedBottles = 0;

	constructor() {
		super();
		this.loadImages(this.IMAGES);
		this.x = 15;
		this.y = 45;
		this.width = 200;
		this.height = this.width * 0.265;
		this.setAmountBottles(0);
	}

	setAmountBottles(collectedBottles) {
		this.collectedBottles = collectedBottles;
		let path = this.IMAGES[this.resolveImageIndexCollectableObjectsBar(collectedBottles)];
		this.img = this.imageCache[path];
	}
}
