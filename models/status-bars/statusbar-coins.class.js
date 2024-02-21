class CoinsStatusBar extends DrawableObject {
	IMAGES = [
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
	];
	collectedCoins = 0;
	constructor() {
		super();
		this.loadImages(this.IMAGES);
		this.x = 15;
		this.y = 90;
		this.width = 200;
		this.height = this.width * 0.265;
		this.setAmountCoins(0);
	}

	setAmountCoins(collectedCoins) {
		this.collectedCoins = collectedCoins;
		let path = this.IMAGES[this.resolveImageIndexCollectableObjectsBar(collectedCoins)];
		this.img = this.imageCache[path];
	}
}
