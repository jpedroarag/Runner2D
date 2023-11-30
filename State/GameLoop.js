class GameLoop extends GameState {
    constructor(
        lag= 0,
        lastFrameTimeMs= 0,
        timeStep= 1000/60
    ) {
        super([
            new RunningState(
                new Observer((e) => this.onPlayerCollision(e))
            )
        ]);
        this.lag = lag;
        this.lastFrameTimeMs = lastFrameTimeMs;
        this.timeStep = timeStep;
    }

    mainLoop(timeStamp, requestFrame) {
        if (timeStamp < this.lastFrameTimeMs + this.timeStep) {
            requestFrame();
            return;
        }

        this.lag += timeStamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timeStamp;

        while (this.lag >= this.timeStep) {
            this.update(this.timeStep);
            this.lag -= this.timeStep;
        }
        this.draw();

        requestFrame();
    }

    onPlayerCollision(event) {
        this.entities = [new EndOfGameState(event)]
    }
}