class Net {
    socket

    constructor() {
        this.socket = io();

        this.socket.on("start game", i => {
            game.startingGame()
            inGame = true
            let prePosition
            switch (i){
                case 0: prePosition = game.fieldsThreeArray[0][0].position;break;
                case 1: prePosition = game.fieldsThreeArray[23][23].position;break;
            }
            game.camera.position.set(prePosition.x,50,prePosition.z)
        })

        this.socket.on("accepted user", data => {
            if (data) {
                ui.accepted()
                this.socket.on("map", boardUp => {
                    // console.log(boardUp)
                    ui.smallTableGenerate(boardUp)
                })
                this.socket.on("fields state", fields => {
                    game.updateFieldsState(fields)
                })
            }
        })

        this.socket.on("users list", data => {
            if (!inGame)
                ui.updateUsersList(data.players)
        })

        this.socket.on("opponent moved", data => {
            // console.log(data)
            game.opponentMoved(data.position)
        })

        this.socket.on("opponent rotated", data => {
            // console.log(data)
            game.opponentRotated(data.rotate)
        })

        this.socket.on("points", data => {
            if (inGame)
                ui.updateUsersList(data)
        })

        this.socket.on("game reset", () => {
            ui.refresh()
        })

        this.socket.on("game is full", () => {
            ui.fullGameAlert()
        })

        this.socket.on("end game",(data)=>{
            ui.end(data)
        })
    }


    send(event, body) {
        this.socket.emit(event, body)
    }


    reset() {
        fetch("/reset", {
            method: "post",
        });
    }
}
