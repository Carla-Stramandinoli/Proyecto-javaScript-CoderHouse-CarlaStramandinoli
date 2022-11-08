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

// let listCalentitos = [
//     { name: "Burger cordero", id: 0, date: obtenerFechaDe(0), enters: 00, out: 00, stock: obtenerStockDe(0) },
//     { name: "Pan brioche", id: 1, date: obtenerFechaDe(1), enters: 00, out: 00, stock: obtenerStockDe(1) },
//     { name: "Pan pancho", id: 2, date: obtenerFechaDe(2), enters: 00, out: 00, stock: obtenerStockDe(2) },
//     { name: "Duo de queso", id: 3, date: obtenerFechaDe(3), enters: 00, out: 00, stock: obtenerStockDe(3) },
//     { name: "Caramelo de lomo", id: 4, date: obtenerFechaDe(4), enters: 00, out: 00, stock: obtenerStockDe(4) },
//     { name: "Masa taco", id: 5, date: obtenerFechaDe(5), enters: 00, out: 00, stock: obtenerStockDe(5) }
// ]


let listCalentitos = [];

const obtenerDatos = async () => {
    let response = await fetch("../calentitos.json");
    let datos = response.json();
    let info;
    datos.then(
        response => {
            info = response;
            console.log(info)
            info.forEach(producto => {
                crearTrElementos(producto);
                listCalentitos.push(producto);
            })
            listCalentitos.forEach((producto) => {
                let tablaCreada = crearTrElementos(producto);
                document.querySelector("#table").append(tablaCreada);
                producto.stock = obtenerStockDe(producto.id);
                cambiarColor(producto.stock, producto.id);
                return tablaCreada;
            })
            return datos;
        })
}

//Creacion de la tabla y la dibuja en el HTML
function crearTrElementos(producto) {
    let tableProducto = document.createElement("tr");
    tableProducto.className = 'table table-striped table-responsive';
    tableProducto.innerHTML = `<td id = "name" > ${producto.name} </td >
                                            <td> <input type="date" disabled="true" id="input-date-${producto.id}" value="${actualizarFechas(producto)}"> </td>
                                            <td> <input type="number" class="enters" data="${producto.id}"id="input-enters-${producto.id}" placeholder="${producto.enters}"> </td>
                                            <td> <input type="number" class="out" id="input-out-${producto.id}" placeholder="${producto.out}"> </td> 
                                            <td> <input readonly=true type="number" class="stock" id="input-stock-${producto.id}" value="${obtenerStockDe(producto.id)}"> </td>`;
    return tableProducto;
}
obtenerDatos();

//Obtener el stock guardado
function obtenerStockDe(id) {
    let valor = localStorage.getItem("stock-calentitos" + id);
    console.log(valor);
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
        stock = obtenerStockDe(producto.id);
        //date = obtenerFechaDe(producto.id)
        //console.log(producto.date);
    })
    return localStoragelistaCalen;
}

//Cambiar de color el stock
function cambiarColor(stock, id) {
    if (stock <= 200) {
        document.querySelector("#input-stock-" + id).style.backgroundColor = "red";
    } else {
        document.querySelector("#input-stock-" + id).style.backgroundColor = "green";
    }
}

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

//Actualizar stock
function actStock() {
    listCalentitos.forEach(producto => {
        localStorage.setItem("stock-calentitos" + producto.id, JSON.stringify(producto.stock));
    })
}

//Calcular stock
function calcularStock(uniProducidas, uniConsumidas, idProducto) {
    let stockFinal = parseInt(uniProducidas - uniConsumidas);
    let stock = localStorage.getItem("stock-calentitos" + idProducto);
    console.log(stock);
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
    listCalentitos[idProducto].date = formatDate(new Date);
    return parseInt(stock);
}

function recorrerCadaProducto() {
    console.log("La funcion se esta ejecutando");
    console.log(listCalentitos.length)
    for (let i = 0; i < listCalentitos.length; i++) {
        let enters = document.querySelector("#input-enters-" + i).value;
        let out = document.querySelector("#input-out-" + i).value;
        let resultado = calcularStock(enters, out, i)
        if ((enters > 0 || out < 0) && resultado != 0) {
           // actualizarFechas(i)
           listCalentitos[i].date = formatDate(new Date);
           document.querySelector("#input-date-" + i).value =  listCalentitos[i].date;
           localStorage.setItem("fecha-calentitos-act" + i, JSON.stringify(listCalentitos[i].date));
        }
        cambiarColor(resultado, i); 
    }
}

//Agregar pedidos
class PedidoProducto {
    constructor(namePedido, cantidad, medida) {
        this.namePedido = namePedido;
        this.cantidad = cantidad;
        this.medida = medida;
    }
}

function agregarProdPedido() {
    let newNamePedido = document.querySelector("#input-producto-nuevo").value;
    let newCantidad = parseInt(document.querySelector("#input-producto-cant").value);
    let newMedida = document.querySelector("#input-producto-medida").value;

    function crearlist(producto) {
        let listPedidos = document.createElement("tr");
        listPedidos.className = 'list-pedidos';
        listPedidos.innerHTML = `<td id="nameProducto"> ${producto.namePedido} </td> 
             <td id="cantidad"> ${producto.cantidad} </td>
             <td id="medida"> ${producto.medida} </td>
            `;
        console.log(newCantidad);
        console.log(newMedida);
        sessionStorage.setItem("pedidos", JSON.stringify(listPedidos));
        return listPedidos;
    }

    let newProdPedido = { namePedido: newNamePedido, cantidad: newCantidad, medida: newMedida };
    document.querySelector("#list-prod-pedidos").append(
        document.createElement("h5").innerHTML = crearlist(newProdPedido));
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}

function actualizarFechas(producto) {
    let fechaInput = localStorage.getItem("fecha-calentitos-act" + producto.id);
    console.log(producto.date);
    console.log(fechaInput);

    if ((fechaInput == "null" || fechaInput == null) || fechaInput == undefined) {
        return producto.date;
    } else {
        return JSON.parse(fechaInput);
    }
}












//CODIGO QUE CORRE LA APLICACION
document.querySelector("#btn-add").addEventListener("click", addElement);

// //Dibujo los elementos iniciales
// listCalentitos = obtenerListaCalentitos();


actStock();

const btnCalcularStock = document.querySelector("#btn-stock");
btnCalcularStock.addEventListener("click", recorrerCadaProducto);



//Filtrar los que menos cantidad tiene y mostrarlos.
// let btnFilterOn = document.querySelector("#btn-filter");
// btnFilterOn.addEventListener("click", function () {
//     let menuDiv = document.querySelector("#menor-cantidad");
//     if (menuDiv.className == "open") {
//         menuDiv.className = "";
//         menuDiv.innerHTML = '';
//         return
//     }
//     let listaProdMenorCantidad = listCalentitos.filter((producto) => {
//         if (parseInt(producto.stock) <= 100) {
//             return producto.name;
//         }
//     })
//     menuDiv.className = "open";
//     console.log(listaProdMenorCantidad);
//     for (let i = 0; i < listaProdMenorCantidad.length; i++) {
//         let producto = listaProdMenorCantidad[i];
//         let h5Producto = document.createElement("h5");
//         h5Producto.innerHTML = `Los productos con menor stock son: ${producto.name}`;
//         menuDiv.append(h5Producto);
//         console.log(h5Producto);
//     }
// })


// let btnAceptar = document.querySelector("#btn-aceptar");
// btnAceptar.addEventListener("click", agregarProdPedido);

