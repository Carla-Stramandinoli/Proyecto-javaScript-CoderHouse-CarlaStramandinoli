let listCalentitos = obtenerDatos("../JSON/frios.json", "frios");

obtenerDatos();

document.querySelector("#btn-add").addEventListener("click", addElement);

actStock("frios");

const btnCalcularStock = document.querySelector("#btn-stock");
btnCalcularStock.addEventListener("click", recorrerCadaProducto);