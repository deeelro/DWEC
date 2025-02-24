let numFilas, numColumnas, totalMinas;
let tableroJuego = [], celdasReveladas = [], celdasConBanderas = [];
let juegoFinalizado = false, banderasColocadas = 0;


// Función para ajustar la dificultad seleccionada por el usuario
function ajustarDificultad() {
    const dificultad = document.getElementById("dificultad").value;

    // creo un objeto con los niveles de dificultad y sus respectivas filas y columnas
    // para asignarlo a las variables numFilas y numColumnas según la dificultad seleccionada
    const niveles = {
        "facil": { filas: 8, columnas: 8 },
        "medio": { filas: 10, columnas: 10 },
        "dificil": { filas: 15, columnas: 15 }
    };

    // uso la destructuración para asignar los valores de filas y columnas a las variables numFilas y numColumnas 
    // segun la dificultad seleccionada por el usuario, si no se selecciona ninguna, se asigna el nivel medio
    ({ filas: numFilas, columnas: numColumnas } = niveles[dificultad] || niveles["medio"]);

    totalMinas = Math.floor(numFilas * numColumnas * 0.15); // Calculamos el número de minas según la dificultad
    maxBanderas = totalMinas;
}

// Generar el tablero de juego con las celdas ocultas y minas
function generarTablero() {
    // Reinicio las variables para generar un tablero nuevo
    juegoFinalizado = false;
    banderasColocadas = 0;

    // Creo un array ques será el tablero de juego y lo lleno de ceros para indicar que no hay minas
    tableroJuego = Array.from({ length: numFilas }, () => Array(numColumnas).fill(0));

    // Creo un array que indicará si las celdas han sido reveladas o no (inicialmente todas false: no reveladas)
    celdasReveladas = Array.from({ length: numFilas }, () => Array(numColumnas).fill(false));

    // Creo un array que indicará si las celdas tienen banderas o no (inicialmente todas false: no tienen bandera)
    celdasConBanderas = Array.from({ length: numFilas }, () => Array(numColumnas).fill(false));

    colocarMinasEnTablero();
}


// Colocar las minas en el tablero de forma aleatoria
function colocarMinasEnTablero() {
    let minasColocadas = 0;
    while (minasColocadas < totalMinas) {
        let fila = Math.floor(Math.random() * numFilas);
        let columna = Math.floor(Math.random() * numColumnas);

        // Si la celda no tiene una mina, la coloco
        if (tableroJuego[fila][columna] !== 'M') {
            tableroJuego[fila][columna] = 'M';
            minasColocadas++;
        }
    }
}


function pintarTablero() {
    const contenedorTablero = document.getElementById("tablero");
    contenedorTablero.innerHTML = ""; // borro el contenido del juego anterior

    // cada columna tendrá un ancho de 30px, y se repetirán tantas columnas como indique numColumnas
    // lo mismo se hace con las filas pero en lugar del ancho será la altura de la fila
    contenedorTablero.style.gridTemplateColumns = `repeat(${numColumnas}, 30px)`;
    contenedorTablero.style.gridTemplateRows = `repeat(${numFilas}, 30px)`;

    for (let fila = 0; fila < numFilas; fila++) {
        for (let columna = 0; columna < numColumnas; columna++) {

            const celda = document.createElement("div"); // creo un div para cada celda
            celda.classList.add("celda"); // le añado la clase celda

            // guarda las coordenadas para usarlas en la funcion revelarCeldasVecinas
            celda.dataset.fila = fila;
            celda.dataset.columna = columna;

            // le añado los eventos de click derecho y click izquierdo 
            celda.addEventListener("click", (e) => revelarCelda(e.target, fila, columna));
            celda.addEventListener("contextmenu", (e) => colocarBandera(e, fila, columna));

            // añado la celda al contenedor del tablero
            contenedorTablero.appendChild(celda);
        }
    }
}

