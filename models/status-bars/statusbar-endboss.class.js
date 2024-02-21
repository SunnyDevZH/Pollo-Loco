class HealthStatusBarEndBoss extends DrawableObject {
	IMAGES = [
		'./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // 0
		'./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png', // 1
		'./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png', // 2
		'./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png', // 3
		'./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png', // 4
		'./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png', // 5
	];

	percentage = 100;

	constructor() {
		super();
		this.loadImages(this.IMAGES);
		this.x = 550;
		this.y = 0;
		this.width = 200;
		this.height = this.width * 0.265;
		this.setPercentage(100);
	}

	setPercentage(percentage) {
		this.percentage = percentage;
		let path = this.IMAGES[this.resolveImageIndexHealthBar()];
		this.img = this.imageCache[path];
	}
}
