class Endboss extends MovableObject {
	width = 300;
	height = 300;
	y = 140;
	x = 3420;
	speedY = 5;
	speed = 25;
	acceleration = 5;
	energy = 100;
	beingAttacked = false;
	characterDetected = false;
	tooClose = false;
	lastJump = false;
	groundPosition = 100;
	cache = new EndbossCache();
	timeLimit = 0.8;
	i = 0;
	id;

	offset = {
		top: 100,
		bottom: 15,
		left: 50,
		right: 50,
	};

	constructor() {
		super().loadImage(this.cache.IMAGES_ALERT[0]);
		this.loadAllImagesFromCache();
		this.animate();
		this.animations();
	}

	/**
	 * Führt die Animation aus
	 */
	animate() {
		this.playInterval = setStoppableInterval(this.checks.bind(this), 200);
	}

	checks() {
		this.checkBeingAlert();
		this.checkWalking();
		this.checkBeingAttacked();
		this.checkAttackCharacter();
		this.checkIsBeingKilled();
	}

	/**
	 * Führt die Animation aus
	 */
	animations(id) {
		this.alertAnimation();
		this.walkAnimation();
		this.attackAnimation();
		this.hurtAnimation();
		this.dyingAnimation(id);
	}

	alertAnimation() {
		this.playAnimation(this.cache.IMAGES_ALERT);
	}

	walkAnimation() {
		this.playAnimation(this.cache.IMAGES_WALKING);
	}

	hurtAnimation() {
		this.playAnimation(this.cache.IMAGES_HURT);
	}

	attackAnimation() {
		this.playAnimation(this.cache.IMAGES_ATTACK);
		this.moveLeft();
	}

	dyingAnimation() {
		if (this.i >= 3 || this.isAlive()) return;
		if (this.i < 2 || this.isDead()) {
			this.playAnimation(this.cache.IMAGES_ENDBOSS_DYING);
			this.i++;
		}
		if (!this.aboveGround() && !this.lastJump) {
			this.applyGravity();
			this.jump();
			this.goesToGrave(2000);
			this.lastJump = true;
			this.loadImage(this.cache.IMAGES_ENDBOSS_DYING[2]);
		}
		if (this.i == 2) this.lastJump = true;
	}

	/**
	 * Führt die Checks aus
	 */
	checkWalking() {
		if (this.tooClose || this.isDead()) return; 
		if (this.isAlive() && (this.characterDetected || this.beingAttacked)) {
			this.moveLeft();
			this.walkAnimation();
		}
	}

	/**
	 * Checkt ob der Charakter entdeckt wurde
	 */
	checkBeingAlert() {
		if (!this.characterDetected) this.alertAnimation();
	}

	/**
	 * Checkt ob der endBoss attackiert wurde
	 */
	checkBeingAttacked() {
		if (this.isDead()) return;
		if (this.beingAttacked && this.isInPain(this.timeLimit))
			this.hurtAnimation();
	}

	/**
	 * Checkt ob der Charakter noch lebt und attackiert werden kann 
	 */
	checkAttackCharacter() {
		if (this.tooClose && this.isAlive()) this.attackAnimation();
	}

	/**
	 * Checkt ob der Endboss noch lebt
	 */
	checkIsBeingKilled() {
		if (this.isAlive()) return;
		if (this.isDead() && !this.lastJump) {
			this.dyingAnimation();
		}
	}
}