// Función para revelar una celda al hacer clic en ella
function revelarCelda(celda, fila, columna) { // recibo como parametros la celda y sus coordenadas 

    // Si el juego ha finalizado, la celda ya ha sido revelada o tiene una bandera, no hago nada
    if (juegoFinalizado || celdasReveladas[fila][columna] || celdasConBanderas[fila][columna]) return;

    // Marcar la celda como revelada (para evitar clicarla de nuevo) y le pongo la clase revelada
    celdasReveladas[fila][columna] = true;
    celda.classList.add("revelada");

    // Si la celda contiene una mina muestro un alert y finalizo el juego
    if (tableroJuego[fila][columna] === 'M') {
        celda.classList.add("bomba");
        alert("Celda con mina...PERDISTE");
        juegoFinalizado = true;
        return;
    }

    // guardo en minasCercanas el número de minas alrededor de la celda
    const minasCercanas = contarMinasAlrededor(fila, columna);
    // si las hubiera, muestro el número de minas en la celda, 
    // si el contador que devuelve la funcion es = 0, dejo la celda vacía (uso un ternario)
    celda.textContent = minasCercanas > 0 ? minasCercanas : "";

    // Si no hay minas cercanas, revelo las celdas vecinas también
    if (minasCercanas === 0) revelarCeldasVecinas(fila, columna);
}



function contarMinasAlrededor(fila, columna) {
    let contador = 0; // contador de minas alrededor de la celda

    for (let df = -1; df <= 1; df++) {
        for (let dc = -1; dc <= 1; dc++) {

            /*  df controla el desplazamiento en filas.
                dc controla el desplazamiento en columnas.
                Valores que toman:
            
                df = -1     Mira la fila de arriba.
                df = 0      Se queda en la misma fila.
                df = 1      Mira la fila de abajo.
                
                dc = -1     Mira la columna izquierda.
                dc = 0      Se queda en la misma columna.
                dc = 1      Mira la columna derecha. */

            let f = fila + df, c = columna + dc;

            // Compruebo si la celda esta dentro del tablero y si contiene una mina
            if (f >= 0 && f < numFilas && c >= 0 && c < numColumnas && tableroJuego[f][c] === 'M') {
                contador++;
            }
        }
    }
    return contador;
}


// Revelar todas las celdas vecinas si ninguna tiene mina
function revelarCeldasVecinas(fila, columna) {
    for (let df = -1; df <= 1; df++) {
        for (let dc = -1; dc <= 1; dc++) {
            let f = fila + df, c = columna + dc;

            // guardo en celdaVecina la celda vecina a la que quiero acceder 
            let celdaVecina = document.querySelector(`[data-fila='${f}'][data-columna='${c}']`);

            // si las celdas vecinas están dentro del tablero y ninguna esta revelada, las revelo
            if (f >= 0 && f < numFilas && c >= 0 && c < numColumnas && !celdasReveladas[f][c]) {
                // vuelvo a llamar a la función revelarCelda para que se repita el proceso con la celda vecina
                revelarCelda(celdaVecina, f, c);
            }
        }
    }
}


// Colocar o quitar una bandera con clic derecho
function colocarBandera(evento, fila, columna) {
    evento.preventDefault(); // Evita que aparezca el tipico menu del clic derecho

    const celda = evento.target; // Obtengo la celda clicada

    if (celdasConBanderas[fila][columna]) {         // si la celda se ha clicado ya y tiene bandera
        celdasConBanderas[fila][columna] = false;   // Marco la celda como que no tiene bandera
        celda.textContent = "";                     // Le quito el texto (bandera)
        banderasColocadas--;                        // Resto uno al contador de banderas
    } else if (banderasColocadas < maxBanderas) {
        celdasConBanderas[fila][columna] = true;    // Marco la celda como que tiene bandera
        celda.textContent = "🚩";                   // Añado un dibujo de bandera al contenido del elemento
        banderasColocadas++;
    }
}


// Función principal 
function iniciarJuego() {
    ajustarDificultad(); // Configura las variables 
    generarTablero(); // Genera el tablero de juego
    pintarTablero();
}

// Ejecutar la función iniciarJuego cuando se cargue la página
window.onload = iniciarJuego;
