var canvas,
ctx,
width = 1000,//theoretical size
height = 1000,
scale,
scaledWidth,//actual size
scaledHeight,
score,
alex,//the snake aka you
colliding = false;

window.addEventListener('keydown', this.keyPressed , false);
function init() {
  //Initialize the canvas
  canvas        = document.getElementById('gameCanvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx           = canvas.getContext('2d');
  scaledWidth   = window.innerWidth;
  scaledHeight  = window.innerHeight;
  ctx.width     = scaledWidth;
  ctx.height    = scaledHeight;
  scale         = scaledWidth / width;
  console.log('canvas is size: ' + scaledWidth + ' by ' + scaledHeight + ' with scale of ' + scale)

  reset()
  //Start running the game
  setInterval(function (){
    update()
  },75);
}

//run the game in intervals
function update() {
  ctx.clearRect(0, 0, scaledWidth, scaledHeight);
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = "3";
  ctx.rect(0, 0, scaledWidth, scaledHeight);
  ctx.stroke();
  drawAlex();
  if (alex.colliding(canvas)) {
    console.log("collision");
    colliding = true;
    setTimeout(function(){
      reset()
    }, 500);
  }
  else if (!colliding){
    console.log("moving");
    alex.move();
  }
}

//initialize game
function reset() {
  alex = new Snake();
  alex.x = 40;
  alex.y = 40;
  score = 0;
  colliding = false;
}
function drawAlex(){
  ctx.fillStyle = "red";
  ctx.fillRect(alex.x, alex.y, alex.width, alex.height);
}
function drawFood(){

}


function keyPressed(e) {
  var key = e.keyCode;
  e.preventDefault();
  if((key == 37 || key == 65) && alex.direction != "right") { //left key
    console.log("left");
    alex.direction = "left";
  }
  else if((key == 39 || key == 68) && alex.direction != "left") { //right key
    console.log("right");
    alex.direction = "right";
  }
  else if ((key == 38 || key == 87) && alex.direction != "down") { //up key
    console.log("up");
    alex.direction = "up";
  }
  else if ((key == 40 || key == 83) && alex.direction != "up") { //down key
    console.log("down");
    alex.direction = "down";
    }
  }
