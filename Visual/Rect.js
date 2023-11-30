class Rect extends View {
    constructor(position, size, color = 'white') {
        super();
        this.context = context;
        this.position = position;
        this.size = size;
        this.color = color;
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.fillRect(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
    }

    hasCollisionWith(another, marginToConsider = new Size(0, 0)) {
        let collisionX = this.position.x < another.position.x + another.size.width + marginToConsider.width &&
                                    this.position.x + this.size.width + marginToConsider.width > another.position.x;
        let collisionY = this.position.y < another.position.y + another.size.height + marginToConsider.height &&
                                    this.position.y + this.size.height + marginToConsider.height > another.position.y;
        return collisionX && collisionY;
    }
}