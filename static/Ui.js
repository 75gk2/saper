class Ui {
    name
    inGame = false
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
        reset.addEventListener("click", () =>{
            console.log("reset")
            net.reset();
        });
    }

    accepted() {
        const login = document.getElementById("ui")
        login.classList.add("uiGame")
    }

    updateUsersList(list) {
        let s = ""
        s += `Gracze:`
        list.forEach((m, i) => {
            s += `<p>${i + 1}. ${m.name} ${this.inGame?" : "+m.points:""}</p>`
            if(i === 1){
                s += `<p>(Gra trwa)</p>`
            }
        })
        
        this.players.innerHTML = s
    }

    smallTableGenerate(tab) {
        let s = ""
        tab.forEach((c)=>{
            let o = "<tr>"
            c.forEach((k)=>{
                o+=`<td>${k}</td>`
            })
            o+="</td>"
            s+=o
        })
        this.smallTable.innerHTML = s
    }

    refresh(){
        window.location.reload();
        console.log("odświerzono")
    }

    fullGameAlert(){
        alert('To imię jest już zajęte lub gra trwa\njeśli chcesz zakończyć trwającą grę i utworzyć nową naciśnij przycisk "Reset gry"')
    }
}
