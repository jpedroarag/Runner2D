class RunningState extends GameState {
    constructor(collisionObserver = null) {
        super();

        this.enemies = [];
        this.collisionSubject = new Subject();

        this.lastLevelIncreaseDate = Date.now();
        this.lastPointIncreaseDate = Date.now();
        this.level = 1;
        this.points = 0;

        if (collisionObserver != null) {
            this.collisionSubject.addObserver(collisionObserver);
        }

        this.player = new Player(
            new Position(canvas.width/2, canvas.height/2),
            Size.square(30),
            "#0095DD",
        );
        this.enemyGenerator = new EnemyGenerator(
            Size.square(this.player.size.width * 3),
        );
        this.background = new Rect(
            Position.zero(),
            Size.canvas(),
            'black'
        );
        this.scoreboard = new Scoreboard(
            new Position(0, canvas.height * 0.85),
            new Size(canvas.width, canvas.height * 0.15),
            this.level,
            this.points
        );
        this.entities = [this.scoreboard];
    }

    #checkCollisionWithPlayer() {
        let hasCollision = this.enemies.reduce(
            (hasCollision, enemy) => hasCollision || enemy.hasCollisionWith(this.player),
            false
        );
        if (hasCollision) {
            this.collisionSubject.notify({
                points: this.points,
                level: this.level
            });
        }
    }

    #removeUnusedEnemies() {
        this.enemies.sort((a, b) => a.position.y > b.position.y ? 1 : -1);
        let start = this.enemies.findIndex((e) => e.position.y > canvas.height * 2);

        if (start === -1) {
            return;
        }

        this.enemies.splice(start, this.enemies.length - start + 1);
    }

    #updateLevelIfNeeded() {
        let timeOffsetSinceLastIncreaseMs = Math.abs(Date.now() - this.lastLevelIncreaseDate);
        let timeInSeconds = timeOffsetSinceLastIncreaseMs/1000;
        if (timeInSeconds > 1 && this.level < this.enemyGenerator.maxLevel) {
            this.lastLevelIncreaseDate = Date.now();
            this.level++;
            this.scoreboard.level = this.level;
        }
    }

    #increasePointsIfNeeded() {
        let timeOffsetSinceLastIncreaseMs = Math.abs(Date.now() - this.lastPointIncreaseDate);
        let timeInSeconds = timeOffsetSinceLastIncreaseMs/1000;
        if (timeInSeconds > 1) {
            this.lastPointIncreaseDate = Date.now();
            this.points += this.level;
            this.scoreboard.points = this.points;
        }
    }

    update(deltaTime) {
        this.#removeUnusedEnemies();
        this.#increasePointsIfNeeded();

        this.enemies.forEach((e) => {
            e.speed = this.enemyGenerator.calculateLevelSpeed(this.level);
            e.update(deltaTime);
        });
        super.update(deltaTime);

        this.enemyGenerator
            .generateNewEnemyLine(deltaTime, this.enemies, this.level)
            .forEach((e) => this.enemies.push(e));

        this.#checkCollisionWithPlayer();
        this.#updateLevelIfNeeded();
    }

    draw() {
        this.background.draw();
        this.player.draw();
        this.enemies.forEach((e) => e.draw());
        super.draw();
    }
}