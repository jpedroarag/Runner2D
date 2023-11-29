class Enemy extends Rect {
    constructor(
        context,
        position,
        size,
        color = 'white',
        speed
    ) {
        super(
            context,
            position,
            size,
            color
        );
        this.speed = speed;
    }

    update(deltaTime) {
        this.position.y += this.speed * deltaTime;
    }
}