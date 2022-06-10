class Bombs {//tablica jest w pełni ruchoma (kod zadziała z każdym rozmiarem, jeśli rzędy będą tej samej długości)
    static generate() {
        let tab = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
//zmienne przechowywujące położenie bomb w rzędzie
        let num1, num2, num3, num4, num5, num6

//losowanie położenia bomb
        function getNumber() {
            num1 = Math.floor(Math.random() * (tab[0].length - 1));

            num2 = Math.floor(Math.random() * (tab[0].length - 1));
            if (num2 == num1) {
                num2 = Math.floor(Math.random() * (tab[0].length - 1));
            }

            num3 = Math.floor(Math.random() * (tab[0].length - 1));
            if (num3 == num1 || num3 == num2) {
                num3 = Math.floor(Math.random() * (tab[0].length - 1));
            }
            num4 = Math.floor(Math.random() * (tab[0].length - 1));
            if (num4 == num1 || num4 == num2 || num4 == num3) {
                num3 = Math.floor(Math.random() * (tab[0].length - 1));
            }
            num5 = Math.floor(Math.random() * (tab[0].length - 1));
            if (num5 == num1 || num5 == num2 || num5 == num3 || num5 == num4) {
                num3 = Math.floor(Math.random() * (tab[0].length - 1));
            }
            num6 = Math.floor(Math.random() * (tab[0].length - 1));
            if (num6 == num1 || num6 == num2 || num6 == num3 || num6 == num4 || num6 == num5) {
                num3 = Math.floor(Math.random() * (tab[0].length - 1));
            }
        }

//wstawianie wylosowanych miejsc z bombami do tablicy
        for (let i = 0; i < tab.length; i++) {
            getNumber()
            if (num1 == num2 && num1 == num3 && num1 == num4 && num1 == num5 && num1 == num6 && num2 == num3 && num2 == num4 && num2 == num5 && num2 == num6 && num3 == num4 && num3 == num5 && num3 == num6 && num4 == num5 && num4 == num6 && num5 == num6) {
                getNumber()
            }
            tab[i][num1] = "🧨"
            tab[i][num2] = "🧨"
            tab[i][num3] = "🧨"
            tab[i][num4] = "🧨"
            tab[i][num5] = "🧨"
            tab[i][num6] = "🧨"
        }

//ustalanie ile bomb jest dookoła każdego pola, poza polami z bombą
        for (let i = 0; i < tab.length; i++) {
            for (let j = 0; j < tab[i].length; j++) {
                if (tab[i][j] == "🧨" && i > 0 && j > 0 && i < tab.length - 1 && j < tab[i].length - 1) {
                    if (tab[i - 1][j - 1] != "🧨") {
                        tab[i - 1][j - 1] += 1;
                    }
                    if (tab[i - 1][j] != "🧨") {
                        tab[i - 1][j] += 1;
                    }
                    if (tab[i - 1][j + 1] != "🧨") {
                        tab[i - 1][j + 1] += 1;
                    }
                    if (tab[i][j - 1] != "🧨") {
                        tab[i][j - 1] += 1;
                    }
                    if (tab[i][j + 1] != "🧨") {
                        tab[i][j + 1] += 1;
                    }
                    if (tab[i + 1][j - 1] != "🧨") {
                        tab[i + 1][j - 1] += 1;
                    }
                    if (tab[i + 1][j] != "🧨") {
                        tab[i + 1][j] += 1;
                    }
                    if (tab[i + 1][j + 1] != "🧨") {
                        tab[i + 1][j + 1] += 1;
                    }
                } else if (tab[i][j] == "🧨" && i == 0 && j > 0 && j < tab[i].length - 1) {
                    if (tab[i][j - 1] != "🧨") {
                        tab[i][j - 1] += 1;
                    }
                    if (tab[i][j + 1] != "🧨") {
                        tab[i][j + 1] += 1;
                    }
                    if (tab[i + 1][j - 1] != "🧨") {
                        tab[i + 1][j - 1] += 1;
                    }
                    if (tab[i + 1][j] != "🧨") {
                        tab[i + 1][j] += 1;
                    }
                    if (tab[i + 1][j + 1] != "🧨") {
                        tab[i + 1][j + 1] += 1;
                    }
                } else if (tab[i][j] == "🧨" && j == 0 && i > 0 && i < tab.length - 1) {
                    if (tab[i - 1][j] != "🧨") {
                        tab[i - 1][j] += 1;
                    }
                    if (tab[i - 1][j + 1] != "🧨") {
                        tab[i - 1][j + 1] += 1;
                    }
                    if (tab[i][j + 1] != "🧨") {
                        tab[i][j + 1] += 1;
                    }
                    if (tab[i + 1][j] != "🧨") {
                        tab[i + 1][j] += 1;
                    }
                    if (tab[i + 1][j + 1] != "🧨") {
                        tab[i + 1][j + 1] += 1;
                    }
                } else if (tab[i][j] == "🧨" && i == tab.length - 1 && j > 0 && j < tab[i].length - 1) {
                    if (tab[i - 1][j - 1] != "🧨") {
                        tab[i - 1][j - 1] += 1;
                    }
                    if (tab[i - 1][j] != "🧨") {
                        tab[i - 1][j] += 1;
                    }
                    if (tab[i - 1][j + 1] != "🧨") {
                        tab[i - 1][j + 1] += 1;
                    }
                    if (tab[i][j - 1] != "🧨") {
                        tab[i][j - 1] += 1;
                    }
                    if (tab[i][j + 1] != "🧨") {
                        tab[i][j + 1] += 1;
                    }
                } else if (tab[i][j] == "🧨" && j == tab[i].length - 1 && i > 0 && i < tab.length - 1) {
                    if (tab[i - 1][j - 1] != "🧨") {
                        tab[i - 1][j - 1] += 1;
                    }
                    if (tab[i - 1][j] != "🧨") {
                        tab[i - 1][j] += 1;
                    }
                    if (tab[i][j - 1] != "🧨") {
                        tab[i][j - 1] += 1;
                    }
                    if (tab[i + 1][j - 1] != "🧨") {
                        tab[i + 1][j - 1] += 1;
                    }
                    if (tab[i + 1][j] != "🧨") {
                        tab[i + 1][j] += 1;
                    }
                } else if (tab[i][j] == "🧨" && i == 0 && j == 0) {
                    if (tab[i][j + 1] != "🧨") {
                        tab[i][j + 1] += 1;
                    }
                    if (tab[i + 1][j] != "🧨") {
                        tab[i + 1][j] += 1;
                    }
                    if (tab[i + 1][j + 1] != "🧨") {
                        tab[i + 1][j + 1] += 1;
                    }
                } else if (tab[i][j] == "🧨" && i == 0 && j == tab[i].length - 1) {
                    if (tab[i][j - 1] != "🧨") {
                        tab[i][j - 1] += 1;
                    }
                    if (tab[i + 1][j] != "🧨") {
                        tab[i + 1][j] += 1;
                    }
                    if (tab[i + 1][j - 1] != "🧨") {
                        tab[i + 1][j - 1] += 1;
                    }
                } else if (tab[i][j] == "🧨" && i == tab.length - 1 && j == 0) {
                    if (tab[i][j + 1] != "🧨") {
                        tab[i][j + 1] += 1;
                    }
                    if (tab[i - 1][j] != "🧨") {
                        tab[i - 1][j] += 1;
                    }
                    if (tab[i - 1][j + 1] != "🧨") {
                        tab[i - 1][j + 1] += 1;
                    }
                } else if (tab[i][j] == "🧨" && i == tab.length - 1 && j == tab[i].length - 1) {
                    if (tab[i][j - 1] != "🧨") {
                        tab[i][j - 1] += 1;
                    }
                    if (tab[i - 1][j] != "🧨") {
                        tab[i - 1][j] += 1;
                    }
                    if (tab[i - 1][j - 1] != "🧨") {
                        tab[i - 1][j - 1] += 1;
                    }
                }
            }

        }


//Zmiana liczb w tablicy na emoi (żeby równo wyglądało w consol logu, do usunięcia)
        for (let i = 0; i < tab.length; i++) {
            for (let j = 0; j < tab[i].length; j++) {
                if (tab[i][j] == 0) {
                    tab[i][j] = "0️⃣"
                }
                if (tab[i][j] == 1) {
                    tab[i][j] = "1️⃣"
                }
                if (tab[i][j] == 2) {
                    tab[i][j] = "2️⃣"
                }
                if (tab[i][j] == 3) {
                    tab[i][j] = "3️⃣"
                }
                if (tab[i][j] == 4) {
                    tab[i][j] = "4️⃣"
                }
                if (tab[i][j] == 5) {
                    tab[i][j] = "5️⃣"
                }
                if (tab[i][j] == 6) {
                    tab[i][j] = "6️⃣"
                }
                if (tab[i][j] == 7) {
                    tab[i][j] = "7️⃣"
                }
                if (tab[i][j] == 8) {
                    tab[i][j] = "8️⃣"
                }
            }
        }

//(Przed pracą z kodem polecam zmienić 🧨 na cokolwiek innego, np x, zamienienie wszystkich zadziała)

    return tab
   }
}


module.exports = Bombs
