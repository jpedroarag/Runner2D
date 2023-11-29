class EnemyManager {
    constructor(
        context,
        canvas,
        player,
        minMargins = Size.square(10),
        level = 21
    ) {
        this.context = context;
        this.canvas = canvas;

        this.enemies = [];
        this.player = player;
        this.collisionSubject = new Subject();
        this.lastEnemySpawn = Date.now();

        this.minLevel = 1;
        this.maxLevel = 100;
        this.maxSpeed = 10/7.5;
        this.maxPositionUp = -5000;

        this.minMargins = minMargins;
        this.minEnemySize = new Size(canvas.width * 0.1, canvas.height * 0.02);
        this.maxEnemySize = new Size(canvas.width * 0.2, canvas.width * 0.2);
        this.level = Range.limited(this.minLevel, this.maxLevel, level);
    }

    update(deltaTime) {
        this.#checkCollisionWithPlayer();
        this.#removeUnusedEnemies();
        this.enemies.forEach((e) => e.update(deltaTime));

        let timeOffsetSinceLastUpdateMs = Math.abs(Date.now() - this.lastEnemySpawn);
        let shouldGenerateNew = timeOffsetSinceLastUpdateMs > 100 * deltaTime/this.level;

        if (!shouldGenerateNew) {
            return;
        }

        this.lastEnemySpawn = Date.now();
        this.#generate();
    }

    draw() {
        this.enemies.forEach((e) => e.draw());
    }

    #checkCollisionWithPlayer() {
        let hasCollision = this.enemies.reduce(
            (hasCollision, enemy) => hasCollision || enemy.hasCollisionWith(this.player),
            false
        );
        if (hasCollision) {
            this.collisionSubject.notify(hasCollision);
        }
    }

    #generate() {
        for (let i = 0; i < this.level + 2; i++) {
            let enemy = this.#generateEnemy();

            while (!this.#isPositionValid(enemy)) {
                enemy.position.y -= (this.minMargins.height + this.maxEnemySize.height);
            }

            if (enemy.position.y > this.maxPositionUp) {
                this.enemies.push(enemy);
            }
        }
    }

    #removeUnusedEnemies() {
        this.enemies.sort((a, b) => a.position.y > b.position.y ? 1 : -1);
        let start = this.enemies.findIndex((e) => e.position.y > this.canvas.height * 2);

        if (start === -1) {
            return;
        }

        this.enemies.splice(start, this.enemies.length - start + 1);
    }

    #generateEnemy() {
        let enemySize= Random.size(this.minEnemySize, this.maxEnemySize);
        let enemyPositionX = Random.number(0, this.canvas.width - this.minEnemySize.width);
        let enemyPosition= new Position(
            enemyPositionX,
            -enemySize.height - Random.number(this.minEnemySize.height, this.minEnemySize.height/2)
        );
        return new Enemy(
            this.context,
            enemyPosition,
            enemySize,
            'red',
            this.level/this.maxLevel * this.maxSpeed
        );
    }

    #isPositionValid(newEnemy, enemies = this.enemies) {
        let invisible = enemies.filter((e) => e.position.y <= this.minMargins.height)
        let hasCollision = invisible.reduce(
            (hasCollision, enemy) => hasCollision || enemy.hasCollisionWith(newEnemy, this.minMargins),
            false
        );
        return !hasCollision;
    }
}