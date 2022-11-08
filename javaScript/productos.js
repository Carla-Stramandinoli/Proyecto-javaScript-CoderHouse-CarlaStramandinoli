

const obtenerDatos = async (file, tipoDeProducto) => {
    let response = await fetch(file);
    let datos = response.json();
    let elementos = [];
    datos.then(
        response => {
            response.forEach(producto => {
                crearTrElementos(producto);
                elementos.push(producto);
            })
            elementos.forEach((producto) => {
                let tablaCreada = crearTrElementos(producto,tipoDeProducto);
                document.querySelector("#table").append(tablaCreada);
                producto.stock = obtenerStockDe(producto.id);
                cambiarColor(producto.stock, producto.id);
                return tablaCreada;
            })
            actStock(elementos, tipoDeProducto);
        })
    return elementos;
}

//Actualizar stock
// elementos, tipoDeProducto  +tipoDeProducto
function actStock() {
    listCalentitos.forEach(producto => {
        localStorage.setItem("stock-calentitos" + producto.id, JSON.stringify(producto.stock));
    })
}


//Dibujar la tabla y mostrarla
function crearTrElementos(producto ,tipoDeProducto) {
    let tableProducto = document.createElement("tr");
    tableProducto.className = 'table table-striped table-responsive';
    tableProducto.innerHTML = `<td id = "name" > ${producto.name} </td >
      <td> <input type="date" disabled="true" 
      id="input-date-${producto.id}" value="${actualizarFechas(producto , tipoDeProducto)}"> </td>
      <td> <input type="number" class="enters" data="${producto.id}"id="input-enters-${producto.id}" placeholder="${producto.enters}"> </td>
      <td> <input type="number" class="out" id="input-out-${producto.id}" placeholder="${producto.out}"> </td> 
      <td> <input readonly=true type="number" class="stock" id="input-stock-${producto.id}" value="${obtenerStockDe(producto.id)}"> </td>`;
    return tableProducto;
}

//tipo + tipo
function actualizarFechas(producto) {
    let fechaInput = localStorage.getItem("fecha-calentitos-act" + producto.id);
    if ((fechaInput == "null" || fechaInput == null) || fechaInput == undefined) {
        return producto.date;
    } else {
        return JSON.parse(fechaInput);
    }
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
        stock = obtenerStockDe(producto.id);
        //date = obtenerFechaDe(producto.id)
        //console.log(producto.date);
    })
    return localStoragelistaCalen;
}

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
    listCalentitos[idProducto].date = formatDate(new Date);
    return parseInt(stock);
}

function recorrerCadaProducto() {
    console.log("La funcion se esta ejecutando");
    console.log(listCalentitos.length);
    for (let i = 0; i < listCalentitos.length; i++) {
        let enters = document.querySelector("#input-enters-" + i).value;
        let out = document.querySelector("#input-out-" + i).value;
        let resultado = calcularStock(enters, out, i);
        if ((enters > 0 || out < 0) && resultado != 0) {
            listCalentitos[i].date = formatDate(new Date);
            document.querySelector("#input-date-" + i).value = listCalentitos[i].date;
            localStorage.setItem("fecha-calentitos" + i, JSON.stringify(listCalentitos[i].date));
        }
        cambiarColor(resultado, i);
    }
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

