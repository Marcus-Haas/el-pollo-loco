class Coin extends MovableObject {

    x;
    y = 120;
    height = 150;
    width = 150;
    IMAGES_PULSATION = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png',
    ];

    offset = {
        top: 55,
        bottom: 55,
        left: 55,
        right: 55,
    };


    constructor(path, x, y) {
        super();
        this.loadImagesArray(this.IMAGES_PULSATION);
        this.loadImage(path);
        this.x = x;
        this.y = y;
        this.animate();
        this.offset.x += x;
        this.offset.y += y;
    }


    /**
     * This function set an interval and create a pulsation for the coins
     * 
     */
    animate() {
        let pulsation_interval = setInterval(() => {
            this.playAnimation(this.IMAGES_PULSATION);
        }, 300);
        pushInterval(pulsation_interval);
    }
}
