class Ui {
    name
    position = {x: 0, y: 0}
    map = []

    constructor() {
        const nickInput = document.getElementById("nickInput")
        const submit = document.getElementById("submit")
        const reset = document.getElementById("reset")
        this.players = document.getElementById("players")
        this.userslist = document.getElementById("usersList")
        this.smallTable = document.getElementById("smallTable")
        submit.addEventListener("click", () => {
            this.name = nickInput.value
            net.send("log in", nickInput.value)
            nickInput.value = ""
        })
        reset.addEventListener("click", () => {
            console.log("reset")
            net.reset();
        });
    }

    accepted() {
        const login = document.getElementById("ui")
        document.getElementById("lockGame").classList.add("uiGame")
        login.classList.add("uiGame")
    }

    updateUsersList(list) {
        let s = ""
        s += `Gracze:`
        list.forEach((m, i) => {
            s += `<p>${i + 1}. ${m.name} ${inGame ? " : " + m.points : ""}</p>`
            if (i === 1) {
                s += `<p>(Gra trwa)</p>`
            }
        })

        this.players.innerHTML = s
    }

    smallTableGenerate(tab) {
        this.map = JSON.parse(JSON.stringify(tab))
        this.smallTablePrinter()
    }

    smallTablePrinter() {
        let s = ""
        // this.map.forEach((c)=>{
        //     c.forEach((k)=>{
        //     })
        // })
        const x = this.position.y
        const y = this.position.x

        for (let i = x - 2; i <= x + 2; i++) {
            let o = "<tr>"
            for (let j = y - 2; j <= y + 2; j++) {

                if (Array.isArray(this.map[i])&&this.map[i][j] !== undefined)
                    o += `<td>${this.map[i][j]}</td>`
                else
                    o += `<td>⬛</td>`
            }
            o += "</td>"
            s += o
        }
        this.smallTable.innerHTML = s
    }


    refresh() {
        window.location.reload();
        console.log("odświerzono")
    }

    fullGameAlert() {
        alert('To imię jest już zajęte lub gra trwa\njeśli chcesz zakończyć trwającą grę i utworzyć nową naciśnij przycisk "Reset gry"')
    }
}
