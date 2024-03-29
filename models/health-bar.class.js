class HealthBar extends DrawableObject {

    IMAGES_HEALTHBAR = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];


    constructor() {
        super();
        this.loadImagesArray(this.IMAGES_HEALTHBAR);
        this.setPercentage(100, this.IMAGES_HEALTHBAR);
        this.x = 10;
        this.y = -10;
        this.width = 250;
        this.height = 70;
    }
}