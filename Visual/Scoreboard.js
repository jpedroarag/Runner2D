class Scoreboard extends View {
    static #label(text, position, fontSize) {
        return new Label(
            text,
            position,
            Size.square(0),
            'white',
            'black',
            fontSize
        );
    }
    constructor(position, size, level, points, backgroundColor = 'white') {
        super();
        this.background = new Rect(position, size, backgroundColor);

        this.level = level;
        this.points = points;

        let fontSize =
            Range.limitedValue(20, 40, size.height/4);

        this.levelDescriptionLabel = Scoreboard.#label(
            "NÍVEL",
            new Position(0, position.y + size.height/2),
            fontSize
        );
        this.pointsDescriptionLabel = Scoreboard.#label(
            "PONTOS      ",
            new Position(0, position.y + size.height/2 + 64),
            fontSize
        );

        this.levelLabel = Scoreboard.#label(
            `${this.level}`,
            new Position(canvas.width/2, this.levelDescriptionLabel.position.y),
            fontSize
        );
        this.pointsLabel = Scoreboard.#label(
            `${this.points}`,
            new Position(canvas.width/2, this.pointsDescriptionLabel.position.y),
            fontSize
        );
    }

    update(deltaTime) {
        super.update(deltaTime);

        this.levelLabel.text = `${this.level}`;
        this.pointsLabel.text = `${this.points}`;

        let fullPointText = `${this.pointsDescriptionLabel.text}${this.pointsLabel.text}`;
        let labelGroupWidth = context.measureText(fullPointText).width;

        this.pointsDescriptionLabel.position.x = this.background.size.width/2 - labelGroupWidth/2;
        this.pointsLabel.position.x = this.background.size.width/2 + labelGroupWidth/2;

        this.levelDescriptionLabel.position.x = this.pointsDescriptionLabel.position.x;
        this.levelLabel.position.x = this.pointsLabel.position.x;
    }

    draw() {
        this.background.draw();

        this.levelDescriptionLabel.draw();
        this.pointsDescriptionLabel.draw();

        this.levelLabel.draw();
        this.pointsLabel.draw();
    }
}