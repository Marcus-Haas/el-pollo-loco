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


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImagesArray(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


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


    setPercentage(percentage, images) {
        this.percentage = percentage;
        this.setImagesforBars(images);
    }


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


    setCoinStatus(coin_counter, images) {
        this.coin_counter = coin_counter;
        this.setImagesforBars(images);
    }


    setBottleSatus(bottle_counter, images) {
        this.bottle_counter = bottle_counter;
        this.setImagesforBars(images);
    }


    setImagesforBars(images) {
        let path = images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}
