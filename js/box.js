var Box = function(x, y) {
  this.x = x;
  this.y = y;
  this.size = 30;
  this.direction = '';
  this.color = 'black';
  this.boom = function(color) {
    for (var i = 0; i < 20; i ++){
      var particle = new Particle(
        this.x + this.size / 2,
        this.y + this.size / 2,
        halfNegative(minSpeed + Math.random() * (maxSpeed - minSpeed)),
        halfNegative(minSpeed + Math.random() * (maxSpeed - minSpeed)),
        color,
        halfNegative(Math.random() * 360));
        particles.push(particle);
      }
    };
};
function halfNegative(num){
  if (Math.random() >= 0.5) {
    return num;
  }
  return -num;
}
