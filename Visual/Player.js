class Player extends Rect {
    constructor(
        position,
        size,
        color = 'white',
    ) {
        super(position, size, color);
        this.canvas = canvas;
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    onMouseMove(event) {
        let rect = this.canvas.getBoundingClientRect();
        let rectHorizontalBounds = new Range(rect.left, rect.width);
        let rectVerticalBounds = new Range(rect.top, rect.height);
        let canvasHorizontalBounds = new Range(0, this.canvas.width);
        let canvasVerticalBounds = new Range(0, this.canvas.height);

        let root = document.documentElement;
        let mousePositionRelativeToRect = new Position(
            (event.clientX - rect.left - root.scrollLeft),
            (event.clientY - rect.top - root.scrollTop)
        );
        let mousePercentage = new Position(
            mousePositionRelativeToRect.x/rectHorizontalBounds.upperBound,
            mousePositionRelativeToRect.y/rectVerticalBounds.upperBound
        );

        let newX = mousePercentage.x * canvasHorizontalBounds.upperBound - this.size.width/3;
        let newY = mousePercentage.y * canvasVerticalBounds.upperBound - this.size.height/3;

        this.position.x = Range.limitedValue(0, this.canvas.width - this.size.width, newX);
        this.position.y = Range.limitedValue(0, this.canvas.height - this.size.height, newY);
    }
}