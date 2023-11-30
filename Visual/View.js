class View {
    constructor(
        position = Position.zero(),
        size = Size.square(0)
    ) {
        this.position = position;
        this.size = size;
    }
    update(deltaTime) {}
    draw() {}
}