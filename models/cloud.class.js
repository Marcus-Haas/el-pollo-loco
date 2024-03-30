class Cloud extends MovableObject {

    y = 40;
    width = 500;
    height = 300;

    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
        this.animate();
    }


    /**
     * This function let the clouds moving
     * 
     */
    animate() {
        let move_interval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        pushInterval(move_interval);
    }
}