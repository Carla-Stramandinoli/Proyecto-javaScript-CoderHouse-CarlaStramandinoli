class ListCalentitos {
    constructor(name, id, date, enters, out, stock) {
        this.name = name;
        this.id = id;
        this.date = date;
        this.enters = enters;
        this.out = out;
        this.stock = stock;
    }
}

const listCalentitos = [
    { name: "Burger cordero", id: 0, date: "", enters: 00, out: 00, stock: 300 },
    { name: "Pan brioche", id: 1, date: "", enters: 00, out: 00, stock: 400 },
    { name: "Pan pancho", id: 2, date: "", enters: 00, out: 00, stock: 150 },
    { name: "Duo de queso", id: 3, date: "", enters: 00, out: 00, stock: 500 },
    { name: "Caramelo de lomo", id: 4, date: "", enters: 00, out: 00, stock: 20 },
    { name: "Masa taco", id: 5, date: "", enters: 00, out: 00, stock: 100 }
];

listCalentitos.forEach(producto => {
    let tableProducto = document.createElement("tr");
    tableProducto.className = 'table table-striped table-responsive';
    tableProducto.innerHTML = `<td id="name"> ${producto.name} </td>
                        <td> <input type="date" id="input-date-${producto.id}" ${producto.date}> </td>
                        <td> <input type="number" id="input-enters-${producto.id}" placeholder="${producto.enters}"> </td>
                        <td> <input type="number"id="input-out-${producto.id}" placeholder="${producto.out}"> </td> 
                        <td> <input readonly=true type="number" id="input-stock-${producto.id}" value="${producto.stock}"> </td>`;

    document.querySelector("#table-calentitos").append(tableProducto);
    localStorage.setItem("stock-calentitos", JSON.stringify(producto.stock));
    console.log(producto.stock);
})


function calcularStock(uniProducidas, uniConsumidas, item) {
    let stockFinal = parseInt(uniProducidas - uniConsumidas);
    let stock = parseInt(document.querySelector("#input-stock-" + item).value) + stockFinal;
    document.querySelector("#input-stock-" + item).value = stock;
    return parseInt(stock);
}

const estaStockBajo = (enters, out, i) => {
    if (calcularStock(enters, out, i) < 200) {
        console.log("Debes subir el stock");
    } else {
        console.log("El stock esta bien");
    }
}

function recorrerCadaProducto() {
    for (let i = 0; i < 6; i++) {
        let enters;
        let out;

        enters = document.querySelector("#input-enters-" + i).value;
        out = document.querySelector("#input-out-" + i).value;

        estaStockBajo(enters, out, i);
    }
}

const btnCalcularStock = document.querySelector("#btn-stock");
btnCalcularStock.addEventListener("click", recorrerCadaProducto);


//Funcion para filtrar los que menos cantidad tiene.



let buscarPorCantidad = listCalentitos.filter(
    function filtrar (producto) {
        if (producto.stock <= 100) {
            let menorCantidad = document.createElement("h5");
            menorCantidad.innerHTML = `Los productos que tienen menor stock son: ${producto.name}`;
            document.querySelector("#menor-cantidad").append(menorCantidad);
        }
        const btnFilter = document.querySelector("#btn-filter");
        btnFilter.addEventListener("click", filtrar);
    });


