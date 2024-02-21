class OverlayIconEndboss extends DrawableObject {
	x = 890;
	y = 0;
	width = 70;
	height = 70;

	IMAGE = ['img/7_statusbars/3_icons/icon_health_endboss.png'];

	constructor() {
		super();
		this.loadImage(this.IMAGE);
	}
}
