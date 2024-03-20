const express = require("express");
const app = express();

const path = require("path");
const http = require("http");
const {Server} = require("socket.io");


const server = http.createServer(app);
const io = new Server(server);

let arr= [];
let playArray = [];

io.on('connection',(socket)=>{

    socket.on('find',(e)=>{
        if(e.name != null){
            arr.push(e.name);
            if(arr.length>=2){
                let p1obj ={
                    p1name : arr[0],
                    p1value:'X',
                    p1move:""
                }
                let p2obj ={
                    p2name : arr[1],
                    p2value:'O',
                    p2move:""
                }
                let obj = {p1:p1obj , p2:p2obj};
                playArray.push(obj);
                arr.splice(0,2);
                io.emit('find',{allPlayers:playArray});
            }
        }
    })

})

app.use(express.static(path.resolve("")));

app.get('/',(req,res)=>{
    return res.sendFile("index.html");
})

const PORT = 3000;
server.listen(PORT,()=>{console.log(`server started on PORT: ${PORT}`)})