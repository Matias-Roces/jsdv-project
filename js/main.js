// Carrito de compras

//Tareas que me falta realizar:
// dar funcionalidad a los botones del carrito sumar y restar 
// usar data.json con mis objetos

// Inicialización de los arrays contenedores de productos y carrito

const listadoProductos = [];
const categoria = ["Linea Home", "Linea Spa", "Jabones", "Cosmetica Natural", "Almohadillas y Antifaces", "Esponjas"];
const carrito = [];
// clases
    // producto
class Producto {
    constructor (id, nombre, categoria, img, precio) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.img = img;
        this.precio = precio;
    }
}
// declaracion de objetos
const difusorAmb = new Producto(1, "DIFUSOR AMBIENTAL", "Linea Home", "linea-home/difusor-ambiental.webp", 2799);
const aceiteHidro = new Producto(2, "ACEITE HIDROSOLUBLE", "Linea Home", "linea-home/aceites-hidrosolubles.webp", 4499);
const perlasArom = new Producto(3, "PERLAS AROMATICAS", "Linea Home", "linea-home/perlas-aromaticas.webp", 2349);
const aceiteMasajes = new Producto(4, "ACEITE PARA MASAJES", "Linea Spa", "linea-spa/aceite-para-masajes.webp", 1999);
const aguaBanio = new Producto(5, "AGUA DE BAÑO", "Linea Spa", "linea-spa/agua-de-bano.webp", 1899);
const showerGel = new Producto(6, "SHOWER GEL", "Linea Spa", "linea-spa/shower-gel.webp", 1669);
const boxJabones = new Producto(7, "BOX DE JABONCITOS", "Jabones", "jabones/box-degustacion-jabones.webp", 2699);
const jabonPerfumado = new Producto(8, "BARRA JABON PERFUMADO", "Jabones", "jabones/jabones-perfumados-frases.webp", 1399);
const jabonesInfantiles = new Producto(9, "CORAZONCITOS INFANTILES", "Jabones", "jabones/jaboncitos-infantiles.webp", 2099);
const jabonNatural = new Producto(10, "JABON NATURAL GRANDE", "Jabones", "jabones/jabon-natural-grande.webp", 1999);
const balsamoLabial = new Producto(11, "BALSAMO LABIAL", "Cosmetica Natural", "cosmetica-natural/balsamo-labial.webp", 1399);
const blanqueadorDental = new Producto(12, "BLANQUEADOR DENTAL", "Cosmetica Natural", "cosmetica-natural/blanqueador-dental.webp", 1799);
const shampooNeutro = new Producto(13, "SHAMPOO NEUTRO", "Cosmetica Natural", "cosmetica-natural/shampoo-neutro.webp", 2699);
const esponjaVegetal = new Producto(14, "ESPONJA VEGETAL", "Esponjas", "esponjas/esponja-vegetal.webp", 3199);
const esponjaCapullo = new Producto(15, "ESPONJA CAPULLO", "Esponjas", "esponjas/esponja-capullo.webp", 2799);
const almohadillaCervical = new Producto(16, "ALMOHADILLA CERVICAL", "Almohadillas y Antifaces", "almohadilla-antifaz/almohadilla-cervical.webp", 3699);
const almohadillaOcular = new Producto(17, "ALMOHADILLA TERMICA OCULAR", "Almohadillas y Antifaces", "almohadilla-antifaz/almohadilla-termica-ocular.webp", 2899);
const almohadillaViaje = new Producto(18, "ALMOHADILLA DE VIAJE", "Almohadillas y Antifaces", "almohadilla-antifaz/almohadilla-viaje.webp", 4299);
const tapaluzOcular = new Producto(19, "TAPALUZ OCULAR", "Almohadillas y Antifaces", "almohadilla-antifaz/tapaluz-ocular.webp", 2299);
const portaCepillos = new Producto(20, "PORTA CEPILLOS DE MADERA", "Accesorios de madera", "accesorios-madera/porta-cepillos.webp", 2749);
const jaboneraMadera = new Producto(21, "JABONERA DE MADERA VIRGEN", "Accesorios de madera", "accesorios-madera/jabonera-madera-v.webp", 2649);
const bandejaTaco = new Producto(22, "BANDEJA Y TACO DE MADERA", "Accesorios de madera", "accesorios-madera/bandeja-taco-madera.webp", 2479);
//declaracion de contenedores de html

