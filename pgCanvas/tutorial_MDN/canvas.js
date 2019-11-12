let canvas = document.querySelector("canvas");

canvas.width = 400;
canvas.height = 400;

let c = canvas.getContext("2d");

function draw() {
    setTimeout(draw, 1000);

    c.clearRect(0, 0, canvas.width, canvas.height);

    c.save();

    c.fillStyle = "green";
    c.fillRect(30, 30, 100, 100);
    c.rotate((Math.PI / 180) * 25);

    c.fillStyle = "grey";
    c.fillRect(30, 30, 100, 100);

    c.restore();
    c.save();

    c.fillStyle = "blue";
    c.fillRect(150, 30, 100, 100);
    c.translate(200, 80);
    c.rotate((Math.PI / 180) * 25);
    c.translate(-200, -80);

    c.fillStyle = "grey";
    c.fillRect(150, 30, 100, 100);
    c.restore();
}

window.onload = () => draw();