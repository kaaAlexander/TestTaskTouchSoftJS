'use strict';
let timeout;
let move;
let snakeHeadCoordinates = [];
let snake = [];
let apple = [];
let eat;
let score = 0;
let crash = false;

function createGameArea() {
    for (let coordinateX = 0; coordinateX < 20; coordinateX++) {
        for (let coordinateY = 0; coordinateY < 20; coordinateY++) {
            let div = document.createElement('div');
            div.id = coordinateX.toString() + 'x' + coordinateY.toString() + 'y';
            let gameArea = document.getElementById('gameArea');
            gameArea.appendChild(div);
        }
    }
}

function initApple() {
    let repeat = true;
    let appleCoordinateX;
    let appleCoordinateY;
    while (repeat) {
        appleCoordinateX = Math.floor(Math.random() * 20);
        appleCoordinateY = Math.floor(Math.random() * 20);
        for (let i = 0; i < snake.length; i++) {
            if (snake[i][0] == appleCoordinateX && snake[i][1] == appleCoordinateY) {
                repeat = true;
                break;
            } else {
                repeat = false;
            }
        }
    }
    apple[0] = appleCoordinateX;
    apple[1] = appleCoordinateY;
    document.getElementById(appleCoordinateX.toString() + 'x' + appleCoordinateY.toString() + 'y').setAttribute('class', 'apple');
}

function initSnake() {
    let snakeCoordinateX = Math.floor(Math.random() * 14) + 3;
    let snakeCoordinateY = Math.floor(Math.random() * 14) + 3;
    snakeHeadCoordinates.push(snakeCoordinateX, snakeCoordinateY);
    snake.push([snakeCoordinateX, snakeCoordinateY]);
    if (snakeCoordinateY > 10) {
        for (let i = 0; i < 2; i++) {
            snakeCoordinateY = snakeCoordinateY + 1;
            snake.push([snakeCoordinateX, snakeCoordinateY]);
            let coordinate = snake[i][0].toString() + 'x' + snake[i][1].toString() + 'y';
            document.getElementById(coordinate).setAttribute('class', 'snake');
            moveLeft();
        }
    } else {
        for (let i = 0; i < 2; i++) {
            snakeCoordinateY = snakeCoordinateY - 1;
            snake.push([snakeCoordinateX, snakeCoordinateY]);
            let coordinate = snake[i][0].toString() + 'x' + snake[i][1].toString() + 'y';
            document.getElementById(coordinate).setAttribute('class', 'snake');
            moveRight();
        }
    }
}

function checkEatApple() {
    eat = false;
    if (snakeHeadCoordinates[0] == apple[0] && snakeHeadCoordinates[1] == apple[1]) {
        snake.unshift([apple[0], apple[1]]);
        eat = true;
        score = score + 1;
        initApple();
    }
}

function checkCrash() {
    for (let i = 0; i < snake.length; i++) {
        if (snakeHeadCoordinates[0] == snake[i][0] && snakeHeadCoordinates[1] == snake[i][1]) {
            crash = true;
        }
    }
}

function endGame() {
    alert('Game over! Your score: ' + score);
    location.reload();
}

function snakeRendering() {
    for (let i = 0; i < snake.length; i++) {
        let array = snake[i];
        let coordinate = array[0].toString() + 'x' + array[1].toString() + 'y';
        document.getElementById(coordinate).setAttribute('class', 'snake');
    }
}

function moveLeft() {
    if (move != 'right') {
        clearTimeout(timeout);
        if (snakeHeadCoordinates [1] > 0) {
            snakeHeadCoordinates [1] = snakeHeadCoordinates [1] - 1;
            checkCrash();
            checkEatApple();
            if (!eat) {
                let coordinate = snake[snake.length - 1][0].toString() + 'x' + snake[snake.length - 1][1].toString() + 'y';
                document.getElementById(coordinate).setAttribute('class', 'areaDiv');
                snake.pop();
                snake.unshift([snakeHeadCoordinates[0], snakeHeadCoordinates[1]]);
            }
            move = 'left';
        } else {
            crash = true;
        }
        if (!crash) {
            snakeRendering();
            timeout = setTimeout(moveLeft, 500);
        } else {
            endGame();
        }
    }
}

function moveRight() {
    if (move != 'left') {
        clearTimeout(timeout);
        if (snakeHeadCoordinates [1] < 19) {
            snakeHeadCoordinates [1] = snakeHeadCoordinates [1] + 1;
            checkCrash();
            checkEatApple();
            if (!eat) {
                let coordinate = snake[snake.length - 1][0].toString() + 'x' + snake[snake.length - 1][1].toString() + 'y';
                document.getElementById(coordinate).setAttribute('class', 'areaDiv');
                snake.pop();
                snake.unshift([snakeHeadCoordinates[0], snakeHeadCoordinates[1]]);
            }
            move = 'right';
        } else {
            crash = true;
        }
        if (!crash) {
            snakeRendering();
            timeout = setTimeout(moveRight, 500);
        } else {
            endGame();
        }
    }
}

function moveUp() {
    if (move != 'down') {
        clearTimeout(timeout);
        if (snakeHeadCoordinates [0] > 0) {
            snakeHeadCoordinates [0] = snakeHeadCoordinates [0] - 1;
            checkCrash();
            checkEatApple();
            if (!eat) {
                let coordinate = snake[snake.length - 1][0].toString() + 'x' + snake[snake.length - 1][1].toString() + 'y';
                document.getElementById(coordinate).setAttribute('class', 'areaDiv');
                snake.pop();
                snake.unshift([snakeHeadCoordinates[0], snakeHeadCoordinates[1]]);
            }
            move = 'up';
        } else {
            crash = true;
        }
        if (!crash) {
            snakeRendering();
            timeout = setTimeout(moveUp, 500);
        } else {
            endGame();
        }
    }
}

function moveDown() {
    if (move != 'up') {
        clearTimeout(timeout);
        if (snakeHeadCoordinates [0] < 19) {
            snakeHeadCoordinates [0] = snakeHeadCoordinates [0] + 1;
            checkCrash();
            checkEatApple();
            if (!eat) {
                let coordinate = snake[snake.length - 1][0].toString() + 'x' + snake[snake.length - 1][1].toString() + 'y';
                document.getElementById(coordinate).setAttribute('class', 'areaDiv');
                snake.pop();
                snake.unshift([snakeHeadCoordinates[0], snakeHeadCoordinates[1]]);
            }
            move = 'down';
        } else {
            crash = true;
        }
        if (!crash) {
            snakeRendering();
            timeout = setTimeout(moveDown, 500);
        } else {
            endGame();
        }
    }
}

function startGame() {
    createGameArea();
    initSnake();
    initApple();
    snakeRendering();
    alert('Start game ?');
}

function readKey(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        default:
            return;
    }
    event.preventDefault();
}


window.onload = startGame();
