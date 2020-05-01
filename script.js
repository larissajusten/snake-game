let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //tratar o arquivo como plano 2d
const velocidadeInicial = 150;

let box = 32;
let velocidadeAtual = velocidadeInicial;
let direcao = "right";

let cobrinha = [];
cobrinha[0] = {
  x: 8 * box,
  y: 8 * box
}

function geraNumeroAleatorio() {
  return Math.floor(Math.random() * 15 + 1) * box;
}
let frutinha = {
  x: geraNumeroAleatorio(),
  y: geraNumeroAleatorio()
}

function mantemLoopDaCobrinha() {
  if(cobrinha[0].x > 15 * box && direcao == "right") {
    clearInterval(jogo);
    alert("Game over!");
  }

  if(cobrinha[0].x < 0 && direcao == "left") {
    clearInterval(jogo);
    alert("Game over!");
  }

  if(cobrinha[0].y < 0 && direcao == "up") {
    clearInterval(jogo);
    alert("Game over!");
  }

  if(cobrinha[0].y > 15 * box && direcao == "down") {
    clearInterval(jogo);
    alert("Game over!");
  }
}

function verificaSeCobrinhaSeChoca() {
  for (i = 1; i < cobrinha.length; i++) {
    if (cobrinha[0].x === cobrinha[i].x 
      && cobrinha[0].y === cobrinha[i].y) {
      clearInterval(jogo);
      alert("Game over!");
    }
  }
}

function criarBG() {
  context.fillStyle = "lightgreen"; //estilo do canvas/contexto
  context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retangulo (pos x, pos y, largura, altura)
}

function criarCobrinha() {
  for (i = 0; i < cobrinha.length; i++) {
    context.fillStyle = "green";
    context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box); 
  }
}

function desenharFrutinha() {
  context.fillStyle = "red";
  context.fillRect(frutinha.x, frutinha.y, box, box);
}

function comportamentoDaCobrinha() {
  let cobrinhaPosicaoX = cobrinha[0].x; 
  let cobrinhaPosicaoY = cobrinha[0].y;

  if(direcao == "right") cobrinhaPosicaoX += box;
  if(direcao == "left") cobrinhaPosicaoX -= box;
  if(direcao == "up") cobrinhaPosicaoY -= box;
  if(direcao == "down") cobrinhaPosicaoY += box;

  if (cobrinhaPosicaoX == frutinha.x && cobrinhaPosicaoY == frutinha.y) {
    frutinha.x = geraNumeroAleatorio();
    frutinha.y = geraNumeroAleatorio();
    velocidadeAtual += 10;
    console.log(velocidadeAtual);
  } else {
    cobrinha.pop();
  }

  let newHead = {
    x: cobrinhaPosicaoX,
    y: cobrinhaPosicaoY
  }
  cobrinha.unshift(newHead);
}

document.addEventListener('keydown', atualizarEventoSetas);
function atualizarEventoSetas(event) {
  //KeyCode das setas é na direção horária
  if(event.keyCode == 37 && direcao !== "right") direcao = "left";
  if(event.keyCode == 38 && direcao !== "down") direcao = "up";
  if(event.keyCode == 39 && direcao !== "left") direcao = "right";
  if(event.keyCode == 40 && direcao !== "up") direcao = "down";
}

function iniciarJogo() {
  verificaSeCobrinhaSeChoca();
  mantemLoopDaCobrinha();
  criarBG();
  criarCobrinha();
  desenharFrutinha();
  comportamentoDaCobrinha();
}

let jogo = setInterval(iniciarJogo, velocidadeAtual);
