class Label extends View {
    constructor(
        text,
        position,
        size = Size.square(0),
        backgroundColor = 'white',
        foregroundColor = 'black',
        fontSize = 40
    ) {
        super(position, size);
        this.background = new Rect(position, size, backgroundColor);
        this.foregroundColor = foregroundColor;
        this.text = text;
        this.fontSize = fontSize;
        context.font = `${this.fontSize}px Arial`;
    }

    draw() {
        this.background.draw();
        context.fillStyle = this.foregroundColor;
        context.font = `${this.fontSize}px Arial`;
        context.fillText(
            this.text,
            this.background.position.x,
            this.background.position.y
        );
    }
}