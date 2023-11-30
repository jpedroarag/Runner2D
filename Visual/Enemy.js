class Enemy extends Rect {
    constructor(
        position,
        size,
        color,
        speed
    ) {
        super(position, size, color);
        this.speed = speed;
    }

    update(deltaTime) {
        this.position.y += this.speed * deltaTime;
    }
}