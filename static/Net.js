class Net {
    socket

    constructor() {
        this.socket = io();

        this.socket.on("accepted user", data => {
            if (data) {
                ui.accepted()
                this.socket.on("map", boardUp => {
                    console.log(boardUp)
                    ui.smallTableGenerate(boardUp)
                })
                this.socket.on("fields state", fields => {
                    game.updateFieldsState(fields)
                })
            }
        })

        this.socket.on("users list", data => {
            if (!ui.inGame) {
                if (data.players.length === 2)
                    data.players.forEach(p => {
                        if (p.name === ui.name)
                            ui.inGame = true
                    })

                ui.updateUsersList(data.players)
            }
        })

        this.socket.on("points", data => {
            if (ui.inGame)
                ui.updateUsersList(data)
        })

        this.socket.on("game reset", () => {
            ui.refresh()
        })

        this.socket.on("game is full", () => {
            ui.fullGameAlert()
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
