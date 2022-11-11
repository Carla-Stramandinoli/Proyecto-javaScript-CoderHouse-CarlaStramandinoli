let sectorActual = "islas";

let listIslas = obtenerDatos("../JSON/islas.json", sectorActual);

document.querySelector("#btn-add").addEventListener("click", addElement);

actStock(sectorActual);

const btnCalcularStock = document.querySelector("#btn-stock");
btnCalcularStock.addEventListener("click", recorrerCadaProducto);






