class Observer {
    #onNotify;

    constructor (onNotify) {
        this.#onNotify = onNotify;
    }

    onNotify(event) {
        this.#onNotify(event);
    }
}