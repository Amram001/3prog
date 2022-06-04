class People extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 20;
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
    kill() {
        let found = this.chooseCell(3);
        let exact = random(found);
        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];
            for (var i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1);
                }
            }
            matrix[y][x] = 5;
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
        let found2 = this.chooseCell(1);
        let exact2 = random(found2);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.energy--

        }
        if (exact2) {
            let x = exact2[0];
            let y = exact2[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 1;

            this.x = x;
            this.y = y;
            this.energy--

        }


    }

}