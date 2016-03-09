var Snake = function() {
  this.x = 0;
  this.y = 0;
  this.width = 20;
  this.height = 20;
  this.displacement = 20;
  this.direction = "";
  this.move = function() {
    // console.log("x = " + this.x + " y = " + this.y);
    if (this.direction == "up"){
      this.y -= this.displacement;
    }
    else if (this.direction == "down"){
      this.y += this.displacement;

    }
    else if (this.direction == "left"){
      this.x -= this.displacement;

    }
    else if (this.direction == "right"){
      this.x += this.displacement;
    }
  }
  this.colliding = function(canvas) {
    return (this.x <= 0 && this.direction == 'left') ||
           (this.y <= 0 && this.direction == 'up') ||
           (this.x + this.width >= canvas.width && this.direction == 'right') ||
           (this.y + this.height >= canvas.height && this.direction == 'down');
  }
};
