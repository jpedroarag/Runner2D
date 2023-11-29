class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notify(event = -1) {
        this.observers.forEach((o) => o.onNotify(event));
    }
}