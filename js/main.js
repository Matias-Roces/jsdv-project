// Carrito de compras

//Tareas que me falta realizar:

// Inicialización de las listas de nodos iniciales y arrays maestros

const listadoProductos = [];
const categoria = ["Linea Home", "Linea Spa", "Jabones", "Cosmetica Natural", "Almohadillas y Antifaces", "Esponjas"];
const carrito = [];
const busqueda = document.querySelector("#buscarProducto");
const catalogo = document.querySelector("#catalogo");
const selectCategoria = document.querySelector("#selectCategoria");
const textBoxBuscar = document.querySelector("#textBoxBuscar");
const botonPagar = document.querySelector(".btn-pagar");
let total = 0;
let carritoJSON;

/////////////////////////// FUNCIONES /////////////////////////////////
// funcion para traer de la API
const fetchApi = async (url) => {
    //validamos el fetch
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener la API:", error);
        return [];
    }
};
// funcion que muestra u oculta el carrito si no hay items con la clase d-none de bootstrap
function mostrarOcultarCarrito(boolean){
    if (boolean) {
        document.querySelector(".carrito").classList.remove("d-none");
        document.querySelector(".float-w").classList.remove("d-none");
    }
    else {
        document.querySelector(".carrito").classList.add("d-none");
        document.querySelector(".float-w").classList.add("d-none");
    }
}
// funcion que renderiza las cards
function crearCards(arr) {
    //primero vaciamos el catalogo
    catalogo.innerHTML = "";
    let html;
    //recorremos el array de forma DESESTRUCTURADA que le pasamos a la funcion, para crear las cards con cada objeto que tenga el array
    for (const {nombre, categoria, precio, img} of arr) {
        html = `<div class="card-producto">
                    <div class="image-producto">
                        <img src="./media/products/${img}" class="" alt="${nombre}" />
                    </div>
                    <span class="title2">${categoria}</span>
                    <span class="title">${nombre}</span>
                    <span class="price">$${precio}</span>
                </div>`;        
        catalogo.innerHTML+= html;        
    }
    // guardamos en una lista de nodos las nuevas cards y las devolvemos
    const itemsAlCarrito = document.querySelectorAll('.card-producto');
    return itemsAlCarrito;
}
// funcion que filtra segun la KEY del objeto
function filtroKey(arr, condicion, obKey) {
    const filtro = arr.filter((el) => el[obKey].includes(condicion));
    return filtro;
}
// recarga el LocalStorage
function renderizarCarritoStorage() {    
    const productosJSON = JSON.parse(localStorage.getItem("carrito"));
    //validamos que productosJSON no este vacio
    if (productosJSON) {        
        for(const el of productosJSON) {
            // Pusheamos al array maestro carrito cada objeto del LS
            carrito.push(el);                        
        }
        // Mostramos el carrito de compras con los objetos pusheados y actualizamos el total
        agregarAlCarrito(carrito);
        // Habilitamos la escucha de los botones al recargar el carrito
        const restar = capturarBotones("restar-cantidad");
        const sumar = capturarBotones("sumar-cantidad");
        eventoEliminar(capturarBotones("btn-eliminar"));
        eventoRestar(restar);
        eventoSumar(sumar);
        actualizarTotalCarrito();
        mostrarOcultarCarrito(true);
    }
}
// Actualiza el precio total del carrito de compras
function actualizarTotalCarrito() {
    const carritoContenedor = document.querySelector(".carrito");
    const carritoItems = carritoContenedor.querySelectorAll(".carrito-item"); 
    total = 0;   
    for (const el of carritoItems) {
        let item = el;        
        const precioElemento = item.querySelector(".carrito-item-precio");
        const precio = parseFloat(precioElemento.innerText.replace('$',''));
        let cantidadItem = item.querySelector(".carrito-item-cantidad").value;
        total += precio * cantidadItem;
    }   
    document.querySelector(".carrito-precio-total").value = ` $ ${total}`;
}
//funcion que guarda los nuevos botones en un array y lo devuelve 
function capturarBotones (className) {
    const misBotones = document.querySelectorAll(`.${className}`);
    return misBotones;
}
// funcion que captura el click en el tachito para eliminar un item del carrito, actualizando el precio y el carrito.
function eventoEliminar(botones) {
    for (const el of botones) {
        const buttonEl = el;
        buttonEl.addEventListener("click", () => {
            const item = el.parentElement;            
            const nombreProducto = item.querySelector(".carrito-item-titulo").innerText;
            // Elimina el artículo del carrito por su nombre
            const index = carrito.findIndex((producto) => producto.nombre === nombreProducto);
            if (index !== -1) {
                carrito.splice(index, 1);
            }
            // Elimina el elemento del DOM
            item.remove();
            Toastify({
                    text: "Producto eliminado del carrito",                
                    duration: 3000,
                    gravity:"bottom",
                    position:"left",              
                    style: {
                        background: "linear-gradient(to top, rgb(110, 110, 110), rgb(236, 215, 255))",
                        color: "#000",                        
                    }
                }).showToast();
            // Actualiza el precio total del carrito
            actualizarTotalCarrito();
            // Actualiza el localStorage
            carritoJSON = JSON.stringify(carrito);
            localStorage.setItem("carrito", carritoJSON);  
            //pregunta si el carrito esta vacio para ocultarlo
            const carritoItems = document.querySelector(".carrito-items");
            carritoItems.childElementCount == 0 && mostrarOcultarCarrito(false);          
        });
    }
}
//funcion que suma 1 en la cantidad de producto que quiere comprar el cliente
function eventoSumar(botones) {
    for (const el of botones) {
        const sumarProducto = el;
        sumarProducto.addEventListener("click", ()=> {
            const item = el.parentElement;
            const cantidad = item.querySelector(".carrito-item-cantidad");
            cantidad.value++;
            actualizarTotalCarrito();
        })
    }
}
function eventoRestar(botones) {
    for (const el of botones) {
        const restarProducto = el;
        restarProducto.addEventListener("click", () => { 
            const item = el.parentElement;           
            const cantidad = item.querySelector(".carrito-item-cantidad");     
            if (parseFloat(cantidad.value) === 1) {                
                const nombreProducto = item.parentElement.querySelector(".carrito-item-titulo").innerText;
                Swal.fire(`No puede reducir más la cantidad de ${nombreProducto}`,`Si desea eliminar ${nombreProducto}, por favor eliminelo desde el boton de eliminar.`,"warning");               
            } else {
                cantidad.value = parseFloat(cantidad.value) - 1;
                // Actualiza el precio total del carrito
                actualizarTotalCarrito();
            }
        });
    }
}
//funcion que detecta los clicks en las cards para pushearlas al carrito
function clickAlCarrito(arr) {
    for (const el of arr) {    
        el.addEventListener("click", () => {
            let spanText = el.querySelector(':scope > .title');
            // Buscar el producto en listadoProductos por su nombre y guardarlo en productoEncontrado
            const productoEncontrado = listadoProductos.find(producto => producto.nombre  === spanText.innerText);
            // funcion que valida que no esté repetido y pushea al carrito el producto
            validarPushCarrito(productoEncontrado);       
        });
    }
}

