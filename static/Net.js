class Net {
    socket

    constructor() {
        this.socket = io();

        this.socket.on("accepted user", data=>{
            if(data)
            {
                ui.accepted()
                this.socket.on("board preview", boardUp=>{
                    console.log(boardUp.board)
                    ui.smallTableGenerate(boardUp.board)
                })
                this.socket.on("fields state", fields=>{
                    game.updateFieldsState(fields)
            })
            }
        })

        this.socket.on("users list", data=>{
            ui.updateUsersList(data.players)
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
