// short-circuit

//falso

let nombre = "Ivan";
let username = nombre || "Invitado";
console.log(username);

function fn1() {
    console.log("Hola");
    return false;
}

function fn2() {
    console.log("Soy la función 2");
    return true;
}

let x = fn1() && fn2();

/*
Esto se usa cuando para EJECUTAR una funcion SOLO
si la primera funcion es verdadera
*/






//console.log(x);