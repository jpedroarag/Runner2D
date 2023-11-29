class Random {
    static int(min, max) {
        return parseInt(this.number(min, max));
    }

    static number(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    }

    static size(minBounds, maxBounds) {
        return new Size(
            this.number(minBounds.width, maxBounds.width),
            this.number(minBounds.height, maxBounds.height)
        );
    }
}

class Position {
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static single(point) {
        return new Position(point, point);
    }

    static zero = this.single(0);
}

class Size {
    constructor(width, height, zSize = 0) {
        this.width = width;
        this.height = height;
        this.zSize = zSize;
    }

    static square(size) {
        return new Size(size, size);
    }
}

class Range {
    constructor(lowerBound, upperBound) {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }

    static limited(lowerBound, upperBound, value) {
        return Math.max(lowerBound, Math.min(value, upperBound));
    }
}