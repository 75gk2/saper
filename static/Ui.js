class Ui {
    nick

    constructor() {
        const nickInput = document.getElementById("nickInput")
        const submit = document.getElementById("submit")
        const reset = document.getElementById("reset")
        this.userslist = document.getElementById("usersList")
        this.smallTable = document.getElementById("smallTable")
        submit.addEventListener("click", () => {
            this.nick = nickInput.value
            net.send("log in", nickInput.value)
            nickInput.value = ""
        })
        reset.addEventListener("click", () =>{
            console.log("reset")
        });
    }

    accepted() {
        const loginDiv = document.getElementById("logIn")
        loginDiv.innerHTML = `<h2>Twój nick to ${this.nick}!`
    }

    updateUsersList(list) {
        let s = ""
        s += `<tr><th>index</th><th>nick</th></tr>`
        list.forEach((m, i) => {
            console.log(m, i)
            s += `<tr><th>${i}</th><th>${m.name}</th></tr>`
        })
        this.userslist.innerHTML = s
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
}