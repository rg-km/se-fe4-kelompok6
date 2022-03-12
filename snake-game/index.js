const CELL_SIZE = 15;
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 420;
let REDRAW_INTERVAL = 10;
const WIDTH = CANVAS_WIDTH / CELL_SIZE;
const HEIGHT = CANVAS_HEIGHT / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
let MOVE_INTERVAL = 120;
let nyawa = 3;
let level = 1;
let score = 0;
let colorText = "black";

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}