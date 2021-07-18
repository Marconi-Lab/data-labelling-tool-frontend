exports.Segment = function (painting, ctx) {
    this.painting = painting;
    this.ctx = ctx;
    this.initialX = 0;
    this.initialY = 0;
    this.points = [];

    this.startPainting = (e) => {
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
    this.drawSegment = (e) => {
        if (!this.painting) return;
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = "round";
        this.points[this.points.length - 1].push([e.offsetX, e.offsetY]);
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        this.ctx.strokeStyle = "aqua";
        this.ctx.fillStyle = "rgba(0, 255, 255, 0.25)";
    }
}