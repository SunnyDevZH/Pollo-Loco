class DrawableObject {
	x = 10;
	y = 80;
	height = 250;
	width = 120;
	img;
	imageCache = {};
	currentImage = 0;

	/**
	 * Bild wird geladen
	 */
	loadImage(path) {
		this.img = new Image(); // Image() = document.getElementById('').innerHTML = <img src="path" alt="" />
		this.img.src = path;
	}

	/**
	 * Bilder Array
	 */
	loadImages(arr) {
		arr.forEach((path) => {
			let img = new Image();
			img.src = path;
			this.imageCache[path] = img;
		});
	}

	/**
	 * Alles Bilder werden geladen aus Array
	 */
	loadAllImagesFromCache() {
		Object.values(this.cache).forEach((source) => {
			if (Array.isArray(source)) {
				this.loadImages(source);
			}
		});
	}

	/**
	 * Haupt Draw Funktion
	 */
	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	drawWorld() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Inhalt von Canvas wird gelöscht
		this.ctx.translate(this.camera_x, 0);
		this.drawNature();
		this.ctx.translate(-this.camera_x, 0); //backwards
		this.drawFixedObjects();
		this.ctx.translate(this.camera_x, 0); // forwards
		this.drawMovableObjects();
		this.ctx.translate(-this.camera_x, 0);
		this.requestFrame();
	}

	requestFrame() {
		let self = this;
		requestAnimationFrame(() => {
			self.drawWorld();
		});
	}

	/**
	 * Zeichnet den Hintergrund
	 */
	drawNature() {
		this.addObjectsToCanvas(this.level.backgroundObjects);
		this.addObjectsToCanvas(this.level.clouds);
	}

	/**
	 * Zeichnet die verschiedenen Statusbar
	 */
	drawFixedObjects() {
		this.drawStatusBarEndBossIfFightStarted();
		this.addToCanvas(this.healthStatusBar);
		this.addToCanvas(this.bottlesStatusBar);
		this.addToCanvas(this.coinsStatusBar);
	}

	/**
	 * Zeichnet die Statusbar Endboss
	 */
	drawStatusBarEndBossIfFightStarted() {
		if (this.endbossGetsAnnoyed()) {
			this.addToCanvas(this.statusBarEndboss);
			this.addToCanvas(this.overlayIconStatusBarEndboss);
		}
	}

	endbossGetsAnnoyed() {
		return this.level.endBoss[0].characterDetected || this.level.endBoss[0].beingAttacked;
	}

	/**
	 * Zeichnet die Objekte
	 */
	drawMovableObjects() {
		this.addEnemiesToCanvas();
		this.addCollectiblesToCanvas();
		this.addDestroyedCollectiblesToCanvas();
		this.addObjectsToCanvas(this.deadEnemies);
		this.addToCanvas(this.character);
	}

	/**
	 * Gegner hinzufügen von Level
	 */
	addEnemiesToCanvas() {
		this.addObjectsToCanvas(this.level.smallEnemies);
		this.addObjectsToCanvas(this.level.biggerEnemies);
		this.addObjectsToCanvas(this.level.endBoss);
	}

	/**
	 * Gegenstände hinzufügen von Level
	 */
	addCollectiblesToCanvas() {
		this.addObjectsToCanvas(this.level.bottlesOnGround);
		this.addObjectsToCanvas(this.level.bottlesInAir);
		this.addObjectsToCanvas(this.level.coins);
	}

	/**
	 * Zerstörte gegenstände hinzufügen
	 */
	addDestroyedCollectiblesToCanvas() {
		this.addObjectsToCanvas(this.throwableObject);
		this.addObjectsToCanvas(this.splashedBottle);
	}
	
	/**
	 * Objekte aus dem Array werden auf das Canvas gezeichnet
	 */
	addObjectsToCanvas(objects) {
		objects.forEach((object) => {
			this.addToCanvas(object);
		});
	}

	/**
	 * Funktion zum drehen des Bilder von Charakter
	 */
	addToCanvas(movableObject) {
		if (movableObject.otherDirection || movableObject == this.statusBarEndboss)
			this.flipImage(movableObject);

		movableObject.draw(this.ctx);

		if (movableObject.otherDirection || movableObject == this.statusBarEndboss)
			this.flipImageBack(movableObject);
	}

	/**
	 * dreht das Bild wenn sich der Charakter in eine ander Richtung bewegt
	 */
	flipImage(movableObject) {
		this.ctx.save();
		this.ctx.translate(movableObject.width, 0);
		this.ctx.scale(-1, 1);
		movableObject.x = movableObject.x * -1;
	}

	flipImageBack(movableObject) {
		movableObject.x = movableObject.x * -1;
		this.ctx.restore();
	}

	/**
	 * Funktion für die Abfolge von Bildern bei Gegenständen
	 */
	resolveImageIndexCollectableObjectsBar(collectedAmount) {
		switch (true) {
			case collectedAmount < 2:
				return 0;
			case collectedAmount <= 2:
				return 1;
			case collectedAmount <= 4:
				return 2;
			case collectedAmount <= 6:
				return 3;
			case collectedAmount <= 8:
				return 4;
			case collectedAmount <= 10:
			case collectedAmount > 10:
				return 5;
		}
	}
	
	/**
	 * Funktion für die Abfolge von Bildern bei charakter und Endboss mit Prozenten
	 */
	resolveImageIndexHealthBar() {
		switch (true) {
			case this.percentage == 100:
				return 5;
			case this.percentage > 80:
				return 4;
			case this.percentage > 60:
				return 3;
			case this.percentage > 40:
				return 2;
			case this.percentage >= 20:
				return 1;
			default:
				return 0;
		}
	}
}
