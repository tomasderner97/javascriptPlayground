class Plane {

    constructor(x, y, length=15, rotation=0, speed=0, color="black") {
        this._PATH = this._construct_path();

        this.x = x;
        this.y = y;
        this.length = length;
        this.rotation = rotation;
        this.speed = speed;
        this.color = color;
    }

    _construct_path() {
        let path = new Path2D();
        path.moveTo(0.5, 0);
        path.lineTo(-0.5, 0.3);
        path.lineTo(-0.5, -0.3);
        path.closePath();

        return path
    }

    draw(context) {
        context.save();

        context.translate(this.x, this.y);
        context.scale(this.length, this.length);
        context.rotate(this.rotation);

        context.fillStyle = this.color;
        context.fill(this._PATH);

        context.restore();
    }

    move() {
        let x_component = Math.cos(this.rotation);
        let y_component = Math.sin(this.rotation);

        this.x += x_component * this.speed;
        this.y += y_component * this.speed;
    }

    is_near(x, y, eps=5) {
        return (x - this.x)**2 + (y - this.y)**2 <= Math.pow(eps, 2);
    }
}