const busqueda = document.querySelector("#buscarProducto");
const catalogo = document.querySelector("#catalogo");
const selectCategoria = document.querySelector("#selectCategoria");
const textBoxBuscar = document.querySelector("#textBoxBuscar");
const botonPagar = document.querySelector(".btn-pagar");
let total = 0;
let carritoJSON;
//funcion que muestra u oculta el carrito si no hay items
function mostrarOcultarCarrito(boolean){
    if (boolean) {
        document.querySelector(".carrito").classList.remove("d-none")
    }
    else {
        document.querySelector(".carrito").classList.add("d-none");
    }
}
// funcion que renderiza las cards
function crearCards(arr) {
    catalogo.innerHTML = "";
    let html;
    for (const el of arr) {
        html = `<div class="card-producto">
                    <div class="image-producto">
                        <img src="./media/products/${el.img}" class="" alt="${el.nombre}" />
                    </div>
                    <span class="title2">${el.categoria}</span>
                    <span class="title">${el.nombre}</span>
                    <span class="price">$${el.precio}</span>
                </div>`;        
        catalogo.innerHTML+= html;
    }
}
// funcion que filtra segun la KEY
function filtroKey(arr, condicion, obKey) {
    const filtro = arr.filter((el) => el[obKey].includes(condicion));
    return filtro;
}
// recarga el LocalStorage
function renderizarCarritoStorage() {    
    const productosJSON = JSON.parse(localStorage.getItem("carrito"));
    if (productosJSON) {        
        for(const el of productosJSON) {
            carrito.push(el);
            //console.log(carrito)            
        }
        agregarAlCarrito(carrito);
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
//funcion que captura el click en el tachito para eliminar un item del carrito, actualizando el precio y el carrito.
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
//funcion que pushea al carrito validando que, si ya se encuentra, no se cargue y salte un alert (SweetAlert para la proxima)
function validarPushCarrito(producto) {
    const repetidoEnElCarrito = carrito.find(e => e.nombre  === producto.nombre);    
    if (repetidoEnElCarrito != undefined) {
        Swal.fire("Ups",`${producto.nombre} ya se encuentra en el carrito`,"warning");        
    }
    else{
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
    carritoItems.innerHTML = "";
    for (const el of arr) {
        let html = `<div class="carrito-item">
                        <img src="./media/products/${el.img}" alt="${el.nombre}">
                        <div class="carrito-item-detalles">
                            <span class="carrito-item-titulo">${el.nombre}</span>
                            <div class="selector-cantidad">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash restar-cantidad" viewBox="0 0 16 16">
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                </svg>
                                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus sumar-cantidad" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </div>
                            <span class="carrito-item-precio">$${el.precio}</span>
                        </div>
                        <span class="btn-eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </span>
                    </div>`;
        carritoItems.innerHTML+= html;
    }
}
//push al array todos los productos
listadoProductos.push(difusorAmb, aceiteHidro, perlasArom, aceiteMasajes, aguaBanio, showerGel, boxJabones, jabonPerfumado, jabonesInfantiles, jabonNatural, balsamoLabial, blanqueadorDental, shampooNeutro, esponjaVegetal, esponjaCapullo, almohadillaCervical, almohadillaOcular, almohadillaViaje, tapaluzOcular, portaCepillos, jaboneraMadera, bandejaTaco);

// render de todos los productos al inicio de la pagina
crearCards(listadoProductos);
mostrarOcultarCarrito(false);

// declaraciones post renderizado de los productos
const carritoItems = document.querySelector('#cargarCarrito');
const itemsAlCarrito = document.querySelectorAll('.card-producto'); 
const cantidadProducto = document.querySelector(".carrito-item-cantidad");
let totalCompra = 0;
// funcion que recupera los datos del LS
renderizarCarritoStorage();
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
clickAlCarrito(itemsAlCarrito);

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

textBoxBuscar.addEventListener("change",()=> {
        textBoxBuscar.value == "" && crearCards(listadoProductos);
        clickAlCarrito(itemsAlCarrito);
    }
);

// simulacion de compra efectuada, el boton borrará los datos del carrito al finalizar la compra y en el localst
botonPagar.addEventListener("click", ()=>{    
    Swal.fire("Gracias por su compra!", "La vie est Belle", "success");
    total = 0;
    document.querySelector(".carrito-precio-total").value = `$ 0`;    
    carritoItems.innerHTML= "";
    carrito.length = 0;
    carritoJSON = 0;
    localStorage.removeItem("carrito");
    mostrarOcultarCarrito(false);
})






