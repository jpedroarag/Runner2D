class EnemyGenerator {
    constructor(minMargins = Size.square(10)) {
        this.lastEnemySpawn = Date.now();

        this.minLevel = 1;
        this.maxLevel = 100;
        this.maxSpeed = 10/7.5;

        this.maxPositionUp = -canvas.height;
        this.minMargins = minMargins;

        this.minEnemySize = Size.square(10);
        this.maxEnemySize = Size.square(canvas.width/10);
    }

    generateNewEnemyLine(deltaTime, allEnemies, level) {
        let fixedRangeLevel = Range.limitedValue(this.minLevel, this.maxLevel, level);
        let timeOffsetSinceLastUpdateMs = Math.abs(Date.now() - this.lastEnemySpawn);
        let shouldGenerateNew = timeOffsetSinceLastUpdateMs > 100 * deltaTime/fixedRangeLevel;

        if (!shouldGenerateNew) {
            return [];
        }

        this.lastEnemySpawn = Date.now();
        return this.#generate(fixedRangeLevel, allEnemies);
    }

    calculateLevelSpeed(level) {
        return level/this.maxLevel * this.maxSpeed;
    }

    #generate(level, allEnemies) {
        let enemies = [];

        let enemy = this.#generateEnemy(level);

        while (!this.#isPositionValid(enemy, allEnemies)) {
            if (enemy.position.y < this.maxPositionUp) {
                enemy = null;
                break;
            }
            // enemy = this.#generateEnemy(level);
            enemy.position.y -= (this.minMargins.height + this.maxEnemySize.height);
        }

        if (enemy != null) {
            enemies.push(enemy);
        }

        return enemies;
    }

    #generateEnemy(level) {
        let enemySize= Random.size(this.minEnemySize, this.maxEnemySize);
        let enemyPositionX = Random.number(0, canvas.width - this.minEnemySize.width);
        let enemyPosition= new Position(
            enemyPositionX,
            -enemySize.height - Random.number(this.minEnemySize.height, this.minEnemySize.height/2)
        );
        return new Enemy(
            enemyPosition,
            enemySize,
            'red',
            this.calculateLevelSpeed(level)
        );
    }

    #isPositionValid(newEnemy, enemies) {
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].hasCollisionWith(newEnemy, this.minMargins)) {
                return false;
            }
        }
        return true;
    }
}