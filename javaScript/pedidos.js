let arrayPedidos = [];

//Crecion de la lista
function crearlist(producto) {
    let listPedidos = document.createElement("tr");
    listPedidos.className = 'list-pedidos';
    listPedidos.innerHTML = `<td id="nameProducto"  > ${producto.namePedido} </td> 
     <td id="cantidad"> ${producto.cantidad} </td>
     <td id="medida"> ${producto.medida} </td>
     <td  > 
        <button type="button" class="btn btn-outline-danger" onClick="BotonParaBorrar(${producto.id},this)" id="btn-delete" class="btn btn-outline-success btn-lg">
            Eliminar producto
        </button>
    </td>  
    `;
    localStorage.setItem("pedidos", JSON.stringify(arrayPedidos));
    return listPedidos;
}

//Obtenemos id
function getId() {
    if (arrayPedidos != null && arrayPedidos.length > 0) {
        return arrayPedidos[arrayPedidos.length - 1].id + 1;
    }
    return 1;
}

//Agregar pedidos
function agregarProdPedido() {
    let newNamePedido = document.querySelector("#input-producto-nuevo").value;
    document.querySelector("#input-producto-nuevo").value = "";
    let newCantidad = parseInt(document.querySelector("#input-producto-cant").value);
    document.querySelector("#input-producto-cant").value = "";
    let newMedida = document.querySelector("#input-producto-medida").value;
    document.querySelector("#input-producto-medida").value = "";

    if (newNamePedido != null && !isNaN(newCantidad) && newMedida != undefined) {
        let newProdPedido = { id: getId(), namePedido: newNamePedido, cantidad: newCantidad, medida: newMedida };
        arrayPedidos.push(newProdPedido);
        document.querySelector("#list-prod-pedidos").append(
            crearlist(newProdPedido)
        );
        slidearParaArriba();
    }
}

//Animaciones
$('tr').find('td').animate({ padding: '0px' }, { duration: 200 });

function slidearParaAbajo() {
    $('#my-table > tbody > tr.list-pedidos')
        .find('td')
        .wrapInner('<div style="display: block;" />')
        .parent()
        .find('td > div')
        .slideUp(700, function () {
            $(this).parent().parent().remove();

        });
}

function slidearParaArriba() {
    $('#my-table > tbody > tr.list-pedidos')
        .find('td')
        .wrapInner('<div style="display: none;" />')
        .parent()
        .find('td > div')
        .slideDown(700, function () {
            let $set = $(this);
            $set.replaceWith($set.contents());
        });
}

//Guardar y recuperar cookies
let localStorageArrayPedidos = localStorage.getItem("pedidos");
if (localStorageArrayPedidos != "null" && localStorageArrayPedidos != null) {
    arrayPedidos = JSON.parse(localStorageArrayPedidos);
}

if (arrayPedidos != null && arrayPedidos.length > 0) {
    arrayPedidos.forEach(producto => {
        document.querySelector("#list-prod-pedidos").append(
            crearlist(producto)
        );
    })
}

//Btn agregar pedido
let btnAdd = document.querySelector("#btn-add");
btnAdd.addEventListener("click", agregarProdPedido);

//Btn imprimir
let btnPrint = document.querySelector("#btn-print");
btnPrint.addEventListener("click", function imprSelec() {
    let ficha = document.querySelector(".table-print");
    let ventimp = window.open(' ', 'popimpr');
    ventimp.document.write(ficha.innerHTML);
    ventimp.document.close();
    ventimp.print();
    ventimp.close();
})

//Borrar elemento
function BotonParaBorrar(id,boton) {
   $(boton).parent().parent().remove();
   arrayPedidos = arrayPedidos.filter((ped) => ped.id !== id)
    localStorage.setItem("pedidos",JSON.stringify(arrayPedidos));
}

//Borrar lista
let btnDeleteAll = document.querySelector("#btn-delete-all");
btnDeleteAll.addEventListener("click", () => {
    if (confirm("Estas seguro que deseas eliminar la lista")) {
        document.querySelector("#list-prod-pedidos").innerHTML = "";
      } 
});