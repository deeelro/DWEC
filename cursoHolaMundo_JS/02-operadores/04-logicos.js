
// AND &&

console.log(true && true); //si los dos valores se cumplen devuelve true
console.log(true && false); //si uno de los valores no se cumple devuelve false

//Ejemplo: un niño puede ir al cine si tiene más de 18 años y si tiene dinero suficiente
let mayor = true;
let dinero = false;

console.log(mayor && dinero);


// OR ||
console.log(true || false); //si uno de los valores se cumple devuelve true


// NOT !
console.log(!mayor); //si la variable es true devuelve false y viceversa


//Ejemplo: un niño puede ir al cine si tiene dinero suficiente
let dineroSuficiente = !dinero;
