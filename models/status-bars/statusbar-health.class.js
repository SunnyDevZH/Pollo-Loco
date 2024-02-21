class HealthStatusBar extends DrawableObject {
	IMAGES = [
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', 
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png', 
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png', 
	];

	percentage = 100;

	constructor() {
		super();
		this.loadImages(this.IMAGES);
		this.x = 15;
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
