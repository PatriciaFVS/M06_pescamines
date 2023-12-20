let varMinas = 0;
let row = 0;
let column = 0;

function iniciarPartida() {
    row = limitsDimensions(prompt("Introdueix un número de files: "));
    column = limitsDimensions(prompt("Introdueix un número de columnes: "));
    let taula = document.getElementById("taulell");
    let taulellHtml = "<table>";

    for (let i = 1; i <= column; i++) {
        taulellHtml += "<tr>";
        for (let j = 1; j <= row; j++) {
            taulellHtml += `<td id=${i + "-" + j}  data-mina=false data-nummines=0 data-revelada=false style="width:20px; height:20px;"><img class=imatge onclick="obreCasella(${i},${j})" src="../imatges/fons20px.jpg"></td>`;
        } taulellHtml += "</tr>";
    }
    taulellHtml += "</table>";
    taula.innerHTML = taulellHtml;

    setMines();
    calculaAdjacents();
}

function obreCasella(x, y) {
    let casilla = document.getElementById(`${x + "-" + y}`);

    if (casilla.dataset.mina === "true") {
        casilla.innerHTML = `<img src="../imatges/mina20px.jpg"></img>`;
        mostraBomba();
    } else {
        numMinesAdj = casilla.dataset.nummines;

        if (numMinesAdj != 0) {
            casilla.innerHTML = numMinesAdj;
        } else {
            desvelaCeros();
        }


    }

}
function desvelaCeros() {

    for (let i = 1; i <= column; i++) {
        for (let j = 1; j <= row; j++) {
            let bomba = document.getElementById(`${i + "-" + j}`);
            bomba


        }

    }
}

function setMines() {
    let casilla, columna, fila;
    varMinas = (row * column * 0.17);

    do {
        columna = parseInt((Math.random() * column) + 1);
        fila = parseInt((Math.random() * row) + 1);
        casilla = document.getElementById(`${columna + "-" + fila}`);

        if (casilla && casilla.dataset.mina == "false") {
            casilla.dataset.mina = true;
            varMinas--;
            //console.log(casilla)
        }

    } while (varMinas > 0)

}


function limitsDimensions(dimensio) {
    if (dimensio < 10) {
        return 10;
    } else if (dimensio > 30) {
        return 30;
    } else {
        return dimensio;
    }
}

function mostraBomba() {
    
    
    for (let i = 1; i <= column; i++) {
        for (let j = 1; j <= row; j++) {
            let bomba = document.getElementById(`${i + "-" + j}`);
            bomba
            if (bomba.dataset.mina === "true") {
                bomba.innerHTML = `<img src="../imatges/mina20px.jpg"></img>`;
            } else {

            }
        }
    } alert("Has perdido");

}

function calculaAdjacents() {
    
    
    for (let i = 1; i <= column; i++) {
        for (let j = 1; j <= row; j++) {

            let casilla = document.getElementById(`${i + "-" + j}`);
            console.log(casilla)
            let numMinesAdj = minesAdjacents(i, j);

            if (casilla) {
                casilla.dataset.nummines = numMinesAdj;
            }
        }
    }
}


function esMina(x, y) {
    let casilla = document.getElementById(`${x + "-" + y}`);
    if (casilla && casilla.dataset.mina === "true") {
        return true;
    } else {
        return false;
    }
}


function minesAdjacents(x, y) {
    let contador = 0;

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (esMina(i, j) && !(i === x && j === y)) {
                contador++;

            }

        }
    }
    return contador;

}