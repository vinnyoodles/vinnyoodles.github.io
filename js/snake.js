var Snake = function() {
  this.body = [];
  var head = new Box(30, 30);
  head.color = randomColor();
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
        new_head = new Box(this.head().x,                    this.head().y - this.head().size);
        new_head.direction = "up";
        break;
      case "down":
        new_head = new Box(this.head().x,                    this.head().y + this.head().size);
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
  this.collidingWall = function(canvas){
    return (this.head().x <= 0                                && this.head().direction == 'left') ||
           (this.head().y <= 0                                && this.head().direction == 'up') ||
           (this.head().x + this.head().size >= canvas.width  && this.head().direction == 'right') ||
           (this.head().y + this.head().size >= canvas.height && this.head().direction == 'down');
  }
  this.collidingObjects = function(objects) {
    var head = this.head();
    for(var i = 0; i < objects.length; i++){
      if (this.collidingObject(objects[i])){
        return true;
      }
    }
    return false;
  }
  this.collidingObject = function(object) {
      var head = this.head();
      var x = object['x'];
      var y = object['y'];
      var width = x + object['width'];
      var height = y + object['height'];
      return (head.direction == 'up'    && head.y <= height && head.y >= y && isInBetween(head.x, head.x + head.size, x, width)) ||
      (head.direction == 'down'  && head.y + head.size >= y      && head.y <= height && isInBetween(head.x, head.x + head.size, x, width)) ||
      (head.direction == 'right' && head.x + head.size >= x      && head.x <= width && isInBetween(head.y, head.y + head.size, y, height)) ||
      (head.direction == 'left'  && head.x <= width  && head.x >= x && isInBetween(head.y, head.y + head.size, y, height));
  }
  this.collidingBody = function() {
    for(var i = 1; i < this.body.length; i++) {
      if (this.head().x == this.body[i].x && this.head().y == this.body[i].y) {
        return true;
      }
    }
    return false;
  }
  this.eating = function(apple){
    return this.head().x == apple.x && this.head().y == apple.y;
  }
  this.boom = function() {
    for (var i = 0; i < this.body.length; i++) {
      this.body[i].boom(this.body[i].color);
    }
  }
};
function isInBetween(left_point, right_point, here, there) {
  return (left_point  > here && left_point  < there) ||
  (right_point > here && right_point < there);
}
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
