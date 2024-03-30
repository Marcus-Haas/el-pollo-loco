class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    percentage = 100;
    coin_counter = 0;
    bottle_counter = 0;


    /**
     * This function load a single Image 
     * 
     * @param {string} path - home of the image at the image folder
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * This function load the different image arrays for animations
     * 
     * @param {string []} array - stands for the IMAGE_ARRAY of each animation
     */
    loadImagesArray(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * This function draw the images in the canvas
     * 
     * @param {string} ctx - canvas getContext('2d)
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This function draws a green rectangle on the border of every image
     * 
     * @param {string} ctx - canvas getContext('2d)
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Coin || this instanceof Bottle || this instanceof Chicken ||
            this instanceof Endboss || this instanceof ThrowableObject || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * This function draws a red rectangle on the border of every image to the new defined offset points
     * 
     * @param {string} ctx - canvas getContext('2d)
     */
    drawFrameOffset(ctx) {
        if (this instanceof Coin || this instanceof Bottle || this instanceof Endboss || this instanceof ThrowableObject ||
            this instanceof Chicken || this instanceof Character || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left,
                this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }


    /**
     * This function change the percentage parameter call another function 
     * 
     * @param {number} percentage - percentage between 0 and 100
     * @param {string} images - diffrent pictures of the for example health bar in game 
     */
    setPercentage(percentage, images) {
        this.percentage = percentage;
        this.setImagesforBars(images);
    }


    /**
     * this function generate a index between 0 and 5 by checking different parameters 
     * 
     * @returns a number between 0 and 5 
     */
    resolveImageIndex() {
        if (this.percentage == 100 || this.coin_counter > 14 || this.bottle_counter > 8) {
            return 5;
        } else if (this.percentage > 80 || this.coin_counter > 10 || this.bottle_counter > 6) {
            return 4;
        } else if (this.percentage > 60 || this.coin_counter > 6 || this.bottle_counter > 4) {
            return 3;
        } else if (this.percentage > 40 || this.coin_counter > 3 || this.bottle_counter > 2) {
            return 2;
        } else if (this.percentage > 20 || this.coin_counter > 0 || this.bottle_counter > 0) {
            return 1;
        } else {
            return 0;
        }
    }


    /**
     * This function set the coin status from empty to full and show the right picture for the coinbar
     * 
     * @param {number} coin_counter - +1 by collecting a coin
     * @param {string} images - image for the coinbar
     */
    setCoinStatus(coin_counter, images) {
        this.coin_counter = coin_counter;
        this.setImagesforBars(images);
    }


    /**
     * This function set the bottle status from empty to full and show the right picture for the bottlebar
     * 
     * @param {number} bottle_counter - +1 by collecting a bottle
     * @param {string} images - image for the bottlebar
     */
    setBottleSatus(bottle_counter, images) {
        this.bottle_counter = bottle_counter;
        this.setImagesforBars(images);
    }


    /**
     * This function chosse the right picture from the actual status of each bar in the game
     * 
     * @param {string} images - picture of the actual status of diffrent bars
     */
    setImagesforBars(images) {
        let path = images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}
