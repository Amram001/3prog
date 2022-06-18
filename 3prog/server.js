var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


matrix = [
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

    io.sockets.emit('send matrix', matrix);

    var grassArr = [];
    var grassEaterArr = [];
    var predatorArr = [];
    var peoplearr = [];

    Grass = require("./grass");
    GrassEater = require("./grasseater");
    Predator = require("./predator");
    People = require("./people");


    function createObject(matrix) {
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
    io.sockets.emit('send matrix', matrix)

    function game() {
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
        io.sockets.emit("send matrix", matrix);
    }

    
    setInterval(game, 1000)
    


    
io.on('connection', function (socket) {
    createObject(matrix)
})
