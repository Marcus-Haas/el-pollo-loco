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


    /**
     * implement gravity element into the game
     * 
     */
    applyGravity() {
        let gravity_interval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
        pushInterval(gravity_interval);
    }



    /**
     * This function says, that the object is above the ground
     * 
     * @returns always true for bottles, charater if higher than y position is lower 154
     * 
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 154;
        }
    }


    /**
     * If true, the healthbar from the endboss will shown
     * 
     */
    checkForEndbossBar() {
        if (this instanceof Character && this.x >= 4000) {
            this.show_endboss_bar = true;
        } if (this instanceof Endboss && this.x <= 4000) {
            this.show_endboss_bar = true;
        }
    }


    /**
     * This function compares the postion of the character with the position of enemies and collectable objects
     * 
     * @param {object} mo - movable objects like enemies, bottles and coins
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * set energy parameters from character and endboss and get Time for lastHit parameter
     * 
     */
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


    /**
     * this function say that the object is dead
     * 
     * @returns set energy to zero (number)
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * set timepassed parameter, if < than 1, the character is hurt
     * 
     * @returns number
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Play dead sound, set dead parameter to true and stop movement of the enemy
     * 
     * @param {object} mo - movable object (enemies)
     */
    deadChicken(mo) {
        mo.speed = 0;
        mo.dead = true;
        if (master_sound) {
            mo.dead_sound.play();
        }
    }


    /**
     * If pushback true, start pushback counter and set x postion for character
     * 
     */
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



    /**
     * This function stop the pushback after the character get hurt and set the parameter to false
     * 
     */
    stopPushback() {
        if (this.pushback_counter >= 25) {
            this.pushback_counter = 0;
            this.pushback = false;
        }
    }

    /**
     * This function check if you had win or losos the game and show you the endscreen
     * 
     * @param {string} result - show if you win or loose the game 
     */
    endGame(result) {
        setTimeout(() => {
            clearAllIntervals();
            showEndscreen(result);
        }, 1500);
    }


    /**
     * This function play the animation by using several images
     * 
     * @param {string} images - path of the images at image folder
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Objects move right
     * 
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Objects move left
     * 
     */
    moveLeft() {
        this.x -= this.speed;
    };


    /**
     * Let the character jump
     * 
     */
    jump() {
        this.speedY = 30;
    };
}