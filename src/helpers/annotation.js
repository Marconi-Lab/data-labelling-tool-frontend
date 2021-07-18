exports.Segment = function(painting, ctx){
    this.painting = painting;
    this.ctx =  ctx;
    this.initialX = 0;
    this.initialY = 0;
    this.points = [];
}