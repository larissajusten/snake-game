let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //tratar o arquivo como plano 2d
const velocidadeInicial = 150;

let box = 32;
let velocidadeAtual = velocidadeInicial;
let direction = "right";

let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box
}

const numeroRandomico = Math.floor(Math.random() * 15 + 1) * box;
let frutinha = {
  x: numeroRandomico,
  y: numeroRandomico
}

function criarBG() {
  context.fillStyle = "lightgreen"; //estilo do canvas/contexto
  context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retangulo (pos x, pos y, largura, altura)
}

function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box); 
  }
}

function desenharFrutinha() {
  context.fillStyle = "red";
  context.fillRect(frutinha.x, frutinha.y, box, box);
}

document.addEventListener('keydown', update);
function update(event) {
  //KeyCode das setas é na direção horária
  if(event.keyCode == 37 && direction !== "right") direction = "left";
  if(event.keyCode == 38 && direction !== "down") direction = "up";
  if(event.keyCode == 39 && direction !== "left") direction = "right";
  if(event.keyCode == 40 && direction !== "up") direction = "down";
}

function iniciarJogo() {
  if(snake[0].x >= 15 * box && direction == "right") {
    snake[0].x = 0;
  }

  if(snake[0].x <= 0 && direction == "left") {
    snake[0].x = 16 * box;
  }

  if(snake[0].y <= 0 && direction == "up") {
    snake[0].y = 16 * box;
  }

  if(snake[0].y >= 15 * box && direction == "down") {
    snake[0].y = 0;
  }

  criarBG();
  criarCobrinha();
  desenharFrutinha();

  let snakePosicaoX = snake[0].x; 
  let snakePosicaoY = snake[0].y;

  if(direction == "right") snakePosicaoX += box;
  if(direction == "left") snakePosicaoX -= box;
  if(direction == "up") snakePosicaoY -= box;
  if(direction == "down") snakePosicaoY += box;

  snake.pop();

  let newHead = {
    x: snakePosicaoX,
    y: snakePosicaoY
  }
  
  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, velocidadeAtual);
