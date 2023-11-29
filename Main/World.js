// @main
class World {
    constructor(
        canvas,
        context,
        lag= 0,
        lastFrameTimeMs= 0,
        timeStep= 1000/60
    ) {
        this.canvas = canvas;

        this.lag = lag;
        this.lastFrameTimeMs = lastFrameTimeMs;
        this.timeStep = timeStep;

        this.player = new Player(
            canvas,
            context,
            new Position(canvas.width/2, canvas.height/2),
            Size.square(30),
            "#0095DD",
        );
        this.enemyManager = new EnemyManager(
            context,
            canvas,
            this.player,
            Size.square(this.player.size.width + 20)
        );
        this.entities = [
            new Rect(
                context,
                Position.zero,
                new Size(this.canvas.width, this.canvas.height),
                'black'
            ),
            this.player,
            this.enemyManager
        ];
        this.collisionObserver = new Observer((_) => this.onCollision());
        this.enemyManager.collisionSubject.addObserver(this.collisionObserver);
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

    update(deltaTime) {
        this.entities.forEach((e) => e.update(deltaTime));
    }

    draw() {
        this.entities.forEach((e) => e.draw());
    }

    onCollision() {
        this.entities[0].color = 'red'
    }
}