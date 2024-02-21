let level1;

/**
 * Levels Array
 */

function initLevel1() { 
	level1 = new Level( 
		[	new Chick(), 
			new Chick(), 
			new Chick(), 
			new Chick(), 
			new Chick(), 
			new Chick(), 
			new Chick()
		],

		[
			new Chicken(),
			new Chicken(),
			new Chicken(),
			new Chicken(),
			new Chicken(),
			new Chicken(),
			new Chicken(),
			new Chicken(),
			new Chicken(),
			new Chicken(),
		],

		[	new Endboss()
		],

		[
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
		],

		[
			new BackgroundObject('./img/5_background/layers/air.png', -719),
			new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
			new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
			new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),

			new BackgroundObject('./img/5_background/layers/air.png', 0),
			new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
			new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
			new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),

			new BackgroundObject('./img/5_background/layers/air.png', 719),
			new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
			new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
			new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),

			new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
			new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
			new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2),
			new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),

			new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
			new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
			new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
			new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3),

			new BackgroundObject('./img/5_background/layers/air.png', 719 * 4),
			new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 4),
			new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 4),
			new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 4),

			new BackgroundObject('./img/5_background/layers/air.png', 719 * 5),
			new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 5),
			new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 5),
			new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 5),

			new BackgroundObject('./img/5_background/layers/air.png', 719 * 6),
			new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 6),
			new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 6),
			new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 6),
		],

		[	
			new BottlesOnGround(), 
			new BottlesOnGround()
		],

		[
			new BottlesInAir('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 200),
			new BottlesInAir('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 220),
			new BottlesInAir('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 500),
			new BottlesInAir('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 700),

			new BottlesInAir('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 1200),
			new BottlesInAir('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 1500),
			new BottlesInAir('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 1900),
		],

		[
			new Coins('./img/8_coin/coin_1.png', 1000),
			new Coins('./img/8_coin/coin_1.png', 1100),
			new Coins('./img/8_coin/coin_1.png', 1200),
			new Coins('./img/8_coin/coin_1.png', 1300),
			new Coins('./img/8_coin/coin_1.png', 1400),
			new Coins('./img/8_coin/coin_1.png', 1500),
			new Coins('./img/8_coin/coin_1.png', 1600),
			new Coins('./img/8_coin/coin_1.png', 1700),
			new Coins('./img/8_coin/coin_1.png', 2000),
			new Coins('./img/8_coin/coin_1.png', 2000),
		]
	);
}
