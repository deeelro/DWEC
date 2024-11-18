
//Personaje de TV

let nombre = "Homer Simpson";
let ocupacion = "Empleado de la planta nuclear de Springfield";
let edad = 38;

let personaje = {
    nombre: "Homer Simpson",
    ocupacion: "Empleado de la planta nuclear de Springfield",
    edad: 38, //edad es la llave o propiedad del objeto
};
console.log(personaje);
console.log(personaje.nombre);
console.log(personaje["ocupacion"]);

personaje.edad = 40; //modificar la edad

personaje["edad"] = 38; //modificar la edad

delete personaje.ocupacion; //eliminar la edad
console.log(personaje);