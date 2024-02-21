
class MovableObject extends DrawableObject {
	speed = 0.25;
	img;
	otherDirection = false;
	speedY = 0;
	speedX = 80;
	acceleration = 10;
	energy = 100;
	lastHit = 0;
	timeLimit = 0;
	groundPosition = 180;
	setIntervalId = [];

	offset = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	isAlive() {
		return this.energy > 0;
	}

	isDead() {
		return this.energy <= 0;
	}

	forwards() {
		this.otherDirection = false;
	}

	headingForwards() {
		return this.otherDirection == false;
	}

	backwards() {
		this.otherDirection = true;
	}

	aboveGround() {
		return this.y < this.groundPosition;
	}

	objectOnGround() {
		return this.y >= this.groundPosition;
	}

	/**
	 * Anziehungskraft in Intervall
	 */
	applyGravity() {
		this.playInterval = setStoppableInterval(this.gravity.bind(this), 40);
	}

	/**
	 * Anziehungskraft wenn Charakter in der Luft
	 */
	gravity() {
		if (this.aboveGround() || this.speedY > 0) {
			this.y -= this.speedY; 
			this.speedY -= this.acceleration;
		} else {
			this.speedX = 0;
			this.y = this.groundPosition;
		}
	}
	

	hitOnTop(object) {
		return (
			this.rightBorderColliding(object) && 
			this.bottomBorderColliding(object) && 
			this.leftBorderColliding(object) && 
			this.topBorderColliding(object)
		);
	}

	/**
	 * Prüft ob Objekte kolidieren
	 */
	isColliding(object) {
		return (
			this.rightBorderColliding(object) && 
			this.bottomBorderColliding(object) && 
			this.leftBorderColliding(object) && 
			this.topBorderColliding(object)
		);
	}

	/**
	 * Prüft ob Objekte rechts kollidieren
	 */
	rightBorderColliding(object) {
		return (
			this.x + this.width - this.offset.right >
			object.x + object.offset.left
		);
	}

	/**
	 * Prüft ob Objekte am Grund kollidieren
	 */
	bottomBorderColliding(object) {
		return (
			this.y + this.height - this.offset.bottom >
			object.y + object.offset.top
		);
	}
	
	/**
	 * Prüft ob Objekte links kollidieren
	 */
	leftBorderColliding(object) {
		return (
			this.x + this.offset.left <
			object.x + object.width - object.offset.right
		);
	}

	/**
	 * Prüft ob Objekte oben kollidieren
	 */
	topBorderColliding(object) {
		return (
			this.y + this.offset.top <
			object.y + object.height - object.offset.bottom
		);
	}

	/**
	 * Falls Objekete kollidieren wird Energie abgezogen
	 */
	injury(damage) {
		this.energy -= damage;
		this.energy < 0
			? (this.energy = 0)
			: (this.lastHit = new Date().getTime());
	}

	/**
	 * Prüft wie viel Zeit vergangen ist seit der Kollision
	 */
	isInPain(timeLimit) {
		let timepassed = this.now() - this.lastHit; 
		timepassed = timepassed / 1000;
		return timepassed < timeLimit;
	}

	/**
	 * aktuelle Zeit
	 */
	now() {
		return new Date().getTime();
	}

	playAnimation(images) {
		let i = this.currentImage % images.length;
		let path = images[i];
		this.img = this.imageCache[path];
		this.currentImage++;
	}

	/**
	 * links bewegen
	 */
	moveLeft() {
		this.x -= this.speed;
	}

	/**
	 * rechts bewegen
	 */
	moveRight() {
		this.x += this.speed;
	}

	/**
	 * Sprung
	 */
	jump() {
		this.speedY = 60;
	}

	/**
	 * Fall Endboss oder Charakter stirbt
	 * verschwindet er weiter unten
	 */
	goesToGrave(newGround) {
		this.groundPosition = newGround;
	}
}
