window.onload = animate;

let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let mouse_x = 0, mouse_y = 0;
canvas.addEventListener("mousemove", (ev => {
    let mousePosition = getMousePosition(canvas, ev);
    mouse_x = mousePosition.x;
    mouse_y = mousePosition.y;
}));

function maybeChangePoint(planes) {
    for (let plane of planes)
        if (plane.is_near(mouse_x, mouse_y)) {
            mouse_x = Math.random() * canvas.width;
            mouse_y = Math.random() * canvas.height;
            return;
        }
}

let planes = [];
let colors = [
    "blue",
    "red",
    "yellow",
    "orange",
    "pink",
    "purple",
    "green",
    "cyan",
    "magenta",
];

for (let c of colors) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    let rotation = Math.random() * 2 * Math.PI;
    planes.push(new Plane(x, y, 30, rotation, 0, c));
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    }

}

function animate(timestamp) {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    draw(timestamp);
}

function draw(timestamp) {
    maybeChangePoint(planes);

    c.beginPath();
    c.arc(mouse_x, mouse_y, 4, 0, Math.PI * 2);
    c.fill();

    for (let plane of planes) {
        followCursorSmoothly(plane);
        cyclicBoundary(plane);
        plane.draw(c);
    }
}

function cyclicBoundary(plane) {
    plane.x = (plane.x + canvas.width) % canvas.width;
    plane.y = (plane.y + canvas.height) % canvas.height;
}

function followCursor(plane) {
    if (plane.is_near(mouse_x, mouse_y)) return;
    let x_difference = mouse_x - plane.x;
    let y_difference = mouse_y - plane.y;

    plane.rotation = Math.atan2(y_difference, x_difference);
    plane.move();
}

function followCursorSmoothly(plane) {
    let FORCE = 10;
    let FRICTION = 0.97;

    if (plane.is_near(mouse_x, mouse_y)) return;

    let x_difference = mouse_x - plane.x;
    let y_difference = mouse_y - plane.y;

    let distance_sq = x_difference ** 2 + y_difference ** 2;
    let angle = Math.atan2(y_difference, x_difference);

    let dv_x = FORCE / Math.sqrt(distance_sq) * Math.cos(angle);
    let dv_y = FORCE / Math.sqrt(distance_sq) * Math.sin(angle);

    let v_x = plane.speed * Math.cos(plane.rotation) * FRICTION + dv_x;
    let v_y = plane.speed * Math.sin(plane.rotation) * FRICTION + dv_y;

    plane.speed = Math.sqrt(v_x ** 2 + v_y ** 2);
    plane.rotation = Math.atan2(v_y, v_x);

    plane.move();
}

