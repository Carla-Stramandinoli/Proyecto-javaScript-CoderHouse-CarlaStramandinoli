let listCalentitos = obtenerDatos("../JSON/islas.json", "islas");

obtenerDatos();

document.querySelector("#btn-add").addEventListener("click", addElement);

actStock("islas");

const btnCalcularStock = document.querySelector("#btn-stock");
btnCalcularStock.addEventListener("click", recorrerCadaProducto);