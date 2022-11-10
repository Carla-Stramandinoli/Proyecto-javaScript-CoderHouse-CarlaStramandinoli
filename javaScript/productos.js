/* FALTA POR HACER:
Cambiar nombres de variables a un solo idioma.
*/

let elementos = [];

const obtenerDatos = async (file, tipo) => {
    let response = await fetch(file);
    let datos = response.json();
    datos.then(
        response => {
            response.forEach(producto => {
                crearTrElementos(producto);
                elementos.push(producto);
            })
            let localStoragelistaProductos = localStorage.getItem("lista-" + tipo);
            if (localStoragelistaProductos == "null" || localStoragelistaProductos == null) {
                localStorage.setItem("lista-" + tipo, JSON.stringify(elementos));
            } else {
                elementos = JSON.parse(localStoragelistaProductos);
            }
            elementos.forEach((producto) => {
                let tablaCreada = crearTrElementos(producto, tipo);
                document.querySelector("#table").append(tablaCreada);
                document.querySelector("#table").dataset.tipo = tipo;
                producto.stock = obtenerStockDe(producto.id, tipo);
                cambiarColor(producto.stock, producto.id);
                return tablaCreada;
            })
            actStock(tipo);
            inicializarTooltipEnters();
            inicializarTooltipOuts();
            inicializarTooltipDate();

        })
    return elementos;
}

//Creacion de la tabla y la dibuja en el HTML
function crearTrElementos(producto, tipo) {
    let tableProducto = document.createElement("tr");
    tableProducto.className = 'table table-striped table-responsive';
    tableProducto.innerHTML = `<td id = "name" > ${producto.name} </td >
 <td> <input type="date" class="date grey" readonly=true 
id="input-date-${producto.id}" value="${actualizarFechas(producto, tipo)}"> </td>
<td> <input type="number" class="enters" data="${producto.id}"
id="input-enters-${producto.id}" placeholder="${producto.enters}"> </td>
<td> <input type="number" class="out" 
id="input-out-${producto.id}" placeholder="${producto.out}"> </td> 
<td> <input readonly=true type="number" class="stock" 
id="input-stock-${producto.id}" value="${obtenerStockDe(producto.id, tipo)}"> </td>`;
    return tableProducto;
}


