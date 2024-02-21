class Level {
	smallEnemies;
	biggerEnemies;
	endBoss;
	clouds;
	backgroundObjects;
	bottlesOnGround;
	bottlesInAir;
	coins;
	endOfLevel_x = 3400;

	constructor(
		smallEnemies,
		biggerEnemies,
		endBoss,
		clouds,
		backgroundObjects,
		bottlesOnGround,
		bottlesInAir,
		coins
	) {
		this.smallEnemies = smallEnemies;
		this.biggerEnemies = biggerEnemies;
		this.endBoss = endBoss;
		this.clouds = clouds;
		this.backgroundObjects = backgroundObjects;
		this.bottlesOnGround = bottlesOnGround;
		this.bottlesInAir = bottlesInAir;
		this.coins = coins;
	}
}
