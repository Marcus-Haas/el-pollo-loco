class Character extends MovableObject {

    height = 280;
    width = 120;
    y = 155;
    speed = 8;
    world;
    idle_counter = 0;
    idle = false;
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    walking_sound = new Audio('./audio/walk.mp3');
    jump_sound = new Audio('./audio/jump.mp3');
    snoring_sound = new Audio('./audio/snoring.mp3');
    pain_audio = new Audio('./audio/pain.mp3');

    offset = {
        top: 120,
        bottom: 10,
        left: 25,
        right: 35,
    };


    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImagesArray(this.IMAGES_WALKING);
        this.loadImagesArray(this.IMAGES_JUMPING);
        this.loadImagesArray(this.IMAGES_DEAD);
        this.loadImagesArray(this.IMAGES_HURT);
        this.loadImagesArray(this.IMAGES_IDLE);
        this.loadImagesArray(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.checkForPushback();
        this.animate();
    }


    animate() {
        let moving_interval = setInterval(() => {
            this.pepeMovingFunction();
        }, 1000 / 60);
        pushInterval(moving_interval);

        let animation_interval = setInterval(() => {
            this.setIdleCounter();
            this.checkForEndbossBar();
            this.pepesAnimations();
        }, 100);
        pushInterval(animation_interval);
    }


    pepeMovingFunction() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.pepeWalkForward();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.pepeWalkBackward();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.pepeJumps();
        }
        this.world.camera_x = -this.x + 180;
    }


    pepeWalkForward() {
        this.moveRight();
        this.otherDirection = false;
        if (master_sound) {
            this.walking_sound.play();
        }
    }


    pepeWalkBackward() {
        this.moveLeft();
        this.otherDirection = true;
        if (master_sound) {
            this.walking_sound.play();
        }
    }


    pepeJumps() {
        this.jump();
        if (master_sound) {
            this.jump_sound.play();
        }
    }


    pepesAnimations() {
        if (this.isDead()) {
            this.walking_sound.pause();
            this.playAnimation(this.IMAGES_DEAD);
            if (master_sound) {
                this.pain_audio.play();
            }
            this.endGame('lost');
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            if (master_sound) {
                this.pain_audio.play();
            }
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.idle_counter >= 8) {
            this.sleep();
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    setIdleCounter() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.D || this.world.keyboard.SPACE || this.isHurt()) {
            this.idle_counter = 0;
            this.snoring_sound.pause();
        } else {
            this.idle_counter += 0.1;
        }
    }


    sleep() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        if (master_sound) {
            this.snoring_sound.play();
        }
    }

}