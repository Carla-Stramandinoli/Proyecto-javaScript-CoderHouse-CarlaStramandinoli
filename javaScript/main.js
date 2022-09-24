/*
Mi idea es hacer un control de stock, en este caso los datos que ingresara el usuario
son agregados con un "prompt" ya que todavia no fue explicado como obtenerlos de otra manera,
la idea a futuro es que en las tablas de stock se ingrese lo nuevo, se descuente lo utilizado haciendo
referencia a las tablas de "estándar" y como resultado se devuelva el stock final.
*/

let entra;
let sale;

function calcularStock(uniProducidas, uniConsumidas) {
    let stock = uniProducidas - uniConsumidas;
    console.log(`Stock calculado ${stock}`);
    return parseInt(stock);
}

const estaStockBajo = (entra, sale) => {
    if (calcularStock(entra, sale) < 200) {
        console.log("Debes subir el stock");
        //la idea es que segun la cantidad de stock, los casilleros se pongan en rojo o verde.
    } else {
        console.log("El stock esta bien");
    }
}


for (let i = 0; i < 6; i++) {
    let nombre;
    switch (i) {
        case 0:
            nombre = "burger cordero";
            break;

        case 1:
            nombre = "pan brioche";
            break;

        case 2:
            nombre = "pan pancho";
            break;

        case 3:
            nombre = "duo de queso";
            break;

        case 4:
            nombre = "caramelo";
            break;

        case 5:
            nombre = "masa taco";
            break;

        default:
            console.log("No se ingresaron valores");
            break;
    }
    // entra = parseInt(prompt(`Ingrese la cantidad de produccion a agregar de ${nombre}`));
    // sale = parseInt(prompt("Ingrese el descuento que se debe hacer segun la cantidad de pax"));

    console.log(`Valor ingresado ${nombre} ${entra}`);
    console.log(`Valor restado ${nombre} ${sale}`);

   // estaStockBajo(entra, sale);

}









