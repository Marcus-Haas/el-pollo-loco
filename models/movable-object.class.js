class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    pushback = false;
    pushback_counter = 0;
    show_endboss_bar = false;


    applyGravity() {
        let gravity_interval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
        pushInterval(gravity_interval);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 154;
        }
    }


    checkForEndbossBar() {
        if (this instanceof Character && this.x >= 4000) {
            this.show_endboss_bar = true;
        } if (this instanceof Endboss && this.x <= 4000) {
            this.show_endboss_bar = true;
        }
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    hit() {
        if (this instanceof Endboss) {
            this.energy -= 12;
        } else {
            this.energy -= 10;
        }
        if (this instanceof Endboss && this.energy <= 5) {
            this.energy = 0;
        } else if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.energy == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    deadChicken(mo) {
        mo.speed = 0;
        mo.dead = true;
        if (master_sound) {
            mo.dead_sound.play();
        }
    }


    checkForPushback() {
        let pushback_Intervall = setInterval(() => {
            if (this.pushback == true && this.x >= 120) {
                this.x -= 5;
                this.pushback_counter++;
                this.stopPushback();
            }
        }, 5);
        pushInterval(pushback_Intervall);
    }


    stopPushback() {
        if (this.pushback_counter >= 25) {
            this.pushback_counter = 0;
            this.pushback = false;
        }
    }


    endGame(result) {
        setTimeout(() => {
            clearAllIntervals();
            showEndscreen(result);
        }, 1500);
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;             // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0,......
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    };


    jump() {
        this.speedY = 30;
    };
}