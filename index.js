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
let score = 0;
let colorText = "black";

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
    }
}
let snake1 = initSnake("red");

let apple = {
    position: initPosition()
}

let apple2 = {
    position: initPosition()
}

let hati = {
    position: initPosition(),
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawApel(img, ctx, x, y) {
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}


var suara_mati = new Audio('assets/suara/game-over.mp3');
var suara_makan = new Audio('assets/suara/suara_makan.wav');
var suara_nambah_level = new Audio('assets/suara/nambah_level.mp3');
var suara_nyawa_berkurang = new Audio('assets/suara/nyawa_berkurang.wav');

let ok = false;



function antisipasi(object, i, y) {
    if (object.position.x === i && object.position.y === y) {
        object.position = initPosition();
    }
}

function drawScore(snake) {
    let scoreCanvas = document.getElementById("score1Board");
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    scoreCtx.font = "25px Arial";
    scoreCtx.fillStyle = colorText;
    if (score >= 10) {
        scoreCtx.fillText(score, 20, 40);
    } else {
        scoreCtx.fillText(score, 30, 40);
    }
}

const apel = new Image();
apel.onload = draw;
apel.src = 'assets/gambar/apple.png';

const gambar_nyawa = new Image();
gambar_nyawa.onload = draw;
gambar_nyawa.src = 'assets/gambar/nyawa.png';

let kepala_ular_kekiri = new Image();
kepala_ular_kekiri.onload = draw;
kepala_ular_kekiri.src = 'assets/gambar/kepala_kekiri.png';

let kepala_ular_kekanan = new Image();
kepala_ular_kekanan.onload = draw;
kepala_ular_kekanan.src = 'assets/gambar/kepala_kekanan.png';

let kepala_ular_keatas = new Image();
kepala_ular_keatas.onload = draw;
kepala_ular_keatas.src = 'assets/gambar/kepala_keatas.png';

let kepala_ular_kebawah = new Image();
kepala_ular_kebawah.onload = draw;
kepala_ular_kebawah.src = 'assets/gambar/kepala_kebawah.png';

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
       
        if(snake1.direction === DIRECTION.LEFT) {
            REDRAW_INTERVAL = WIDTH;
            drawApel(kepala_ular_kekiri, ctx, snake1.head.x, snake1.head.y);
        } else if(snake1.direction === DIRECTION.RIGHT) {
            REDRAW_INTERVAL = WIDTH;
            drawApel(kepala_ular_kekanan, ctx, snake1.head.x, snake1.head.y);
        } else if(snake1.direction === DIRECTION.UP) {
            REDRAW_INTERVAL = HEIGHT;
            drawApel(kepala_ular_keatas, ctx, snake1.head.x, snake1.head.y);
        } else if(snake1.direction === DIRECTION.DOWN) {
            REDRAW_INTERVAL = HEIGHT;
            drawApel(kepala_ular_kebawah, ctx, snake1.head.x, snake1.head.y);
        }
        for (let i = 1; i < snake1.body.length; i++) {
            if (i % 2 == 0) {
                drawCell(ctx, snake1.body[i].x, snake1.body[i].y, "#a4b4f1");
            } else {
                drawCell(ctx, snake1.body[i].x, snake1.body[i].y, "#5c7cfc");
            }
        }
        
        drawApel(apel, ctx, apple.position.x, apple.position.y);
        drawApel(apel, ctx, apple2.position.x, apple2.position.y);

        drawScore(snake1);
        

    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_WIDTH / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_HEIGHT / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple) {
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        suara_makan.play();
    }
}


function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple2);
    
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple2);
    
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple2);
    
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple2);
    
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        snake1 = initSnake("red");
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake1])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" || event.key === "a") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight" || event.key === "d") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp" || event.key === "w") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown" || event.key === "s") {
        turn(snake1, DIRECTION.DOWN);
    }
})

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            turn(snake1, DIRECTION.LEFT); 
        } else {
            turn(snake1, DIRECTION.RIGHT);
        }                       
    } else {
        if ( yDiff > 0 ) {
            turn(snake1, DIRECTION.UP);
        } else { 
            turn(snake1, DIRECTION.DOWN);
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

function initGame() {
    move(snake1);
}

initGame();