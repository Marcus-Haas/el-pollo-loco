class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 50;
    hurt_sound = new Audio('./audio/endboss_hurt.mp3');
    alert_x = 5100;
    alert = false;
    speed = 0.5;
    attack = false;
    dead = false;

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    offset = {
        top: 120,
        bottom: 10,
        left: 30,
        right: 20,
    };


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImagesArray(this.IMAGES_WALKING);
        this.loadImagesArray(this.IMAGES_ALERT);
        this.loadImagesArray(this.IMAGES_HURT);
        this.loadImagesArray(this.IMAGES_DEAD);
        this.loadImagesArray(this.IMAGES_ATTACK);
        this.x = 5100;
        this.offset.x += this.x;
        this.animate();
        this.checkAlert();

    }

    checkAlert() {
        let alert_interval = setInterval(() => {
            this.checkForEndbossBar();
            if (this.checkDifference() >= 50) {
                this.alert = true;
                setTimeout(() => {
                    this.alert = false;
                    this.alert_x = this.x;
                }, 1600);
            }
        }, 100);
        pushInterval(alert_interval);
    }


    animate() {
        let move_interval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        pushInterval(move_interval);

        let endboss_interval = setInterval(() => {
            this.endbossAnimations();
        }, 100);
        pushInterval(endboss_interval);
    }


    endbossAnimations() {
        if (this.isDead()) {
            this.deadFunction();
        } else if (this.isHurt()) {
            this.hurtFunction();
        } else if (this.alert) {
            this.alertFunction();
        } else if (this.attack) {
            this.attackFunction();
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    attackFunction() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.speed = 7
        this.alert_x = this.x;
        setTimeout(() => {
            this.attack = false;
        }, 2000);
    }


    deadFunction() {
        this.playAnimation(this.IMAGES_DEAD);
        this.endGame('win');
        if (master_sound) {
            this.hurt_sound.play();
        }
    }


    hurtFunction() {
        this.playAnimation(this.IMAGES_HURT);
        this.speed = 0;
        if (master_sound) {
            this.hurt_sound.play();
        }
        setTimeout(() => {
            this.speed = 0.5;
        }, 1500);
        setTimeout(() => {
        }, 500);
        this.attack = true;
    }


    alertFunction() {
        this.playAnimation(this.IMAGES_ALERT);
        this.speed = 0;
        setTimeout(() => {
            this.speed = 0.5;
        }, 1500);
    }


    checkDifference() {
        return this.alert_x - this.x;
    }
}