let canvas = document.querySelector("canvas");

canvas.width = 400;
canvas.height = 400;

let c = canvas.getContext("2d");

let x = 150, dx = 5;
let y = 150, dy = 2;
let radius = 20;
let lineWidth = 5;

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    draw();
}

function draw() {
    c.lineWidth = lineWidth;

    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.stroke();

    if (x + radius + lineWidth / 2 > canvas.width ||
        x - radius - lineWidth / 2 < 0) {
        dx = -dx;
    }
    if (y + radius + lineWidth / 2 > canvas.height ||
        y - radius - lineWidth / 2 < 0) {
        dy = -dy;
    }
    x += dx;
    y += dy;
}

animate();