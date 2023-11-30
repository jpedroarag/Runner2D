class EndOfGameState extends GameState {
    constructor(data) {
        super([
            new Scoreboard(
                Position.zero(),
                new Size(canvas.width, canvas.height),
                data.level,
                data.points,
                'red'
            )
        ]);
    }
}