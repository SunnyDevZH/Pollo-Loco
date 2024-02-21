class Character extends MovableObject {
	speed = 10;
	y = 180;
	world;
	sounds = new Sounds();
	cache = new CharacterCache();
	isInactive = false;
	energy = 100;
	lastThrow = 0;
	timeLimit = 0.1;
	

	offset = {
		top: 150,
		bottom: -5,
		left: 25,
		right: 25,
	};

	constructor() {
		super().loadImage(this.cache.IMAGES_WALKING[0]);
		this.loadAllImagesFromCache();
		this.applyGravity();
		this.animate();
		this.sounds.setVolume();
		this.longIdleCounter = 0;
	}

	/**
	 * Animation wird ausgeführt
	 */
	animate() {
		this.playInterval = setStoppableInterval(this.checks.bind(this), 50);
	}

	/**
	 * Checks werden ausgeführt
	 */
	checks() {
		this.checkWalking();
		this.checkWalkingRight();
		this.checkWalkingLeft();
		this.checkWalkingSound();
		this.checkJumping();
		this.checkIsIdling(); 
		this.checkIsLongIdling(); 
		this.checkStopLongIdling();
		this.checkThrowing();
		this.checkReactionToInjury();
		this.checkIsBeingKilled();
		this.setCameraForCharacter();
		this.sounds.checkSetSounds();
	}

	/**
	 * Führt die Animation aus
	 */
	animations() {
		this.walkingAnimation();
		this.jumpingAnimation();
		this.idlingAnimation();
		this.longIdlingAnimation();
		this.beingInPainAnimation();
		this.dyingAnimation();
	}

	/**
	 * Prüft ob Keyborad gedrückt wird
	 */
	checkWalking() {
		(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.objectOnGround()
			? this.walkingAnimation()
			: this.sounds.walking_sound.pause();
	}

	/**
	 * Prüft ob Keyborad rechts gedrückt wird
	 */
	checkWalkingRight() {
		this.world.keyboard.RIGHT && this.x < this.world.level.endOfLevel_x
			? (this.moveRight(), this.forwards(), this.sounds.walking_sound.play())
			: null;
	}

	/**
	 * Prüft ob Keyborad links gedrückt wird
	 */
	checkWalkingLeft() {
		this.world.keyboard.LEFT && this.x > -50
			? (this.moveLeft(), this.backwards(), this.sounds.walking_sound.play())
			: null;
	}

	/**
	 * Prüft ob Spieler in der Luft ist
	 */
	checkWalkingSound() {
		this.aboveGround() || this.isInPain() ? this.sounds.walking_sound.pause() : null;
	}

	/**
	 * Prüft ob Keyborad Jump gedrückt wird
	 */
	checkJumping() {
		if (this.aboveGround()) {
			this.jumpingAnimation();
		}
		if (this.aboveGround()) return;
		if (this.world.keyboard.UP) {
			this.jump();
		}
		if (this.objectOnGround) this.airStatus = false;
	}

	/**
	 *  Überprüft ob der Charakter inaktiv ist
	 */
	checkIsIdling() {
		if (this.isInactive || this.isMoving() || this.isDead() || this.aboveGround()) {
		  this.longIdleCounter = 0; // Zurücksetzen des Zählers bei Aktivität
		  return;
		}
	
		this.idlingAnimation();
	
		setTimeout(() => {
		  this.isInactive = true;
		}, 5000);
	  }

	/**
	 *  Überprüft ob der Charakter inaktiv ist
	 */
	  checkIsLongIdling() {
		if (!this.isInactive || this.isMoving() || this.isDead() || this.aboveGround()) {
		  this.longIdleCounter = 0; // Zurücksetzen des Zählers bei Aktivität
		  return;
		}
	
		this.longIdlingAnimation();
	
		// Hier können Sie den Zähler erhöhen
		this.longIdleCounter += 1;
	  }

	/**
	 *  Überprüft ob der Charakter aktiv ist
	 */
	  checkStopLongIdling() {
		if (this.isMoving() || this.aboveGround()) {
		  this.isInactive = false;
		  this.longIdleCounter = 0; // Zurücksetzen des Zählers bei Bewegung
		}
	  }

	/**
	 * Prüft ob Flaschen geworfen werden können
	 */
	checkThrowing() {
		let bottle = new ThrowableObjects(this.x + 60, this.y + 100);
		if (this.noBottleToThrow()) return;
		if (!this.throwAllowed()) return;
		if (this.world.keyboard.D && this.isAlive() && this.headingForwards()) {
			this.throwBottle(bottle);
			this.world.updateDecreaseStatusBarBottles();
			this.lastThrow = new Date().getTime();
		}
	}

	throwBottle(bottle) {
		this.world.throwableObject.push(bottle);
	}

	/**
	 * Prüft ob der Spieler flaschen hat zum werfen
	 */
	noBottleToThrow() {
		return this.world.noBottlesCollected();
	}

	noBottlesCollected() {
		return this.world.bottlesStatusBar.collectedBottles == 0;
	}

	/**
	 * Prüft ob 0.5 Sekunden zwischen dem nächsten Flaschenwurf liegt
	 */

	throwAllowed() {
		let timepassed = new Date().getTime() - this.lastThrow;
		timepassed = timepassed / 1000; //divide 1000 to get seconds
		return timepassed > 0.5; //seconds
	}

	checkReactionToInjury() {
		if (this.isDead()) return;
		if (this.isAlive()) this.checkIsBeingHurt();
	}

	/**
	 * Prüft ob der Spieler in der Luft ist, falls nicht 
	 * wir geprüft ober er verletzt wurde
	 */
	checkIsBeingHurt() {
		if (this.aboveGround()) return;
		if (this.isInPain(this.timeLimit)) {
			this.beingInPainAnimation();
			this.sounds.ouch_sound.play();
		}
	}

	checkIsBeingKilled() {
		if (this.isDead()) {
			this.applyGravity();
			this.jump();
			this.goesToGrave(1000);
			this.dyingAnimation();
		}
	}

	/**
	 * Damit die Kamera immer beim Spieler bleibt
	 */

	setCameraForCharacter() {
		this.world.camera_x = -this.x + 100;
	}

	/**
	 * Führt die Animation aus
	 */
	walkingAnimation() {
		this.playAnimation(this.cache.IMAGES_WALKING);
	}

	jumpingAnimation() {
		this.playAnimation(this.cache.IMAGES_JUMPING);
	}

	idlingAnimation() {
		this.playAnimation(this.cache.IMAGES_IDLE);
	}

	longIdlingAnimation() {
		this.playAnimation(this.cache.IMAGES_LONG_IDLE);
	}

	beingInPainAnimation() {
		this.playAnimation(this.cache.IMAGES_INPAIN);
	}

	dyingAnimation() {
		this.playAnimation(this.cache.IMAGES_DEAD);
	}

	/**
	 * Falls Spieler aktiv ist, wird isInactive false gemacht
	 */
	isActive() {
		return (this.isInactive = false);
	}

	/**
	 * Falls Spieler sich bewegt ist, wird true zurück gegeben
	 */
	isMoving() {
		return (
			this.world.keyboard.RIGHT ||
			this.world.keyboard.LEFT ||
			this.world.keyboard.UP ||
			this.world.keyboard.D
		);
	}
}
