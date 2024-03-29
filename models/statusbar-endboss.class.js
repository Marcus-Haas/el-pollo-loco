class StatusbarEndboss extends DrawableObject {

    IMAGES_HEALTHBAR_ENDBOSS = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/2_statusbar_endboss/green.png'
    ];


    constructor() {
        super();
        this.loadImagesArray(this.IMAGES_HEALTHBAR_ENDBOSS);
        this.setPercentage(100, this.IMAGES_HEALTHBAR_ENDBOSS);
        this.x = 450;
        this.y = -10;
        this.width = 250;
        this.height = 70;
    }
}