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


    setWorld() {
        this.character.world = this;
    }


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


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.dead == false && !this.character.isAboveGround()) {
                this.character.hit();
                this.character.pushback = true;
                this.healthBar.setPercentage(this.character.energy, this.healthBar.IMAGES_HEALTHBAR);
            }
        });
    }


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


    deadEnemy(enemy) {
        if (enemy.dead == true) {
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                this.bottle_hit = 0;
            }, 500);
        }
    }


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


    setBottleParameters(bottle) {
        bottle.speedY = 0;
        bottle.acceleration = 0;
        bottle.splash = true;
        this.bottle_hit += 1;
        clearInterval(bottle.throw_interval);
    }


    deadChickenViaBottle(bottle, enemy) {
        if (enemy instanceof Chicken && this.bottle_hit == 1 || enemy instanceof SmallChicken && this.bottle_hit == 1) {
            enemy.dead = true;
            bottle.deadChicken(enemy);
            this.deadEnemy(enemy);
        }
    }


    checkHitEndboss(enemy) {
        if (enemy instanceof Endboss && this.bottle_hit == 1) {
            enemy.hit();
            this.endbossBar.setPercentage(enemy.energy, this.endbossBar.IMAGES_HEALTHBAR_ENDBOSS);
            setTimeout(() => {
                this.bottle_hit = 0;
            }, 400);
        }
    }


    checkDeadEndboss(enemy) {
        if (enemy.energy == 0) {
            enemy.dead = true;
            this.deadEnemy(enemy);
        }
    }


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


    checkSplash() {
        for (let i = 0; i < this.throwableObject.length; i++) {
            if (this.throwableObject[i].splash) {
                setTimeout(() => {
                    this.throwableObject.splice(this.throwableObject.indexOf(i), 1);
                }, 400);
            }
        }
    }


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


    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);
        //mo.drawFrameOffset(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}