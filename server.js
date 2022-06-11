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

    socket.on("uncovering", data => uncoverOrDemine(data, "uncover"))
    socket.on("demining", data => uncoverOrDemine(data, "demine"))
})


function uncoverOrDemine(data, action) {
    users.forEach(u => { //znajdź usera
        if (u.name === data.user) {
            getTable((err, doc) => { //tablica ze stanem planszy
                let fieldsState = doc.value
                if (fieldsState[data.x][data.y] === 0)  //czy pole jest nieodsłonięte
                    getBombsPositions((err, doc) => { //tablica z bombami
                        let positions = doc.value
                        //TODO: PUNKTACJA KAŻDEGO PRZYPADKU
                        if (action === "uncover") {//logika dla odkrycia
                            if (positions[data.x][data.y] === "🧨") { //czy jest tam bomba
                                fieldsState[data.x][data.y] = 2 //wysadzenie się
                            } else
                                fieldsState[data.x][data.y] = 1 //odkryte
                        } else {//logika dla rozminownia
                            if (positions[data.x][data.y] === "🧨") { //czy jest tam bomba
                                fieldsState[data.x][data.y] = 3 //rozminowanie
                            } else
                                fieldsState[data.x][data.y] = 1 //nieudana próba rozminowania
                        }
                        updateTableAndEmit(fieldsState)         //update
                    })
            })
        }
    })
}

function startGame() {
    let table = JSON.parse(JSON.stringify(Bombs.clearTable))
    table[0][0] = 1
    table[23][23] = 1
    updateTableAndEmit(table)
    const bombsPosition = Bombs.generate()
    coll.update({document: "bombs position"}, {
        document: "bombs position",
        value: bombsPosition
    }, {upsert: true}, function () {
        io.emit("board preview", {board: bombsPosition})
    })
}

function getBombsPositions(callback) {
    coll.findOne({document: "bombs position"}, (err, doc) => callback(err, doc))
}

function getTable(callback) {
    coll.findOne({document: "fields state"}, (err, doc) => callback(err, doc))
}

function updateTableAndEmit(newTable) {
    coll.update({document: "fields state"}, {document: "fields state", value: newTable}, {upsert: true}, function () {
        io.emit("fields state", newTable)
    })
}


app.post('/reset', (socket) => {
    users = []
    io.emit("game reset", true)
})

app.use(express.static("static"))
server.listen(3000, () => console.log("http://127.0.0.1:3000"))