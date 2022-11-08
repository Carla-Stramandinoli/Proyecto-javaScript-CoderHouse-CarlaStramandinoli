let elementos = [];

const obtenerDatos = async (file, sector) => {
    let response = await fetch(file);
    let datos = response.json();
    datos.then(
        response => {
            response.forEach(producto => {
                crearTrElementos(producto);
                elementos.push(producto);
            })
            elementos.forEach((producto) => {
                let tablaCreada = crearTrElementos(producto,sector);
                document.querySelector("#table").append(tablaCreada);
                producto.stock = obtenerStockDe(producto.id, sector);
                cambiarColor(producto.stock, producto.id);
                return tablaCreada;
            })
            actStock(sector);
        })
    return elementos;
}

//Creacion de la tabla y la dibuja en el HTML
function crearTrElementos(producto, sector) {
    let tableProducto = document.createElement("tr");
    tableProducto.className = 'table table-striped table-responsive';
    tableProducto.innerHTML = `<td id = "name" > ${producto.name} </td >
                                            <td> <input type="date" disabled="true" id="input-date-${producto.id}" value="${actualizarFechas(producto, sector)}"> </td>
                                            <td> <input type="number" class="enters" data="${producto.id}"id="input-enters-${producto.id}" placeholder="${producto.enters}"> </td>
                                            <td> <input type="number" class="out" id="input-out-${producto.id}" placeholder="${producto.out}"> </td> 
                                            <td> <input readonly=true type="number" class="stock" id="input-stock-${producto.id}" value="${obtenerStockDe(producto.id, sector)}"> </td>`;
    return tableProducto;
}


//Obtener el stock guardado
function obtenerStockDe(id, sector) {
    let valor = localStorage.getItem("stock-" + sector + "-" + id);
    if (valor == "null" || valor == null) {
        valor = 0;
    } else {
        valor = JSON.parse(valor);
    }
    return valor;
}

//Obtener ids para crear nuevos productos
function getId() {
    return elementos[elementos.length - 1].id + 1;
}

//Obtener la lista guardada
function obtenerListaCalentitos(sector) {
    let localStoragelistaProductos = localStorage.getItem("lista-" + sector);
    if (localStoragelistaProductos == "null" || localStoragelistaProductos == null) {
        localStoragelistaProductos = elementos;
    } else {
        localStoragelistaProductos = JSON.parse(localStoragelistaProductos);
        localStorage.setItem("lista-" + sector, JSON.stringify(localStoragelistaProductos));
    }
    localStoragelistaProductos.forEach((producto) => {
        stock = obtenerStockDe(producto.id, sector);
    })
    return localStoragelistaProductos;
}

//Calcular stock
function calcularStock(uniProducidas, uniConsumidas, idProducto, sector) {
    let stockFinal = parseInt(uniProducidas - uniConsumidas);
    let stock = localStorage.getItem("stock-"+ sector + "-" + idProducto);
    if (stock == "null" || stock == null) {
        stock = 0;
    } else {
        stock = JSON.parse(stock);
    }
    let localStorageStock = parseInt(stock);
    stock = localStorageStock + stockFinal;
    document.querySelector("#input-stock-" + idProducto).value = stock;
    elementos[idProducto].stock = stock;
    console.log(stock);
    actStock(sector);
    elementos[idProducto].date = formatDate(new Date);
    return parseInt(stock);
}

function recorrerCadaProducto(sector) {
    console.log("La funcion se esta ejecutando");
    console.log(elementos.length);
    for (let i = 0; i < elementos.length; i++) {
        let enters = document.querySelector("#input-enters-" + i).value;
        let out = document.querySelector("#input-out-" + i).value;
        let resultado = calcularStock(enters, out, i, sector);
        if ((enters > 0 || out < 0) && resultado != 0) {
            elementos[i].date = formatDate(new Date);
            document.querySelector("#input-date-" + i).value = elementos[i].date;
            localStorage.setItem("fecha-" + sector + "-act" + i, JSON.stringify(elementos[i].date));
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

//Actualizar stock
function actStock(sector) {
    elementos.forEach(producto => {
        localStorage.setItem("stock-" + sector + "-" + producto.id, JSON.stringify(producto.stock));
    })
}

//Agregar elementos desde la pagina a la tabla
function addElement(sector) {
    let _name = document.querySelector("#input-name-new").value;
    let _id = getId();
    let _date = "";
    let _enters = 00;
    let _out = 00;
    let _stock = document.querySelector("#input-stock-inicial").value;

    let newProducto = { name: _name, id: _id, date: _date, enters: _enters, out: _out, stock: _stock };
    console.log(newProducto);

    elementos = obtenerListaCalentitos();
    elementos.push(newProducto);
    localStorage.setItem("lista-" + sector, JSON.stringify(elementos));
    console.log(elementos);
    actStock();
    document.querySelector("#table").append(
        document.createElement("tr").innerHTML = crearTrElementos(newProducto));
    cambiarColor(_stock, _id);

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

//Actualizar fechas
function actualizarFechas(producto, sector) {
    let fechaInput = localStorage.getItem("fecha-" + sector + "-act" + producto.id);
    if ((fechaInput == "null" || fechaInput == null) || fechaInput == undefined) {
        return producto.date;
    } else {
        return JSON.parse(fechaInput);
    }
}