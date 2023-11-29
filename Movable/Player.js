class Player extends Rect {
    constructor(
        canvas,
        context,
        position,
        size,
        color = 'white',
    ) {
        super(
            context,
            position,
            size,
            color,
        );
        this.canvas = canvas;
        this.collisionSubject = new Subject();
    }

    checkCollision(enemies) {
        return enemies.reduce(
            (hasCollision, enemy) => hasCollision || enemy.hasCollisionWith(this),
            false
        );
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

        this.position.x = Range.limited(0, this.canvas.width - this.size.width, newX);
        this.position.y = Range.limited(0, this.canvas.height - this.size.height, newY);
    }
}

const asyncUppercase = item =>
    new Promise(resolve =>
        setTimeout(
            () => resolve(item.toUpperCase()),
            Math.floor(Math.random() * 0.1)
        )
    );

const uppercaseItems = async () => {
    const items = ['a', 'b', 'c'];
    for (let item of items) {
        const uppercaseItem = await asyncUppercase(item);
        console.log(uppercaseItem);
    }

    console.log('Items processed');
};