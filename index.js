const express = require("express");
const app = express();

const path = require("path");
const http = require("http");
const {Server} = require("socket.io");


const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("")));

app.get('/',(req,res)=>{
    return res.sendFile("index.html");
})

const PORT = 3000;
server.listen(PORT,()=>{console.log(`server started on PORT: ${PORT}`)})