var canvas,
ctx,
width = 1000,//theoretical size
height = 1000,
scale,
scaledWidth,//actual size
scaledHeight,
score,
alex,//the snake aka you
apple,
colliding = false,
playing = false;

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
  console.log('canvas is size: ' + canvas.width + ' by ' + canvas.height + ' with scale of ' + scale)

  reset()
  //Start running the game
  setInterval(function (){
    update()
  },75);
}

//run the game in intervals
function update() {
  //don't update when there is a wall collision
  if (!colliding){
    ctx.clearRect(0, 0, scaledWidth, scaledHeight);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = "3";
    ctx.rect(0, 0, scaledWidth, scaledHeight);
    ctx.stroke();
    for (var i = 0; i < alex.body.length; i++){
       draw(alex.body[i], alex.body[i].color);
    }
    draw(apple, "black");
    //TODO add collision detection with body
    if (alex.collidingWall(canvas) || alex.collidingBody()){
      console.log('collision');
      colliding = true;
      setTimeout(function(){
        reset()
      }, 500);
    }
    //continue game
    else if (!colliding && playing){
      alex.move();
      if (alex.eating(apple)){
        alex.grow();
        addApple();
      }
    }
  }
}

//initialize game
function reset() {
  alex = new Snake();
  alex.head().direction = "right";
  for(var i = 0; i < 20; i++){
    alex.grow();
  }
  score = 0;
  colliding = false;
  playing = false;
  addApple();
}
function addApple() {
  apple = new Box(random(canvas.width), random(canvas.height));
}
function random(size) {
  return Math.floor((Math.random() * size) / 30) * 30;
}
function draw(object, color){
  ctx.fillStyle = color;
  ctx.fillRect(object.x, object.y, object.size, object.size);
}
function keyPressed(e){
  var key = e.keyCode;
  e.preventDefault();
  playing = true;
  if((key == 37 || key == 65) && alex.head().direction != "right") { //left key
    alex.head().direction = "left";
  }
  else if((key == 39 || key == 68) && alex.head().direction != "left") { //right key
    alex.head().direction = "right";
  }
  else if ((key == 38 || key == 87) && alex.head().direction != "down") { //up key
    alex.head().direction = "up";
  }
  else if ((key == 40 || key == 83) && alex.head().direction != "up") { //down key
    alex.head().direction = "down";
  }
}
