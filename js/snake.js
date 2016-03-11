var Snake = function() {
  this.body = [];
  this.body.push(new Box(30, 30));
  this.length = 1;
  this.head = function() {
    return this.body[0];
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
    this.grow();
    this.body.pop();
    this.length--;
  }
  this.grow = function() {
    this.body.unshift(this.newHead());
    this.length++;
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
