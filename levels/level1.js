let level1;

function initLevel() {
    level1 = new Level(
        [
            new Endboss(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
        ],
        [
            new Cloud('./img/5_background/layers/4_clouds/1.png', 200),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 700),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 1100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 1600),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 2100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 2600),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 3100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 3600),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 4100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 4600),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 5100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 5600),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 6100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 6600),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 7100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 7600)
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

            new BackgroundObject('./img/5_background/layers/air.png', 719 * 7),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 7),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 7),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 7)
        ],
        [
            new Coin('./img/8_coin/coin_1.png', 500, 120),
            new Coin('./img/8_coin/coin_1.png', 570, 80),
            new Coin('./img/8_coin/coin_1.png', 640, 60),
            new Coin('./img/8_coin/coin_1.png', 710, 60),
            new Coin('./img/8_coin/coin_1.png', 780, 80),
            new Coin('./img/8_coin/coin_1.png', 850, 120),

            new Coin('./img/8_coin/coin_1.png', 2200, 120),
            new Coin('./img/8_coin/coin_1.png', 2250, 120),
            new Coin('./img/8_coin/coin_1.png', 2300, 120),
            new Coin('./img/8_coin/coin_1.png', 2350, 120),

            new Coin('./img/8_coin/coin_1.png', 3600, 120),
            new Coin('./img/8_coin/coin_1.png', 3670, 80),
            new Coin('./img/8_coin/coin_1.png', 3740, 60),
            new Coin('./img/8_coin/coin_1.png', 3810, 60),
            new Coin('./img/8_coin/coin_1.png', 3880, 80),
            new Coin('./img/8_coin/coin_1.png', 3950, 120),
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ]
    );
}