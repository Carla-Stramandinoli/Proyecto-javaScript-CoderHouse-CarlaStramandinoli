let listCalentitos = obtenerDatos("../JSON/calentitos.json", "calentitos");

obtenerDatos();

document.querySelector("#btn-add").addEventListener("click", addElement);

actStock("calentitos");

const btnCalcularStock = document.querySelector("#btn-stock");
btnCalcularStock.addEventListener("click", recorrerCadaProducto);