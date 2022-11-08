//Defino la clase con su lista de objetos
class Frios {
    constructor(name, id, date, enters, out, stock) {
        this.name = name;
        this.id = id;
        this.date = date;
        this.enters = enters;
        this.out = out;
        this.stock = stock;
    }
}


// let listFrios = [
//     { name: "Roll burrata", id: 0, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Biscottif almendras", id: 1, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Anillos salmfon", id: 2, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Roll salmon", id: 3, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Queso azul", id: 4, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Biscotti pasas", id: 5, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Carpacchio", id: 6, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Focaccia", id: 7, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Ceviche", id: 8, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Crocante maiz", id: 9, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Salmon marinado", id: 10, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Pan a vapor", id: 11, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Creme brule", id: 12, date: "", enters: 0, out: 0, stock: 0 },
//     { name: "Arroz negro", id: 13, date: "", enters: 0, out: 0, stock: 0 }
// ];
// actStock();

// //Cambiar color segun la cantidad
// function cambiarColor(stock, id) {
//     if (stock <= 200) {
//         document.querySelector("#input-stock-" + id).style.backgraundColor = "red";
//     } else {
//         document.querySelector("#input-stock-" + id).style.backgraundColor = "green";
//     }
// }

// function obtenerId() {
//     for (let i = 0; i < listFrios.length; i++) {
//         document.querySelector("#input-stock-" + i);
//     }
// }

// //Recorrer cada producto y guardar el stock
// function actStock() {
//     let id = obtenerId()
//     let stockGuardado = localStorage.getItem("stock-frios" + id);
//     if (stockGuardado == "null" || stockGuardado == null) {
//         stockGuardado = 0;
//     } else {
//         stockGuardado = JSON.parse(stockGuardado);
//     }
//     console.log(stockGuardado);
//     return stockGuardado;
// }


// function ejecutarFuncion() {
//     let stock;
//     for (let i = 0; i < listFrios.length; i++) {
//         console.log(i)
//         let enters = document.querySelector("#input-enters-" + i).value;
//         let out = document.querySelector("#input-out-" + i).value;
//         stock = parseInt(enters - out);
//         document.querySelector("#input-stock-" + i).value = 
//         parseInt( document.querySelector("#input-stock-" + i).value) + parseInt(stock);
//         console.log("la funcion se ejecuto");
//         console.log(stock);
//         localStorage.setItem("stock-frios" + i, JSON.stringify(stock));
//         cambiarColor(stock, i);
//         actStock();
//     }
//     return stock;
// }

// let btnCalcularStock = document.querySelector("#btn-stock");
// btnCalcularStock.addEventListener("click", ejecutarFuncion);

// function addElement() {
//     let nameAdd = document.querySelector("#input-name-new").value;
//     let idAdd = obtenerId();
//     let dateAdd = "";
//     let entersAdd = 00;
//     let outAdd = 00;
//     let stockAdd = actStock();

//     let newElement = {name: nameAdd, id: idAdd, date: dateAdd, enters: entersAdd, out: outAdd, stock: stockAdd};
//     console.log(newElement);
//     listFrios.push(newElement);
//     // document.querySelector("#table-frios").append(newElement);

// }

// let btnAdd = document.querySelector("#btn-add");
// btnAdd.addEventListener("click", addElement)


let listFrios = obtenerDatos("../frios.json", "frios");