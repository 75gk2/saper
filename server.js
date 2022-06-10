const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const Bombs = require("./static/losowanieBomb")


const app = express()
const server = http.createServer(app)
const io = new Server(server)
let users = []

io.on("connection", (socket) => {
    console.log("connection")
    socket.on("log in", (name) => {
        console.log("log in request:", name)

        if (!users.includes(name) && users.length < 2) {
            users.push({name: name, id: socket.id})
            socket.emit("accepted user", true)
            io.emit("users list", {players: users})
            if (users.length === 2 ) startGame()
        }else{
            socket.emit("accepted user", false)
        }
    })
})

function startGame(){
    io.emit("board update",{board:Bombs.generate()})
}


app.use(express.static("static"))
server.listen(3000, () => console.log("http://127.0.0.1:3000"))