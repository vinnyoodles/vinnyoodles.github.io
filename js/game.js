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
exploding = false,
playing = false,
instruction_life = 100,
obstacles,
instruction_message = 'Use arrow keys or WASD to move! Collect all the blocks and don\'t hit anything',
particles = [];

window.addEventListener('keydown', this.keyPressed, false);

function init() {
	//Initialize the canvas
	canvas        = document.getElementById('gameCanvas');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx           = canvas.getContext('2d');
	obstacles = [
		getPosition(document.getElementById('me')),
		getPosition(document.getElementById('name')),
		getPosition(document.getElementById('footer'))
	]
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
	ctx.clearRect(0, 0, scaledWidth, scaledHeight);
	if (instruction_life > 1){
	  instruction_life --;
		ctx.globalAlpha = instruction_life / 100;
		ctx.font = ctx.font.replace(/\d+px/, "2em");
		ctx.fillText(instruction_message, scale * (scaledWidth / 6), scale * (3 * scaledHeight / 5) + instruction_life);
		ctx.globalAlpha = 1;
	}
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth = "3";
	ctx.rect(0, 0, scaledWidth, scaledHeight);
	ctx.stroke();
	if (exploding) {
		updateParticles(10);
	}
	else {
		for (var i = 0; i < alex.body.length; i++){
			draw(alex.body[i], alex.body[i].color);
		}
		draw(apple, "black");
	}
	//don't update when there is a wall collision
	if (!colliding){
		if (alex.collidingWall(canvas) || alex.collidingBody() || alex.collidingObjects(obstacles)){
			console.log('collision');
			colliding = true;
			setTimeout(function(){
				makeBoom();
				setTimeout(function(){
					reset();
				}, 1000);
			},300);
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
	exploding = false;
	particles = [];
	addApple();
}
function addApple() {
	var coor = random(canvas.width, canvas.height);
	apple = new Box(coor['x'], coor['y']);
}
function random(width, height) {
	var x, y;
	do {
		x = Math.floor((Math.random() * width) / 30) * 30;
		y = Math.floor((Math.random() * height) / 30) * 30;
	} while (isInsideHtmlElements(x, y) || isOnAlex(x, y));
	return {x: x, y: y};
}
function isOnAlex(x, y) {
	for (var i = 0; i < alex.body.length; i ++){
		if (alex.body[i].x == x && alex.body[i].y == y)
		  return true;
	}
	return false;

}
function isInsideHtmlElements(x, y){
	for(var i = 0; i < obstacles.length; i++){
		var obj = obstacles[i];
		if (isInBetween(x, x + alex.size, obj['x'] - 30, obj['x'] + obj['width'] + 30) &&
		    isInBetween(y, y + alex.size, obj['y'] - 30, obj['y'] + obj['height'] + 30)){
			return true;
		}
	}
	return false;
}
function updateParticles(frames){
	for (var i=0; i<particles.length; i++)
	{
		var particle = particles[i];
		particle.update(frames);
		particle.draw(ctx);
		if (!particle.alive) {
			particles.splice(i, 1);
		}
	}
}
function makeBoom(){
	exploding = true;
	alex.boom();
	apple.boom('black');
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
function getPosition(element) {
	var x = 0;
	var y = 0;
	var width = element.offsetWidth;
	var height = element.offsetHeight;
	while(element) {
		x += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		y += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}
	return {x: x, y: y, width: width, height: height};
}
