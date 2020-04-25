var balls = [];
var n = 10;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for (let i = 0; i < n; i++) {
        var diameter = 80 * Math.random() + 20;
        var position = [(width-diameter) * Math.random() + diameter/2, 
                        (height-diameter) * Math.random() + diameter/2];
        var color = [255 * Math.random(), 255 * Math.random(), 255 * Math.random()];
        var velocity = [10 * Math.random() - 5, 10 * Math.random() - 5];

        var ball = new Ball(position, color, diameter, velocity);
        balls.push(ball);
    }
}

function draw() {
    background(0);

    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        ball.move();
        ball.display();
    }
}

class Ball {
    constructor(position, color, diameter, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.diameter = diameter;
    }

    move() {
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];

        var bounce = this.detectCollision();
        this.velocity[0] *= bounce[0];
        this.velocity[1] *= bounce[1];
    }

    display() {
        noStroke()
        fill(this.color[0], this.color[1], this.color[2]);
        ellipse(this.position[0], this.position[1], this.diameter, this.diameter);
    }

    detectCollision() {
        var x = 1;
        var y = 1;
        if (this.position[0] - this.diameter/2 <= 0 || this.position[0] + this.diameter/2 >= width) {
            x = -1;
        }
        if (this.position[1] - this.diameter/2 <= 0 || this.position[1] + this.diameter/2 >= height) {
            y = -1;
        }
        return [x, y];
    }
}