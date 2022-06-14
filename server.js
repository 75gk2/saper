const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const BombsClass = require("./static/losowanieBomb")
const Bombs = new BombsClass()
const Datastore = require("nedb")
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = new Server(server)
let users = []
let inGame = false

const coll = new Datastore({
    filename: 'collection.db',
    autoload: true
});


io.on("connection", (socket) => {
    io.emit("users list", {players: users})

    socket.on("log in", (name) => {
        let nameExists = false
        users.forEach(u => {
            if (u.name === name)
                nameExists = true
        })
        if (!nameExists && users.length < 2) {
            users.push({name: name, id: socket.id})
            socket.emit("accepted user", true)
            io.emit("users list", {players: users})
            if (users.length === 2) startGame()
            //ZALOGOWANO POMYŚLNIE
            socket.on("move", data => moving(data))
            socket.on("player rotated", data => rotating(data))
            socket.on("uncovering", data => uncoverOrDemine(data, "uncover"))
            socket.on("demining", data => uncoverOrDemine(data, "demine"))
        } else {
            socket.emit("game is full", true)
        }
    })

})

function moving(data) {
    users.forEach(u => {
        if (u.name !== data.name) {
            io.to(u.id).emit("opponent moved", {position: data.position})
        }
    })
}

function rotating(data) {
    users.forEach(u => {
        if (u.name !== data.name) {
            io.to(u.id).emit("opponent rotated", {rotate: data.value})
        }
    })
}

function endGame(s) {
    getPoints((err, doc) => {
        io.emit("end game", {reason: s, points: doc.value})
    })
}

function uncoverOrDemine(data, action) {
    if (inGame)
        users.forEach(u => { //znajdź usera
                if (u.name === data.user) {
                    getTable((err, doc) => { //tablica ze stanem planszy
                        let fieldsState = doc.value
                        if (fieldsState[data.x][data.y] === 0)  //czy pole jest nieodsłonięte
                            getBombsPositions((err, doc) => { //tablica z bombami
                                    let positions = doc.value
                                    //TODO: PUNKTACJA KAŻDEGO PRZYPADKU
                                    let points = 0
                                    if (action === "uncover") {//logika dla odkrycia
                                        if (positions[data.x][data.y] === "🧨") { //czy jest tam bomba
                                            fieldsState[data.x][data.y] = 2 //wysadzenie się
                                            points = -100
                                        } else {
                                            fieldsState[data.x][data.y] = 1 //odkryte
                                            points = 3
                                        }
                                    } else {//logika dla rozminownia
                                        points = -5 // cena rozminowania
                                        if (positions[data.x][data.y] === "🧨") { //czy jest tam bomba
                                            fieldsState[data.x][data.y] = 3 //rozminowanie
                                            points += 10
                                        } else
                                            fieldsState[data.x][data.y] = 1 //nieudana próba rozminowania
                                    }
                                    updateTableAndEmit(fieldsState)         //update
                                    getMap((err, doc) => {
                                        const map = doc.value
                                        map[data.x][data.y] = positions[data.x][data.y]
                                        updateMapAndEmit(map)
                                    })
                                    changePointsAndEmit(u.name, points)

                                    let uncoveredExists = false
                                    fieldsState.forEach(r => {
                                            if (r.includes(0))
                                                uncoveredExists = true
                                        }
                                    )

                                    if (!uncoveredExists)
                                        endGame("Odsłonięto wszystkie pola")
                                }
                            )
                    })
                }
            }
        )
}

function startGame() {
    users.forEach((u, i) => {
        io.to(u.id).emit('start game', i);
    })


    let table = JSON.parse(JSON.stringify(Bombs.clearTable))
    table[0][0] = 1
    table[23][23] = 1
    updateTableAndEmit(table)

    const points = []
    users.forEach(u => {
        points.push({name: u.name, points: 100})
    })
    const bombsPosition = Bombs.generate()
    coll.update({document: "bombs position"}, {
        document: "bombs position",
        value: bombsPosition
    }, {upsert: true}, function () {
        table = JSON.parse(JSON.stringify(table))
        for (i = 0; i < 24; i++)
            for (j = 0; j < 24; j++)
                table[i][j] = '*️⃣'
        table[0][0] = bombsPosition[0][0]
        table[23][23] = bombsPosition[23][23]
        updateMapAndEmit(table)
    })
    inGame = true
    updatePointsAndEmit(points)
}

function getBombsPositions(callback) {
    coll.findOne({document: "bombs position"}, (err, doc) => callback(err, doc))
}

function getTable(callback) {
    coll.findOne({document: "fields state"}, (err, doc) => callback(err, doc))
}

function updateTableAndEmit(newTable) {
    coll.update({document: "fields state"}, {
        document: "fields state",
        value: newTable
    }, {upsert: true}, function () {
        io.emit("fields state", newTable)
    })
}

function getMap(callback) {
    coll.findOne({document: "map"}, (err, doc) => callback(err, doc))
}

function updateMapAndEmit(map) {
    coll.update({document: "map"}, {document: "map", value: map}, {upsert: true}, function () {
        io.emit("map", map)
    })
}

function changePointsAndEmit(user, points) {
    getPoints((err, doc) => {
        let myPoints = {points: 0}
        let currentPoints = doc.value
        currentPoints = currentPoints.map(e => {
            if (e.name === user) {
                e.points += points
                myPoints = {points: e.points, user: e.name}
            }
            return e
        })
        updatePointsAndEmit(currentPoints)
        if (myPoints.points < 0) {
            endGame(`gra zakończona, ponieważ gracz ${myPoints.user} osiągnął ${myPoints.points} i przegrał`)
        }
    })
}

function getPoints(callback) {
    coll.findOne({document: "points"}, (err, doc) => callback(err, doc))
}

function updatePointsAndEmit(points) {
    coll.update({document: "points"}, {document: "points", value: points}, {upsert: true}, function () {
        io.emit("points", points)
    })
}


app.post('/reset', (req, res) => {
    users = []
    io.emit("game reset", true)
    res.end()
    inGame = false
})

app.use(express.static("static"))
server.listen(port, () => console.log("http://127.0.0.1:3000"))