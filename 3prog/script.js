var socket = io();

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

function nkarel() {

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
        
 }

 setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },1000
)