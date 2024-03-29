class Bottle extends MovableObject {

    y = 350;
    height = 80;
    width = 60;
    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
    };


    constructor() {
        super();
        this.loadImagesArray(this.IMAGES_BOTTLE);
        this.setBottles();
    }


    setBottles() {
        let version = Math.floor(Math.random() * 2); // zahl zwischen 1 und 2
        this.x = 400 + Math.random() * 4500;   // zahl zwischen 400 und 4500
        this.loadImage(this.IMAGES_BOTTLE[version]);
        this.offset.x += this.x;
    }
}