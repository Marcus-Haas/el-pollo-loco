class CoinBar extends DrawableObject {

    IMAGES_COINBAR = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];


    constructor() {
        super();
        this.loadImagesArray(this.IMAGES_COINBAR);
        this.setPercentage(0, this.IMAGES_COINBAR);
        this.x = 10;
        this.y = 45;
        this.width = 250;
        this.height = 70;
    }
}