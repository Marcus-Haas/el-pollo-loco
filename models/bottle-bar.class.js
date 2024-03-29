class BottleBar extends DrawableObject {

    x = 10;
    y = 100;
    width = 250;
    height = 70;

    IMAGES_BOTTLEBAR = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];


    constructor() {
        super();
        this.loadImagesArray(this.IMAGES_BOTTLEBAR);
        this.setPercentage(0, this.IMAGES_BOTTLEBAR);
    }
}