//funcion que pushea al carrito validando que, si ya se encuentra pusheado, este no se cargue y salte un SweetAlert
function validarPushCarrito(producto) {
    const repetidoEnElCarrito = carrito.find(e => e.nombre  === producto.nombre);    
    if (repetidoEnElCarrito != undefined) {
        Swal.fire("Ups",`${producto.nombre} ya se encuentra en el carrito`,"warning");        
    }
    else{
        // si el producto clickeado no se encuentra en el carrito, muestra el carrito por si es el primer item, pushea al array maestro carrito y al local storage, captura los nuevos botones que se generan en cada item activa la escucha de sus clicks, y actualiza el total del carrito
        mostrarOcultarCarrito(true)
        carrito.push(producto);        
        agregarAlCarrito(carrito);
        carritoJSON = JSON.stringify(carrito);
        localStorage.setItem("carrito", carritoJSON);
        const restar = capturarBotones("restar-cantidad");
        const sumar = capturarBotones("sumar-cantidad");
        eventoEliminar(capturarBotones("btn-eliminar"));
        eventoRestar(restar);
        eventoSumar(sumar);        
        actualizarTotalCarrito();
    }    
}
// funcion que renderiza un producto clickeado en el carrito de compras
function agregarAlCarrito(arr) {
    const carritoItems = document.querySelector("#cargarCarrito");    
    carritoItems.innerHTML = "";
    for (const {nombre, img, precio} of arr) {
        let html = `<div class="carrito-item">
                        <img src="./media/products/${img}" alt="${nombre}">
                        <div class="carrito-item-detalles">
                            <span class="carrito-item-titulo">${nombre}</span>
                            <div class="selector-cantidad">
                                <i class="bi bi-dash restar-cantidad"></i>                                
                                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                                <i class="bi bi-plus sumar-cantidad"></i>                                
                            </div>
                            <span class="carrito-item-precio">$${precio}</span>
                        </div>
                        <span class="btn-eliminar">
                            <i class="bi bi-trash"></i>                            
                        </span>
                    </div>`;
        carritoItems.innerHTML+= html;
    }
}
///////////////// Ejecución //////////////////////////////
// Llamar a la función para obtener los datos de la API y agregarlos a listadoProductos
const apiUrl = "../data/data.json";
fetchApi(apiUrl)
    .then((apiData) => {    
            if (Array.isArray(apiData)) {
                // Pushear los objetos desde la api al array listadoProductos
                listadoProductos.push(...apiData);
                // render de todos los productos al inicio de la pagina
                crearCards(listadoProductos);
                // Habilito los listeners para los clicks en las cards
                clickAlCarrito(crearCards(listadoProductos));               
            }             
        }
    )    
