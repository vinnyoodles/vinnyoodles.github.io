var maxSpeed = 250;
var minSpeed = 50;
var Particle = function(x, y, vx, vy, color, degrees) {
  this.x = x;
  this.y = y;
  this.size = 10;
  this.color = color;
  this.vx = vx;
  this.vy = vy;
  this.alive = true;
  this.life = 100;
  this.rotation = degrees;
  this.update = function(ms)
  {
    // moving away from explosion center
    var delta = ms / 250.0;
    this.x += this.vx * delta;
    this.y += this.vy * delta;
    this.rotation -= this.rotation * delta;
    this.life -= 5;
    if (this.life < 1) {
      this.alive = false;
    }
  };
  this.draw = function(ctx)
  {
    if (this.alive){
      ctx.globalAlpha = this.life / 300;
      ctx.lineWidth = '2';
      ctx.strokeStyle = this.color;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation * Math.PI / 180);
      ctx.fillRect(0, 0, this.size, this.size);
      ctx.rect(0, 0, this.size, this.size);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.rotate(-this.rotation * Math.PI / 180);
      ctx.translate(-this.x, -this.y);
    }
  };
};
