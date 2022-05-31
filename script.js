var matrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 1, 1, ],
    [1, 1, 1, 1, 1, 1, 0, 2, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
    [1, 1, 0, 0, 0, 0, 0, 0, 5, 2, 0, 5, 0, 0, 0, 0, 0, 1, 1, 1, ],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, ],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
    [1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, ],
    [3, 1, 1, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 1, 1, 3, ],
    [1, 1, 1, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, ],
    [1, 1, 3, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 3, 1, 1, ],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    ];

 var grassArr = [];
 var grassEaterArr = []
 var predatorArr = []
 var mushroomsArr = []
 var peoplearr = []
 var side = 30;
 
 
 function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    
    for(var y = 0; y < matrix.length; y++){
        for(var x = 0; x < matrix[y].length; x++){
            if (matrix[y][x] == 1 ){
                var gr = new Grass(x,y)
                grassArr.push(gr)
            }
            else if(matrix[y][x] == 2 ){
                var eater = new GrassEater(x,y)
                grassEaterArr.push(eater)
            }
            else if(matrix[y][x] == 3 ){
                var pred = new Predator(x,y)
                predatorArr.push(pred)
            }
           
            else if(matrix[y][x] == 5 ){
                var ppl = new People(x,y)
                peoplearr.push(ppl)
            }
        }
    }
 }
 

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
 
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
         
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
           
            else if (matrix[y][x] == 5) {
                fill("#29521C");
            }
         
            rect(x * side, y * side, side, side);
     

     
     
        }
    }
        for(var i in grassArr){
             grassArr[i].mul();
            
            }
        for(let i in grassEaterArr){
            grassEaterArr[i].eat()
        }
        for(let i in predatorArr){
            predatorArr[i].eat()
            predatorArr[i].move()
        }
     

        for(let i in peoplearr){
            peoplearr[i].kill()
            peoplearr[i].move()
        }
 }
 


