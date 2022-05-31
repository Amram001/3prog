class Grass{
    constructor(x, y) {
       this.x = x;
       this.y = y;
       this.multiplay = 0;
       this.directions = [
        [this.x - 1, this.y - 1],
        [this.x    , this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y    ],
        [this.x + 1, this.y    ],
        [this.x - 1, this.y + 1],
        [this.x    , this.y + 1],
        [this.x + 1, this.y + 1]
    ];

    }
    chooseCell(char){
        var result = []
        for( var i = 0; i < this.directions.length; i++){
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
            if(matrix[y][x] == char){
                result.push(this.directions[i])
            }
            }
        
        }
        return result;
    }
    
    mul(){
        this.multiplay++;
        var found = this.chooseCell(0)
        var exact = random(found)
        if(exact && this.multiplay > 1){
            var x = exact[0];
            var y = exact[1];
            var grass = new Grass (x,y);
            matrix[y][x] = 1;
            grassArr.push(grass);
            this.multiplay = 1;
        }
        
    }
}

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
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
    chooseCell(char) {
        this.getNewCoordinates();
        let result = [];
        for (let i = 0; i < this.directions.length; i++) {
        let x = this.directions[i][0];
        let y = this.directions[i][1];
        if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
        if (matrix[y][x] == char) {
        result.push(this.directions[i]);
    }
    }
    }
    return result;
    
    }
    mul(){
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact && this.energy > 90) {
            let x = exact[0];
            let y = exact[1];
            
            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);
            
            this.energy = 20;
        }
    
    }
    eat(){
        let found = this.chooseCell(1);

        let exact = random(found);
       
      if(exact){
        this.energy += 5;
       
        let x = exact[0];
        let y = exact[1];
        
        for( var i = 0; i < grassArr.length; i++){
            if(grassArr[i].x == x && grassArr[i].y == y){
            grassArr.splice(i, 1);
            }
            }
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            
        this.x = x;
        this.y = y;
        if(this.energy > 30){
        this.mul();
    }
    }
    else{
    this.move();
    }
    }
    move(){
    let found = this.chooseCell(0);
    let exact = random(found);
    if(exact){
    let x = exact[0];
    let y = exact[1];
    matrix[y][x] = 2;
    matrix[this.y][this.x] = 0;
    
    this.x = x;
    this.y = y;
    this.energy--
    if(this.energy < 0){
    this.die();
    }
    }
    else{
    this.energy--
    if(this.energy < 0){
    this.die();
    }
    }
    }
    die(){
    for(var i = 0; i < grassEaterArr.length; i++){
    if(grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y){
    grassEaterArr.splice(i, 1)
    }
    }
    matrix[this.y][this.x] = 0;
    }
    
    }

    class Predator {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.energy = 700;
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
        chooseCell(char) {
            this.getNewCoordinates();
            let result = [];
            for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
            if (matrix[y][x] == char) {
            result.push(this.directions[i]);
        }
        }
        }
        return result;
        
        }
        mul(){
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
       
        eat(){
            let found = this.chooseCell(2);
            let exact = random(found);
            if(exact){
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];
            for( var i = 0; i < grassEaterArr.length; i++){
                if(grassEaterArr[i].x == x && grassEaterArr[i].y == y){
                grassEaterArr.splice(i, 1);
                }
                }
                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;
                
            this.x = x;
            this.y = y;
            if(this.energy > 30){
            this.mul();
        }
            else{
              this.move();
            }
        }
        
        }

        move(){
            let found = this.chooseCell(0);
            let exact = random(found);
            let found2 = this.chooseCell(1);
            let exact2 = random(found2);
            if(exact){
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
    
            this.x = x;
            this.y = y;
            this.energy--
            if(this.energy < 0){
            this.die();
            }
            }
            else{
            this.energy--
            if(this.energy < 0){
            this.die();
            }
            }
            if(exact2){
                let x = exact2[0];
                let y = exact2[1];
                matrix[y][x] = 3;
                matrix[this.y][this.x] = 1;
        
                this.x = x;
                this.y = y;
                this.energy--
                if(this.energy < 0){
                this.die();
                }
                }
                else{
                this.energy--
                if(this.energy < 0){
                this.die();
                }
                }
            }

            die(){
                for(var i = 0; i < predatorArr.length; i++){
                if(predatorArr[i].x == this.x && predatorArr[i].y == this.y){
                predatorArr.splice(i, 1)
                }
                }
                matrix[this.y][this.x] = 0;
                }
        }
    
    
       




        class People {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.energy = 20;
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
            chooseCell(char) {
                this.getNewCoordinates();
                let result = [];
                for (let i = 0; i < this.directions.length; i++) {
                let x = this.directions[i][0];
                let y = this.directions[i][1];
                if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                result.push(this.directions[i]);
            }
            }
            }
            return result;
            
            }
           
            kill(){
                let found = this.chooseCell(3);
                let exact = random(found);
                if(exact){
                this.energy += 5;
                let x = exact[0];
                let y = exact[1];
                for( var i = 0; i < predatorArr.length; i++){
                    if(predatorArr[i].x == x && predatorArr[i].y == y){
                    predatorArr.splice(i, 1);
                    }
                    }
                    matrix[y][x] = 5;
                    matrix[this.y][this.x] = 0;
                    
                this.x = x;
                this.y = y;
                if(this.energy > 30){
                this.mul();
            }
                else{
                  this.move();
                }
            }
            
            }
    
            move(){
                let found = this.chooseCell(0);
                let found2 = this.chooseCell(1);
                let exact2 = random(found2);
                let exact = random(found);
                if(exact){
                let x = exact[0];
                let y = exact[1];
                matrix[y][x] = 5;
                matrix[this.y][this.x] = 0;
                
                this.x = x;
                this.y = y;
                this.energy--
                
                }
                if(exact2){
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
           