//Obtener el stock guardado
function obtenerStockDe(id, tipo) {
    tipo = document.querySelector("#table").dataset.tipo;
    let valor = localStorage.getItem("stock-" + tipo + "-" + id);
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

//Calcular stock
function calcularStock(uniProducidas, uniConsumidas, idProducto, tipo) {
    let stockFinal = parseInt(uniProducidas - uniConsumidas);
    let stock = localStorage.getItem("stock-" + tipo + "-" + idProducto);
    console.log(tipo);
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
    actStock(tipo);
    elementos[idProducto].date = formatDate(new Date);
    return parseInt(stock);
}

function recorrerCadaProducto() {
    console.log("La funcion se esta ejecutando");
    console.log(elementos.length);
    for (let i = 0; i < elementos.length; i++) {
        let enters = document.querySelector("#input-enters-" + i).value;
        let out = document.querySelector("#input-out-" + i).value;
        document.querySelector("#input-enters-" + i).value = 0;
        document.querySelector("#input-out-" + i).value = 0;
        let tipo = document.querySelector("#table").dataset.tipo;
        let resultado = calcularStock(enters, out, i, tipo);
        if ((enters > 0 || out < 0) && resultado != 0) {
            elementos[i].date = formatDate(new Date);
            document.querySelector("#input-date-" + i).value = elementos[i].date;
            localStorage.setItem("fecha-" + tipo + "-act-" + i, JSON.stringify(elementos[i].date));
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
function actStock(tipo) {
    tipo = document.querySelector("#table").dataset.tipo;
    elementos.forEach(producto => {
        localStorage.setItem("stock-" + tipo + "-" + producto.id, JSON.stringify(producto.stock));
    })
}

//Agregar elementos desde la pagina a la tabla
function addElement(producto) {
    tipo = document.querySelector("#table").dataset.tipo;
    let _name = document.querySelector("#input-name-new").value;
    document.querySelector("#input-name-new").value = "";
    let _id = getId();
    let _date = "";
    let _enters = "00";
    let _out = "00";
    let _stock = document.querySelector("#input-stock-inicial").value;
    document.querySelector("#input-stock-inicial").value = "";

    let newProducto = { name: _name, id: _id, date: _date, enters: _enters, out: _out, stock: _stock };
    console.log(newProducto);
    elementos.push(newProducto);
    localStorage.setItem("lista-" + tipo, JSON.stringify(elementos));
    console.log(elementos);
    actStock(elementos, tipo);
    elementos[_id].date = formatDate(new Date);
    actualizarFechas(producto, tipo);
    localStorage.setItem("fecha-" + tipo + "-act-" + _id, JSON.stringify(elementos[_id].date));
    document.querySelector("#table").append(
        document.createElement("tr").innerHTML = crearTrElementos(newProducto));
    cambiarColor(_stock, _id);

}

//Actualizar fechas
function actualizarFechas(producto, tipo) {
    let fechaInput = localStorage.getItem("fecha-" + tipo + "-act-" + producto.id);
    if ((fechaInput == "null" || fechaInput == null) || fechaInput == undefined) {
        return producto.date;
    } else {
        return JSON.parse(fechaInput);
    }
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

//Filtrar los que menos cantidad tiene y mostrarlos.
let btnFilterOn = document.querySelector("#btn-filter");
btnFilterOn.addEventListener("click", function () {
    let menuDiv = document.querySelector("#menor-cantidad");
    if (menuDiv.className == "open") {
        menuDiv.className = "";
        menuDiv.innerHTML = '';
        return
    }

    let listaProdMenorCantidad = elementos.filter((producto) => {
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

//Animaciones
function inicializarTooltipEnters() {
    const button = document.querySelectorAll('.enters');
    const tooltip = document.querySelector('#tooltip');
    button.forEach(nodo => {
        let popperInstance = Popper.createPopper(nodo, tooltip);
        function show() {
            tooltip.setAttribute('data-show', '');
            popperInstance.update();
        }
    
        function hide() {
            tooltip.removeAttribute('data-show');
        }
    
        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave'];
    
        showEvents.forEach((event) => {
            nodo.addEventListener(event, show);
        });
    
        hideEvents.forEach((event) => {
            nodo.addEventListener(event, hide);
        });
    })
}

function inicializarTooltipOuts() {
    const button = document.querySelectorAll('.out');
    const tooltip = document.querySelector('#tooltip-out');
    button.forEach(nodo => {
        let popperInstance = Popper.createPopper(nodo, tooltip);
        function show() {
            tooltip.setAttribute('data-show', '');
            popperInstance.update();
        }
    
        function hide() {
            tooltip.removeAttribute('data-show');
        }
    
        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave'];
    
        showEvents.forEach((event) => {
            nodo.addEventListener(event, show);
        });
    
        hideEvents.forEach((event) => {
            nodo.addEventListener(event, hide);
        });
    })
}
function inicializarTooltipDate() {
    const button = document.querySelectorAll('.date');
    const tooltip = document.querySelector('#tooltip-date');
    button.forEach(nodo => {
        let popperInstance = Popper.createPopper(nodo, tooltip);
        function show() {
            tooltip.setAttribute('data-show', '');
            popperInstance.update();
        }
    
        function hide() {
            tooltip.removeAttribute('data-show');
        }
    
        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave'];
    
        showEvents.forEach((event) => {
            nodo.addEventListener(event, show);
        });
    
        hideEvents.forEach((event) => {
            nodo.addEventListener(event, hide);
        });
    })
}