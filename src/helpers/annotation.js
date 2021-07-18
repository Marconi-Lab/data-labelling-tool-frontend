exports.Segment = function(painting, ctx){
    this.painting = painting;
    this.ctx =  ctx;
    this.initialX = 0;
    this.initialY = 0;
    this.points = [];

    this.startPainting = (e) =>{
        this.painting = true;
        this.initialX = e.offsetX;
        this.initialY = e.offsetY;
        this.ctx.beginPath();
        // record points
        this.points.push([]);
        this.points[this.points.length - 1].push([e.offsetX, e.offsetY]);
        this.ctx.moveTo(e.offsetX, e.offsetY);
        this.drawSegment(e);
    }
    this.drawSegment = (e) =>{
        
    }
}