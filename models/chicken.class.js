class Chicken extends MovableObject {
    x;
    y = 340;
    height = 85;
    width = 95;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = './img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
    };

    dead = false;
    dead_sound = new Audio('./audio/dead_enemy.mp3');


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImagesArray(this.IMAGES_WALKING);

        this.x = 400 + Math.random() * 5000;   // zahl zwischen 401 und 5800
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }


    animate() {
        let move_interval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        pushInterval(move_interval);
        
        let animation_interval = setInterval(() => {
            if (this.dead) {
                this.loadImage(this.IMAGE_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
        pushInterval(animation_interval);
    }
}