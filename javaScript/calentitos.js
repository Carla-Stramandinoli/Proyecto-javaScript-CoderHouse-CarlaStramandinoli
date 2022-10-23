/* FALTA POR HACER:
Cambiar nombres de variables a un solo idioma.
Guardar fecha en localStorage y que al recargar este la fecha de ultima actualizacion de stock
Agregar contenido y funcionalidaddes a la pagina "pedidos", "frios", "islas"
Modificar stylos
Hacer funcionar boton "Buscar"
*/

//Defino la clase con su lista de objetos
class Calentitos {
    constructor(name, id, date, enters, out, stock) {
        this.name = name;
        this.id = id;
        this.date = date;
        this.enters = enters;
        this.out = out;
        this.stock = stock;
    }
}

let listCalentitos = [
    { name: "Burger cordero", id: 0, date: "", enters: 00, out: 00, stock: obtenerStockDe(0) },
    { name: "Pan brioche", id: 1, date: "", enters: 00, out: 00, stock: obtenerStockDe(1) },
    { name: "Pan pancho", id: 2, date: "", enters: 00, out: 00, stock: obtenerStockDe(2) },
    { name: "Duo de queso", id: 3, date: "", enters: 00, out: 00, stock: obtenerStockDe(3) },
    { name: "Caramelo de lomo", id: 4, date: "", enters: 00, out: 00, stock: obtenerStockDe(4) },
    { name: "Masa taco", id: 5, date: "", enters: 00, out: 00, stock: obtenerStockDe(5) }
]

//Creacion de la tabla
function crearTrElementos(producto) {
    let tableProducto = document.createElement("tr");
    tableProducto.className = 'table table-striped table-responsive';
    tableProducto.innerHTML = `<td id="name"> ${producto.name} </td>
                        <td> <input type="date" id="input-date-${producto.id}" ${producto.date}> </td>
                        <td> <input type="number" class="input-stock" id="input-enters-${producto.id}" placeholder="${producto.enters}"> </td>
                        <td> <input type="number" class="input-stock" id="input-out-${producto.id}" placeholder="${producto.out}"> </td> 
                        <td> <input readonly=true type="number" class="input-stock" id="input-stock-${producto.id}" value="${producto.stock}"> </td>`;
    return tableProducto;
}

//Obtener el stock guardado
function obtenerStockDe(id) {
    let valor = localStorage.getItem("stock-calentitos" + id);
    if (valor == "null" || valor == null) {
        valor = 0;
    } else {
        valor = JSON.parse(valor);
    }
    return valor;
}

//Obtener ids para crear nuevos productos
function getId() {
    return listCalentitos[listCalentitos.length - 1].id + 1;
}

//Obtener la lista guardada
function obtenerListaCalentitos() {
    let localStoragelistaCalen = localStorage.getItem("lista-calen");

    if (localStoragelistaCalen == "null" || localStoragelistaCalen == null) {
        localStoragelistaCalen = listCalentitos;
    } else {
        localStoragelistaCalen = JSON.parse(localStoragelistaCalen);
        localStorage.setItem("lista-calen", JSON.stringify(localStoragelistaCalen));
    }
    localStoragelistaCalen.forEach((producto) => {
        producto.stock = obtenerStockDe(producto.id);
        console.log(producto.stock)
    })

    return localStoragelistaCalen;
}

//Cambiar de color el stock
function cambiarColor(stock, id) {
    if (stock < 200) {
        document.querySelector("#input-stock-" + id).style.backgroundColor = "red";
    } else {
        document.querySelector("#input-stock-" + id).style.backgroundColor = "green";
    }
}

//Dibujo los elementos iniciales
listCalentitos = obtenerListaCalentitos();

listCalentitos.forEach((producto) => {
    let tablaCreada = crearTrElementos(producto);
    document.querySelector("#table-calentitos").append(tablaCreada);
    cambiarColor(producto.stock, producto.id);
    return tablaCreada;
})

//Agregar elementos desde la pagina a la tabla
function addElement() {
    let _name = document.querySelector("#input-name-new").value;
    let _id = getId();
    let _date = "";
    let _enters = 00;
    let _out = 00;
    let _stock = document.querySelector("#input-stock-inicial").value;

    let newProducto = { name: _name, id: _id, date: _date, enters: _enters, out: _out, stock: _stock };
    console.log(newProducto);

    listCalentitos = obtenerListaCalentitos();
    listCalentitos.push(newProducto);
    localStorage.setItem("lista-calen", JSON.stringify(listCalentitos));
    console.log(listCalentitos);
    actStock();
    document.querySelector("#table-calentitos").append(
        document.createElement("tr").innerHTML = crearTrElementos(newProducto));
    cambiarColor(_stock, _id);

}
document.querySelector("#btn-add").addEventListener("click", addElement);

//Actualizar stock
function actStock() {
    listCalentitos.forEach(producto => {
        localStorage.setItem("stock-calentitos" + producto.id, JSON.stringify(producto.stock));
    })
}
actStock();

//Calcular stock
function calcularStock(uniProducidas, uniConsumidas, idProducto) {
    let stockFinal = parseInt(uniProducidas - uniConsumidas);
    let stock = localStorage.getItem("stock-calentitos" + idProducto);

    if (stock == "null" || stock == null) {
        stock = 0;
    } else {
        stock = JSON.parse(stock);
    }
    let localStorageStock = parseInt(stock);
    stock = localStorageStock + stockFinal;
    document.querySelector("#input-stock-" + idProducto).value = stock;
    listCalentitos[idProducto].stock = stock;
    console.log(stock);
    actStock();
    return parseInt(stock);
}

function recorrerCadaProducto() {
    console.log("La funcion se esta ejecutando");
    console.log(listCalentitos.length)
    for (let i = 0; i < listCalentitos.length; i++) {
        let enters;
        let out;
        enters = document.querySelector("#input-enters-" + i).value;
        out = document.querySelector("#input-out-" + i).value;
        let resultado = calcularStock(enters, out, i)
        cambiarColor(resultado, i);
    }
}
const btnCalcularStock = document.querySelector("#btn-stock");
btnCalcularStock.addEventListener("click", recorrerCadaProducto);

//Filtrar los que menos cantidad tiene y mostrarlos.
let btnFilterOn = document.querySelector("#btn-filter");
btnFilterOn.addEventListener("click", function () {
    let menuDiv = document.querySelector("#menor-cantidad");
    if (menuDiv.className == "open") {
        menuDiv.className = "";
        menuDiv.innerHTML = '';
        return
    }

    let listaProdMenorCantidad = listCalentitos.filter((producto) => {
        if (parseInt(producto.stock) <= 100) {
            return producto.name;
        }
    })
    menuDiv.className = "open";
    console.log(listaProdMenorCantidad);
    for (let i = 0; i < listaProdMenorCantidad.length; i++) {
        let producto = listaProdMenorCantidad[i];
        let h5Producto = document.createElement("h5");
        h5Producto.innerHTML = `Los productos con menor stock son: ${producto.name}`;
        menuDiv.append(h5Producto);
        console.log(h5Producto);
    }
})





// FUNCIONALIDAD \ EL CODIGO QUE SE NECETIA PARA CORRER la funcionlidad y mostrarle el resultado al usuario

