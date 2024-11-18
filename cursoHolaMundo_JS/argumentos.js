function suma(a, b) {
    console.log(arguments); //arguments es un objeto que contiene todos los argumentos que se le pasan a la función
    return a + 2 + b;
}

let resultado = suma(5, 1, 6, 7, 8); //le paso el argumento 5 y 6 a los parametros a y b
console.log(resultado);

console.log(typeof suma);

/**
Expressions --> 
    Cualquier linea de código que produzca un valor
    - 2 + 2
    - 3 * 7
    - 40
    - "Hola Mundo"
    - miFuncion()
    - x = 10

Declarations --> 
    - let
    - const
    - function
    - funcrion*
    - async function
    - class
    - export / import

Statements --> 
    - if
    - else
    - switch
    - for

Operadores -->
    - aritméticos
    - de asignación
    - de comparación
    - lógicos
    - bitwise

 */