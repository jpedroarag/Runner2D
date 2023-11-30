class GameState {
    constructor(entities) {
        this.entities = entities;
    }

    update(deltaTime) {
        this.entities.forEach((e) => e.update(deltaTime));
    }

    draw() {
        this.entities.forEach((e) => e.draw());
    }
}