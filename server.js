const {json} = require("body-parser")
const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const BombsClass = require("./static/losowanieBomb")
const Bombs = new BombsClass()
const Datastore = require("nedb")


const app = express()
const server = http.createServer(app)
const io = new Server(server)
let users = []

const coll = new Datastore({
    filename: 'collection.db',
    autoload: true
});

io.on("connection", (socket) => {
    io.emit("users list", {players: users})

    socket.on("log in", (name) => {
        if (!users.includes(name) && users.length < 2) {
            users.push({name: name, id: socket.id})
            socket.emit("accepted user", true)
            io.emit("users list", {players: users})
            if (users.length === 2) startGame()
        } else {
            socket.emit("game is full", true)
        }
    })

    socket.on("uncovering", data=>uncover(data))
})

function uncover(data) {
    users.forEach(u => {
        console.log(u,data)
        if (u.name === data.user) {
            //logika odkrycia i punktacji
            getTable((err,doc)=>{
                let tab = doc.value
                tab[data.y][data.x] = 1
                console.log(tab)
                updateTableAndEmit(tab)
            })
        }
    })
}

function startGame() {
    let table = JSON.parse(JSON.stringify(Bombs.clearTable))
    table[0][0] = 1
    table[23][23] = 1
    updateTableAndEmit(table)
    io.emit("board preview", {board: Bombs.generate()})
}

function getTable(callback) {
    coll.findOne({document: "fields state"}, (err,doc)=>callback(err,doc))
}

function updateTableAndEmit(newTable) {
    coll.update({document: "fields state"}, {document: "fields state",value: newTable}, {upsert: true}, function () {
        io.emit("fields state", newTable)
    })
}


app.post('/reset', (socket) => {
    users = []
    io.emit("game reset", true)
})

app.use(express.static("static"))
server.listen(3000, () => console.log("http://127.0.0.1:3000"))