// Si no hay nada en el LS, no se muestra el carrito
mostrarOcultarCarrito(false);
// Si hay items en el LS del carrito, mostramos carrito y renderizamos items
renderizarCarritoStorage();
// select que filtra por categoría de producto
selectCategoria.addEventListener("change", () => {
        const nuevoListado=[];        
        if (selectCategoria.value === "Todos") {
            crearCards(listadoProductos);                        
            clickAlCarrito(itemsAlCarrito);
            nuevoListado = itemsAlCarrito;
        }
        else {
            crearCards(filtroKey(listadoProductos, categoria[parseInt(selectCategoria.value) - 1], "categoria"));
            const listadoNodos = document.querySelectorAll('.card-producto');
            clickAlCarrito(listadoNodos); 
            nuevoListado = listadoNodos;
        }          
        return nuevoListado;
    });
//boton de busqueda que filtra por nombre de producto
busqueda.addEventListener("click", (event) => {
    event.preventDefault();
    crearCards(filtroKey(listadoProductos, textBoxBuscar.value.toUpperCase(), "nombre"));
    const listadoNodos2 = document.querySelectorAll('.card-producto');
    clickAlCarrito(listadoNodos2);
});
// simulacion de compra efectuada, el boton borrará los datos del carrito al finalizar la compra y en el LS y ocultará el carrito
botonPagar.addEventListener("click", ()=>{  
    const carritoItems = document.querySelector('#cargarCarrito');  
    Swal.fire("Gracias por su compra!", "La vie est Belle", "success");
    total = 0;
    document.querySelector(".carrito-precio-total").value = `$ 0`;    
    carritoItems.innerHTML= "";
    carrito.length = 0;
    carritoJSON = 0;
    localStorage.removeItem("carrito");
    mostrarOcultarCarrito(false);
})






