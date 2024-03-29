class ThrowableObject extends MovableObject {

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    IMAGES_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    splash = false;
    throw_interval;
    splash_counter = 0;
    splitter_audio = new Audio('./audio/glass_shatter.mp3');

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
    };

    constructor(x, y, otherDirection) {
        super();
        this.loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImagesArray(this.IMAGES_SPLASH);
        this.loadImagesArray(this.IMAGES_ROTATION);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.width = 60;
        this.height = 80;
        this.applyGravity();
        this.throw();
        this.bottleAnimation();
        this.bottleOnGround();
    }


    throw() {
        this.speedY = 25;
        let throw_interval = setInterval(() => {
            if (!this.otherDirection) {
                this.x += 10;
                this.offset.x = this.x + 15;
                this.offset.y = this.y + 10;
            } else {
                this.x -= 10;
                this.offset.x = this.x - 15;
                this.offset.y = this.y - 10;
            }
        }, 25);
        this.throw_interval = throw_interval;
    }


    bottleAnimation() {
        setInterval(() => {
            if (!this.splash) {
                this.playAnimation(this.IMAGES_ROTATION);
            } else {
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 150);
    }


    bottleOnGround() {
        let bottle_ground_interval = setInterval(() => {
            if (this.offset.y >= 350) {
                this.speedY = 0;
                clearInterval(this.throw_interval);
                this.splash = true;
                if (master_sound && this.splash) {
                    this.splitter_audio.play();
                    setTimeout(() => {
                        clearInterval(bottle_ground_interval);
                    }, 500);
                }
            }
        }, 25);
    }
}