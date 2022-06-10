class Net {
    socket

    constructor() {
        this.socket = io();

        this.socket.on("accepted user", data=>{
            console.log(data)
            if(data)
            {
                ui.accepted()
            }
            this.socket.on("board update", boardUp=>{
                console.log(boardUp.board)
                ui.smallTableGenerate(boardUp.board)
            })
        })

        this.socket.on("users list", data=>{
            ui.updateUsersList(data.players)
        })
    }

    send(event, body) {
        this.socket.emit(event, body)
    }
}