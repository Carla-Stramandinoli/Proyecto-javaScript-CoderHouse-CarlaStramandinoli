let sectorActual = "frios";

let listCalentitos = obtenerDatos("../JSON/frios.json", sectorActual);

document.querySelector("#btn-add").addEventListener("click", addElement);

actStock(sectorActual);

const btnCalcularStock = document.querySelector("#btn-stock");
btnCalcularStock.addEventListener("click", recorrerCadaProducto);

let btnAceptar = document.querySelector("#btn-aceptar");
btnAceptar.addEventListener("click", agregarProdPedido);