let sectorActual = "calentitos";

let listCalentitos = obtenerDatos("../JSON/calentitos.json", sectorActual);

document.querySelector("#btn-add").addEventListener("click", addElement);

actStock(sectorActual);

const btnCalcularStock = document.querySelector("#btn-stock");
btnCalcularStock.addEventListener("click", recorrerCadaProducto);

