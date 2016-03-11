var Snake = function() {
  this.body = [];
  var head = new Box(30, 30);
  head.color = randomColor();
  console.log(head.color);
  this.body.push(head);
  this.head = function() {
    return this.body[0];
  }
  this.tail = function() {
    return this.body[this.body.count - 1];
  }
  this.newHead = function() {
    var new_head = "";
    switch(this.head().direction) {
      case "up":
        new_head = new Box(this.head().x, this.head().y - this.head().size);
        new_head.direction = "up";
        break;
      case "down":
        new_head = new Box(this.head().x, this.head().y + this.head().size);
        new_head.direction = "down";
        break;
      case "right":
        new_head = new Box(this.head().x + this.head().size, this.head().y);
        new_head.direction = "right";
        break;
      case "left":
        new_head = new Box(this.head().x - this.head().size, this.head().y);
        new_head.direction = "left";
        break;
      }
    return new_head;
  }
  this.move = function() {
    var head = this.newHead();
    head.color = this.head().color;
    this.body.unshift(head);
    for (var i = 1; i < this.body.length - 1; i ++){
      this.body[i].color = this.body[i + 1].color;
    }
    this.body.pop();
  }
  this.grow = function() {
    var head = this.newHead();
    head.color = modifyColor(this.head().color, -0.01);
    this.body.unshift(head);
  }
  this.colliding = function(canvas){
    return (this.head().x <= 0 && this.head().direction == 'left') ||
    (this.head().y <= 0 && this.head().direction == 'up') ||
    (this.head().x + this.head().size >= canvas.width && this.head().direction == 'right') ||
    (this.head().y + this.head().size >= canvas.height && this.head().direction == 'down');
  }
  this.eating = function(apple){
    return this.head().x == apple.x && this.head().y == apple.y;
  }
};

function randomColor() {
  var colors = ['#ffcccc', '#ffffcc', '#ccffcc', '#ccffff', '#ccccff', '#ffccff'];
  return colors[Math.floor(Math.random() * colors.length)];
}
function modifyColor(hex, lum) {
  // validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}
