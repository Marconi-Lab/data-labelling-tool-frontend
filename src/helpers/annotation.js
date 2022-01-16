const {
    BIconTelephoneMinusFill
} = require("bootstrap-vue");

module.exports = {
    Segment: function (painting, ctx) {
        this.painting = painting;
        this.ctx = ctx;
        this.initialX = 0;
        this.initialY = 0;
        this.points = [];

        Object.defineProperties(this, {
            "pointsArray": {
                "get": () => this.points,
                "set": (payload) => this.points = payload
            }
        })

        this.startPainting = (e) => {
            this.painting = true;
            this.initialX = e.offsetX;
            this.initialY = e.offsetY;
            this.ctx.beginPath();
            // record points
            this.points.push([]);
            this.points[this.points.length - 1].push([e.offsetX, e.offsetY]);
            this.ctx.moveTo(e.offsetX, e.offsetY);
            this.draw(e);
        }
        this.draw = (e) => {
            if (!this.painting) return;
            this.ctx.lineWidth = 1;
            this.ctx.lineCap = "round";
            this.points[this.points.length - 1].push([e.offsetX, e.offsetY]);
            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();
            this.ctx.strokeStyle = "aqua";
            this.ctx.fillStyle = "rgba(0, 255, 255, 0.25)";
        }
        this.stopPainting = () => {
            this.ctx.lineTo(this.initialX, this.initialY);
            this.ctx.stroke();
            this.ctx.strokeStyle = "rgba(0, 255, 255, 0.25)";
            this.ctx.closePath();
            this.ctx.fill();
            this.painting = false;
        };
        this.drawShape = (points) => {
            this.ctx.lineWidth = 1;
            this.ctx.lineCap = "round";
            this.ctx.strokeStyle = "aqua";
            this.ctx.fillStyle = "rgba(0, 255, 255, 0.25)";
            for (let i = 0, j, p; i < points.length; i++) {
                let pts = points[i]
                this.ctx.beginPath();
                this.ctx.moveTo(pts[0][0], pts[0][1]);
                // console.log("Begin with: ", pts[0][0], pts[0][1]);
                for (j = 1; j < pts.length; j++) {
                    p = pts[j];
                    this.ctx.lineTo(p[0], p[1]);
                    this.ctx.stroke();
                    // console.log("Printing points: ", p);
                }
                this.ctx.lineTo(pts[0][0], pts[0][1]);
                this.ctx.stroke();
                this.ctx.closePath();
                this.ctx.fill();
                // console.log("Concluding shape: ", i);
            }
        };
        this.undoDrawing = () => {
            console.log("Points array: ", this.pointsArray.length, this.pointsArray)
            this.ctx.clearRect(0, 0, 512, 512)
            console.log("Removing path")
            let points = this.pointsArray
            points.pop()
            this.pointsArray = points
            console.log(this.pointsArray)
            console.log("Points array after pop: ", this.pointsArray.length, this.pointsArray)
            this.drawShape(this.pointsArray)
        }
    },
    BoundingBox: function (painting, ctx) {
        this.painting = painting;
        this.ctx = ctx;
        this.initialX = 0;
        this.initialY = 0;
        this.box = {
            width: 0,
            height: 0,
            left: this.initialX,
            right: this.initialY
        }

        this.startPainting = (e) => {
            this.initialX = e.offsetX;
            this.initialY = e.offsetY;
            this.ctx.beginPath();
            this.draw()
        }
        this.draw = (e) => {
            if (!this.painting)
                return
            this.ctx.rect(this.initialX, this.initialY, e.offsetX - this.initialX, this.initialY - e.offsetY);
            this.ctx.stroke();
            this.ctx.strokeStyle = "aqua";
            this.ctx.fillStyle = "rgba(0, 255, 255, 0.25)";
        }
    }
}