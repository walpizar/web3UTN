//alert("Hollaaaaaaa");
//console.log("HOLAAA 2");

//variable
//string-number-boolean-objeto-array-any

let mensaje="hola";
let numero2=true;

//console.log(mensaje);

//var numero="maria";
//console.log(numero);


if(true){

  let mensaje="maria";
  //console.log("dentro del if: "+mensaje);

}
//console.log(mensaje);

const VALOR=8;
//console.log(VALOR);

//COERCION

let valor1= 5 + "5";
//console.log(valor1);
let valor2= 5 + false;
//console.log(valor2);

//objeto y array
//objeto accedo a atravez de su key, atravez de su indice

const persona={nombre: "Walter",
apellido:"Alpizar",
telefono:"88996666"};

const persona1={nombre: "Maria",
apellido:"perez",
telefono:"4852332"};

const persona2={nombre: "Robero",
apellido:"perez",
telefono:"78526333"};
//console.log(persona);

console.log(persona.genero);

if(persona.genero){

    console.log("si existe genero");
}

let existeGenero= persona.hasOwnProperty("genero");
console.log(existeGenero);

//console.log(persona.apellido);

let lista=[persona, persona1, persona2];

console.log(lista.length);

for (let index = 0; index < lista.length; index++) {
    const objeto = lista[index];
    console.log("OBJETO: "+objeto);
}

console.log("foreach");
lista.forEach(element => {
    if(element.apellido=="perez"){
        console.log(element);
    }
   
});


console.log("map");
//pendiente... tarea....
/*lista.map((x)=>{
    console.log(x);
}).filter((x)=>x.apellido=="perez");*/
lista.filter(y => y.apellido == "perez").map(y => {
    console.log(y);
});


console.log("filter");
let result= lista.filter(x=>x.apellido=="perez");

console.log(result);

//operadores
//=, ==, === != > < >= <= *-/+


if(5!=="5"){

    console.log("igual");
}
//hoisting
leer();


function leer(){
    console.log("Estoy leyendo");

}



varHoisting=5;
var varHoisting=5;
console.log(varHoisting);













 





