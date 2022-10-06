function calcularStock(uniProducidas, uniConsumidas, item) {
    let stockFinal = uniProducidas - uniConsumidas;
   document.querySelector("#input-stock-" + item ).value = stockFinal;
    return parseInt(stockFinal);
}

const listCalentitos = [
    { name: "Burger cordero", id: 0, date: "", enters: 00, out: 00, stock: 300 },
    { name: "Pan brioche", id: 1, date: "", enters: 00, out: 00, stock: 00 },
    { name: "Pan pancho", id: 2, date: "", enters: 00, out: 00, stock: 00 },
    { name: "Duo de queso", id: 3, date: "", enters: 00, out: 00, stock: 00 },
    { name: "Caramelo de lomo", id: 4, date: "", enters: 00, out: 00, stock: 00 },
    { name: "Masa taco", id: 5, date: "", enters: 00, out: 00, stock: 00 }
]

listCalentitos.forEach(producto => {
    let tableProducto = document.createElement("tr");
    tableProducto.className = 'table table-striped table-responsive';
    tableProducto.innerHTML = `<td id="name" >${producto.name}</td>
                        <td> <input type="date" id="input-date-${producto.id}" ${producto.date}> </td>
                        <td> <input type="number" id="input-enters-${producto.id}" placeholder="${producto.enters}"> </td>
                        <td> <input type="number"id="input-out-${producto.id}" placeholder="${producto.out}"> </td> 
                        <td> <input readonly=true type="number" id="input-stock-${producto.id}" value="${producto.stock}"> </td>`;
                        
    document.querySelector("#table-calentitos").append(tableProducto);
})


const estaStockBajo = (enters, out , i ) => {
    if (calcularStock(enters, out , i ) < 200) {
        console.log("Debes subir el stock");
    } else {
        console.log("El stock esta bien");
    }
}

for (let i = 0; i < 6; i++) {
    let enters;
    let out;

    enters = document.querySelector("#input-enters-" + i).value;
    out = document.querySelector("#input-out-" + i ).value;

    estaStockBajo(enters, out , i);
}






