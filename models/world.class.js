class World {

    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new StatusbarEndboss();
    throwableObject = [];
    coin_counter = 0;
    bottle_counter = 0;
    collecting_bottle_audio = new Audio('./audio/collect_bottle.mp3');
    collecting_coin_audio = new Audio('./audio/collecting_coin.mp3');
    throw_audio = new Audio('./audio/throw.mp3');
    bottle_hit = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Combines charater with world
     * 
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Start several functions by setting an interval
     * 
     */
    run() {
        let run_Interval = setInterval(() => {
            this.checkCollisions();
            this.collectCoins();
            this.collectBottles();
            this.checkThrowObject();
            this.jumpKillEnemy();
            this.checkSplash();
            this.checkBottleCollision();
        }, 50);
        pushInterval(run_Interval);
    }


    /**
     * This function checks if the charcter is colliding with an enemy
     * 
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.dead == false && !this.character.isAboveGround()) {
                this.character.hit();
                this.character.pushback = true;
                this.healthBar.setPercentage(this.character.energy, this.healthBar.IMAGES_HEALTHBAR);
            }
        });
    }


    /**
     * This function checks if the enemy is hit by character jump on it
     * 
     */
    jumpKillEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                    this.character.jump();
                    this.character.deadChicken(enemy);
                    this.deadEnemy(enemy);
                }
            }
        });
    }


    /**
     * Delete the dead enemy from game
     * 
     * @param {object} enemy - is every new Enemy like chicken, small chicken and endboss
     */
    deadEnemy(enemy) {
        if (enemy.dead == true) {
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                this.bottle_hit = 0;
            }, 500);
        }
    }


    /**
     * Check if the bottle hit on the enemies
     * 
     */
    checkBottleCollision() {
        for (let i = 0; i < this.throwableObject.length; i++) {
            let bottle = this.throwableObject[i];
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.setBottleParameters(bottle);
                    this.deadChickenViaBottle(bottle, enemy);
                    this.checkHitEndboss(enemy);
                    this.checkDeadEndboss(enemy);
                }
            });
        }
    }


    /**
     * Set different parameters for the bottle if it hits the enemy and stop the throw interval
     * 
     * @param {string []} bottle - is the class throwable object
     */
    setBottleParameters(bottle) {
        bottle.speedY = 0;
        bottle.acceleration = 0;
        bottle.splash = true;
        this.bottle_hit += 1;
        clearInterval(bottle.throw_interval);
    }


    /**
     * Check if the chickens are hit by a bottle and set the dead parameter on true
     * 
     * @param {string []} bottle - is the class throwable object
     * @param {string []} enemy - is every new Enemy like chicken, small chicken and endboss
     */
    deadChickenViaBottle(bottle, enemy) {
        if (enemy instanceof Chicken && this.bottle_hit == 1 || enemy instanceof SmallChicken && this.bottle_hit == 1) {
            enemy.dead = true;
            bottle.deadChicken(enemy);
            this.deadEnemy(enemy);
        }
    }


    /**
     * Check if the endboss is hit by a bottle and change his energy and healthbar
     * 
     * @param {string []} enemy - is every new Enemy like chicken, small chicken and endboss
     */
    checkHitEndboss(enemy) {
        if (enemy instanceof Endboss && this.bottle_hit == 1) {
            enemy.hit();
            this.endbossBar.setPercentage(enemy.energy, this.endbossBar.IMAGES_HEALTHBAR_ENDBOSS);
            setTimeout(() => {
                this.bottle_hit = 0;
            }, 400);
        }
    }


    /**
     * Set the dead parameter to true if the enemies energy is zero
     * 
     * @param {string []} enemy - is every new Enemy like chicken, small chicken and endboss
     */
    checkDeadEndboss(enemy) {
        if (enemy.energy == 0) {
            enemy.dead = true;
            this.deadEnemy(enemy);
        }
    }


    /**
     * With this function the character is able to cellect coins from the map
     * 
     */
    collectCoins() {
        for (let i = 0; i < this.level.coins.length; i++) {
            if (this.character.isColliding(this.level.coins[i])) {
                this.coin_counter++;
                this.level.coins.splice(i, 1);
                this.coinBar.setCoinStatus(this.coin_counter, this.coinBar.IMAGES_COINBAR);
                if (master_sound) {
                    this.collecting_coin_audio.play();
                }
            }
        }
    }


    /**
     * With this function the character is able to cellect bottles from the map
     * 
     */
    collectBottles() {
        for (let i = 0; i < this.level.bottles.length; i++) {
            if (this.character.isColliding(this.level.bottles[i])) {
                this.level.bottles.splice(i, 1);
                this.bottle_counter++;
                this.bottleBar.setBottleSatus(this.bottle_counter, this.bottleBar.IMAGES_BOTTLEBAR);
                if (master_sound) {
                    this.collecting_bottle_audio.play();
                }
            }
        }
    }


    /**
     * Set new throwable object if pressed D on keyboard, only possible if already collect at least one bottle
     * 
     */
    checkThrowObject() {
        if (this.keyboard.D && this.bottle_counter > 0 && this.throwableObject.length <= 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
            this.throwableObject.push(bottle);
            this.bottle_counter--;
            this.bottleBar.setBottleSatus(this.bottle_counter, this.bottleBar.IMAGES_BOTTLEBAR);
            if (master_sound) {
                this.throw_audio.play();
            }
        }
    }



    /**
     * Delete the bottle if it splashs with an enemy or the ground
     * 
     */
    checkSplash() {
        for (let i = 0; i < this.throwableObject.length; i++) {
            if (this.throwableObject[i].splash) {
                setTimeout(() => {
                    this.throwableObject.splice(this.throwableObject.indexOf(i), 1);
                }, 400);
            }
        }
    }


    /**
     * Draw the canvas like the maximum capacity of the graphic card
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(- this.camera_x, 0);

        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.showStatusbarEndboss();

        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);


        this.ctx.translate(- this.camera_x, 0);

        let self = this;  // this funktioniert nicht innerhalb der nächsten funktion...eine variable stattdessen nutzen
        requestAnimationFrame(function () {  //draw wird immer wieder aufgerufen, was die Grafikkarte hergibt
            self.draw();
        });
    }



    /**
     * Show the healthbar from endboss if the parameter is true
     * 
     */
    showStatusbarEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.show_endboss_bar) {
                this.addToMap(this.endbossBar);
            }
        });
        if (this.character.show_endboss_bar) {
            this.addToMap(this.endbossBar);
        }
    }


    /**
     * Add new objects to the map/canvas
     * 
     * @param {string []}  objects - every new object
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }


    /**
     * Add objects to map/canvas with the option to flip image
     * 
     * @param {string []} mo - movable objects - every new object
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flip the image if change moving direction
     * 
     * @param {string []} mo - movable object like character or enemy
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * flip image back if you change move direction again
     * 
     * @param {string []} mo - movable object like character or enemy
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}