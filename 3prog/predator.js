let LivingCreature = require('./livingcreature')

module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 700;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact && this.energy > 5) {
            let x = exact[0];
            let y = exact[1];

            let pred = new Predator(x, y);
            matrix[y][x] = 3;
            predatorArr.push(pred);

            this.energy = 20;
        }

    }
 
    eat() {
        let found = this.chooseCell(2);
        let exact = random(found);
        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];
            for (var i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            if (this.energy > 30) {
                this.mul();
            }
            else {
                this.move();
            }
        }

    }

    move() {
        let found = this.chooseCell(0);
        let exact = random(found);
        let found2 = this.chooseCell(1);
        let exact2 = random(found2);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.energy--
            if (this.energy < 0) {
                this.die();
            }
        }
        else {
            this.energy--
            if (this.energy < 0) {
                this.die();
            }
        }
        if (exact2) {
            let x = exact2[0];
            let y = exact2[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 1;

            this.x = x;
            this.y = y;
            this.energy--
            if (this.energy < 0) {
                this.die();
            }
        }
        else {
            this.energy--
            if (this.energy < 0) {
                this.die();
            }
        }
    }

    die() {
        for (var i = 0; i < predatorArr.length; i++) {
            if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                predatorArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0;
    }
}
