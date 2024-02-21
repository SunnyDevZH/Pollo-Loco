class World extends DrawableObject {
	character = new Character();
	throwableObject = [];
	splashedBottle = [];
	deadEnemies = [];
	healthStatusBar = new HealthStatusBar();
	bottlesStatusBar = new BottlesStatusBar();
	coinsStatusBar = new CoinsStatusBar();
	statusBarEndboss = new HealthStatusBarEndBoss();
	overlayIconStatusBarEndboss = new OverlayIconEndboss();
	sounds = new Sounds();
	movableObject = new MovableObject();

	level = level1;
	gameEnds = false;
	canvas;
	ctx;
	keyboard;
	camera_x = -100;

	constructor(canvas, keyboard) {
		super();
		this.ctx = canvas.getContext('2d');
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.drawWorld();
		this.setWorld();
		this.run();
		this.sounds.setVolume();
	}

	setWorld() {
		this.character.world = this;
	}

	run() {
		this.playinterval = setStoppableInterval(this.checks.bind(this), 40);
	}

	/**
	 * Überprüfung von:
	 */
	checks() {
		this.checkCollsionWithEnemies();
		this.checkCollsionWithCollectableObjects();
		this.checkCharacterMakingEndbossWild();
		this.checkBottleHitsGround();
		this.checkBottleHitsEnemy();
		this.checkCharacterGetDetectedByEndboss();
		this.checksRightEndScreen();
		this.sounds.checkSetSounds();
	}

	/**
	 * Überprüfung von Kollision mit Gegner
	 */
	checkCollsionWithEnemies() {
		this.checkCollisionsWithSmallEnemies();
		this.checkCollisionsWithBiggerEnemies();
		this.checkCollisionsWithEndBossEnemies();
		this.checkKillEnemyByJump();
	}
	/**
	 * Prüft die Kollison mit den kleinen Gegnern, zieht Energie ab und aktualisiert die Statusbar
	 */
	checkCollisionsWithSmallEnemies() {
		this.level.smallEnemies.forEach((enemy) => {
			if (this.character.aboveGround()) return;
			if (this.character.isColliding(enemy)) {
				this.character.injury(0.5);
				this.healthStatusBar.setPercentage(this.character.energy);
			}
		});
	}

	/**
	 * Prüft die Kollison mit dem Gegner, zieht Energie ab und aktualisiert die Statusbar
	 */
	checkCollisionsWithBiggerEnemies() {
		this.level.biggerEnemies.forEach((enemy) => {
			this.character.isColliding(enemy)
				? (this.character.injury(1),
				  this.healthStatusBar.setPercentage(this.character.energy))
				: null;
		});
	}

	/**
	 * Prüft die Kollison mit dem Endbosss, zieht Energie ab und aktualisiert die Statusbar
	 */
	checkCollisionsWithEndBossEnemies() {
		this.level.endBoss.forEach((enemy) => {
			this.character.isColliding(enemy)
				? (this.character.injury(5),
				  this.healthStatusBar.setPercentage(this.character.energy))
				: null;
		});
	}

	/**
	 * Prüft ob Gegner von oben getroffen wird
	 */
	checkKillEnemyByJump() {
		this.checkHitsChickOnTop();
		this.checkHitsChickenOnTop();
	}

	/**
	 * Prüft ob Spieler in der Luft kollidiert mit dem Gegner und eliminiert den Gegner
	 */
	checkHitsChickOnTop() {
		this.level.smallEnemies.forEach((chick, i) => {
			this.character.isColliding(chick) && this.character.speedY < 0 && this.character.aboveGround(this.sounds.hit_sound.play())
				? (this.chickDies(chick, i), this.character.jump())
				: null;
		});
	}

	/**
	 * Prüft ob Spieler in der Luft kolidiert mit dem Gegner und eliminiert den Gegner
	 */
	checkHitsChickenOnTop() {
		this.level.biggerEnemies.forEach((chicken, i) => {
			this.character.isColliding(chicken) && this.character.speedY < 0 && this.character.aboveGround(this.sounds.hit_sound.play())
				? (this.chickenDies(chicken, i), this.character.jump())
				: null;
		});
	}

	/**
	 * Prüft kollison mit Gegenstänen
	 */
	checkCollsionWithCollectableObjects() {
		this.checkCollisionsWithBottlesOnGround();
		this.checkCollisionsWithBottlesInAir();
		this.checkCollisionsWithCoins();
	}

	/**
	 * Prüft ob Spieler mit Gegenständen kolidiert und aktualisiert die Statusbar
	 */
	checkCollisionsWithBottlesOnGround() {
		this.level.bottlesOnGround.forEach((bottlesOnGround, i) => {
			if (this.cannotCarryMoreBottles()) return;
			if (this.character.isColliding(bottlesOnGround)) {
				this.takeBottleOnGroundFromMap(i);
				this.updateIncreaseStatusBarBottles();
				this.sounds.collect_sound.play();
			}
		});
	}

	/**
	 * Prüft ob Spieler mit Gegenständen kolidiert und aktualisiert die Statusbar
	 */
	checkCollisionsWithBottlesInAir() {
		if (this.cannotCarryMoreBottles()) return; //Pepe kann carry more than 10 bottles at the time
		this.level.bottlesInAir.forEach((objectInAir, i) => {
			if (this.character.isColliding(objectInAir)) {
				this.collectBottleFromAirProcess(i);
				this.sounds.collect_sound.play();
			}
		});
	}

	cannotCarryMoreBottles() {
		return this.bottlesStatusBar.collectedBottles == 10;
	}

	/**
	 * Flaschen werden gelöscht wenn sie am Boden aufgenommen werden
	 */
	takeBottleOnGroundFromMap(i) {
		this.level.bottlesOnGround.splice(i, 1);
	}

	/**
	 * Aktualisiert die Statusbar und löscht die flaschen 
	 * wenn sie in der Luft aufgenommen werden
	 */
	collectBottleFromAirProcess(i) {
		this.takeBottleInAirFromMap(i);
		this.updateIncreaseStatusBarBottles();
		this.sounds.collect_sound.play();
	}

	/**
	 * Entfernt eingesammelte gegenstände bei kollison von Map
	 */
	takeBottleInAirFromMap(i) {
		this.level.bottlesInAir.splice(i, 1);
	}

	/**
	 * Statusbar wird aktualisiert
	 */
	updateIncreaseStatusBarBottles() {
		this.bottlesStatusBar.collectedBottles++;
		this.bottlesStatusBar.setAmountBottles(this.bottlesStatusBar.collectedBottles);
	}

	/**
	 * Statusbar wird aktualisiert wenn flaschen verbraucht werden
	 */
	updateDecreaseStatusBarBottles() {
		this.bottlesStatusBar.collectedBottles--;
		this.bottlesStatusBar.setAmountBottles(this.bottlesStatusBar.collectedBottles);
	}

	/**
	 * Münzen werden gelöscht wenn sie am Boden aufgenommen werden
	 */
	checkCollisionsWithCoins() {
		this.level.coins.forEach((coins, i) => {
			if (this.character.isColliding(coins)) {
				this.takesCoinOffMap(i);
				this.updateCoinStatusBar();
				this.sounds.collect_sound.play();
			}
		});
	}

	/**
	 * Entfernt eingesammelte gegenstände bei kollison von Map
	 */
	takesCoinOffMap(i) {
		this.level.coins.splice(i, 1);
	}

	/**
	 * Statusbar wird aktualisiert
	 */
	updateCoinStatusBar() {
		this.coinsStatusBar.collectedCoins++;
		this.coinsStatusBar.setAmountCoins(this.coinsStatusBar.collectedCoins);
	}

	/**
	 * Prüft ob keine Flaschen vorhanden sind
	 */
	noBottlesCollected() {
		return this.bottlesStatusBar.collectedBottles == 0;
	}

	/**
	 * Prüft ob die Flaschen mit dem Boden kolidieren
	 */
	checkBottleHitsGround() {
		this.throwableObject.forEach((bottle) => {
			if (bottle.y > 300) {
				this.smashingBottleAnimation(bottle);
			}
		});
	}

	/**
	 * Flaschen wird zerstört und entfernt
	 */
	bottleSmashes(bottleObj) {
		let bottle = new SplashedBottle(bottleObj.x, bottleObj.y);
		this.throwableObject.splice(bottleObj, 1);
		this.splashedBottle.push(bottle);
		setTimeout(() => {
			this.splashedBottle.splice(bottle);
		}, 500);
	}
	
	/**
	 * Prüft ob Flaschen mit Gegner kollidiert
	 */
	checkBottleHitsEnemy() {
		this.checkBottleHitsChick();
		this.checkBottleHitsChicken();
		this.checkBottleHitsEndboss();
	}

	/**
	 * Prüft ob die Flaschen mit dem Gegner kollidieren und tötet ihn
	 */
	checkBottleHitsChick() {
		this.throwableObject.forEach((bottle) => {
			this.level.smallEnemies.forEach((enemy, i) => {
				if (bottle.isColliding(enemy)) {
					this.chickDies(enemy, i);
					this.smashingBottleAnimation(bottle);
				}
			});
		});
	}

	/**
	 * Prüft ob der Gegner tod ist und löscht diesen
	 */
	chickDies(enemy, position) {
		let deadChick = new ChickDies(enemy.x, enemy.y);
		this.level.smallEnemies.splice(position, 1);
		this.deadEnemies.push(deadChick);
		setTimeout(() => {
			this.deadEnemies.splice(0, 1);
		}, 2000);
	}

	/**
	 * Prüft ob die Flaschen mit dem Gegner kollidieren und tötet ihn
	 */
	checkBottleHitsChicken() {
		this.throwableObject.forEach((bottle) => {
			this.level.biggerEnemies.forEach((enemy, i) => {
				if (bottle.isColliding(enemy)) {
					this.chickenDies(enemy, i);
					this.smashingBottleAnimation(bottle);
				}
			});
		});
	}

	/**
	 * Prüft ob der Gegner tod ist und löscht diesen
	 */
	chickenDies(enemy, i) {
		let deadChicken = new ChickenDies(enemy.x, enemy.y);
		this.level.biggerEnemies.splice(i, 1);
		this.deadEnemies.push(deadChicken);
		setTimeout(() => {
			this.deadEnemies.splice(0, 1);
		}, 2000);
	}

	/**
	 * Prüft ob die Flaschen mit dem Endboss kollidieren und zieht im Energie ab
	 */
	checkBottleHitsEndboss() {
		this.throwableObject.forEach((bottle) => {
			this.level.endBoss.forEach((enemy, i) => {
				if (bottle.isColliding(enemy)) {
					this.endbossLoosesEnergy(i);
					this.sounds.hit_sound.play()
					this.updatingHealthbarOfEndboss(i);
					this.smashingBottleAnimation(bottle);
					this.setsEndBossBeingAttackedByCharacter();
				}
				if (this.level.endBoss[i].isDead()) {
					this.stopEndboss(i);
				}
			});
		});
	}

	/**
	 * Endboss verliert Energie
	 */
	endbossLoosesEnergy(i) {
		this.level.endBoss[i].injury(20);
	}

	/**
	 * Statusbar Endboss wird angepasst
	 */
	updatingHealthbarOfEndboss(i) {
		this.statusBarEndboss.setPercentage(this.level.endBoss[i].energy);
	}

	/**
	 * Flaschen wird zerstört und entfernt
	 */
	smashingBottleAnimation(bottle) {
		this.bottleSmashes(bottle);
		this.sounds.smashing_bottle_sound.play();
	}

	/**
	 * Endboss bewegt sich nicht
	 */
	stopEndboss(i) {
		this.level.endBoss[i].speed = 0;
	}

	/**
	 * Prüft ob der Charakter vom Endboss entdeckt wird
	 */
	checkCharacterGetDetectedByEndboss() {
		if (this.character.x > 3000) {
			this.endBossDetectedCharacter();
		}
	}

	/**
	 * Prüft ob Endboss Charakter sichtet
	 */
	endBossDetectedCharacter() {
		this.level.endBoss[0].characterDetected = true;
	}

	/**
	 * Endboss attackiert Charakter
	 */
	setsEndBossBeingAttackedByCharacter() {
		this.level.endBoss[0].beingAttacked = true;
	}

	/**
	 * Prüft die Distanz zwischen Endboss und Charakter
	 */
	checkCharacterMakingEndbossWild() {
		this.notEnoughDistance() && this.character.isAlive()
			? this.setCharacterTooClose()
			: this.setCharacterNotTooClose();
	}

	/**
	 * Charakter ist zu nahe an Endboss -> Charakter verliert mehr Energie
	 */
	notEnoughDistance() {
		return this.level.endBoss[0].x - this.character.x < 50;
	}

	setCharacterNotTooClose() {
		this.level.endBoss[0].tooClose = false;
	}

	setCharacterTooClose() {
		this.level.endBoss[0].tooClose = true;
	}

	/**
	 * Prüft wie das Spiel abgeschlossen wurde
	 */
	checksRightEndScreen() {
		if (this.level.endBoss[0].isDead()) this.showEndScreen('endScreen');
		if (this.level.endBoss[0].isDead()) return;
		if (this.character.isDead()) this.showEndScreen('loosesEndScreen');
	}

	showEndScreen(screenId) {
			document.getElementById(screenId).classList.remove('d-none');
			document.getElementById('restart').classList.remove('d-none');
			this.gameEnds = true;
			this.stopAllIntervals();
	}

	/**
	 * Alle Intervale stopen
	 */
	stopAllIntervals() {
		setTimeout(() => {
			intervallIds.forEach((id) => {
				clearInterval(id);
			});
		}, 3000);
	}
}
