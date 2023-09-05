// Carrito de compras
// Variables

// Inicialización de los arrays contenedores de productos y carrito
const listadoProductos = [];
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
const difusorAmb = new Producto(1, "Difusor ambiental", "Linea HOME", "linea-home/difusor-ambiental.webp", 2799);
const aceiteHidro = new Producto(2, "Aceite hidrosoluble", "Linea HOME", "linea-home/aceites-hidrosolubles.webp", 4499);
const perlasArom = new Producto(3, "Perlas aromáticas", "Linea HOME", "linea-home/aceites-hidrosolubles.webp", 2349);
const aceiteMasajes = new Producto(4, "Aceite para masajes", "Linea Spa", "linea-spa/aceite-para-masajes.webp", 1999);
const aguaBanio = new Producto(5, "Agua de baño", "Linea Spa", "linea-spa/agua-de-bano.webp", 1899);
const showerGel = new Producto(6, "Shower Gel", "Linea Spa", "linea-spa/shower-gel.webp", 1669);
const boxJabones = new Producto(7, "Box de degustación de Jaboncitos", "Jabones", "jabones/box-degustacion-jabones.webp", 2699);
const jabonPerfumado = new Producto(8, "Barra de jabon perfumado", "Jabones", "jabones/jabones-perfumados-frases.webp", 1399);
const jabonesInfantiles = new Producto(9, "Corazoncitos infantiles", "Jabones", "jabones/jaboncitos-infantiles.webp", 2099);
const jabonNatural = new Producto(10, "Jabon natural grande", "Jabones", "jabones/jabon-natural-grande.webp", 1999);
const balsamoLabial = new Producto(11, "Bálsamo labial", "Cosmetica Natural", "cosmetica-natural/balsamo-labial.webp", 1399);
const blanqueadorDental = new Producto(12, "Blanqueador dental", "Cosmetica Natural", "cosmetica-natural/blanqueador-dental.webp", 1799);
const shampooNeutro = new Producto(13, "Shampoo neutro", "Cosmetica Natural", "cosmetica-natural/shampoo-neutro.webp", 2699);
const esponjaVegetal = new Producto(14, "Esponja vegetal", "Esponjas", "esponjas/esponja-vegetal.webp", 3199);
const esponjaCapullo = new Producto(15, "Esponja capullo", "Esponjas", "esponjas/esponja-capullo.webp", 2799);
const almohadillaCervical = new Producto(16, "Almohadilla cervical", "Almohadillas y antifaces", "almohadilla-antifaz/almohadilla-cervical.webp", 3699);
const almohadillaOcular = new Producto(17, "Almohadilla térmica ocular", "Almohadillas y antifaces", "almohadilla-antifaz/almohadilla-termica-ocular.webp", 2899);
const almohadillaViaje = new Producto(18, "Almohadilla de viaje", "Almohadillas y antifaces", "almohadilla-antifaz/almohadilla-viaje.webp", 4299);
const tapaluzOcular = new Producto(19, "Tapaluz ocular", "Almohadillas y antifaces", "almohadilla-antifaz/tapaluz-ocular.webp", 2299);
const portaCepillos = new Producto(20, "Porta cepillos de madera", "Accesorios de madera", "accesorios-madera/porta-cepillos.webp", 2749);
const jaboneraMadera = new Producto(21, "Jabonera de madera virgen", "Accesorios de madera", "accesorios-madera/jabonera-madera-v.webp", 2649);
const bandejaTaco = new Producto(21, "Bandeja y taco de madera", "Accesorios de madera", "accesorios-madera/bandeja-taco-madera.webp", 2479);

const busqueda = document.querySelector("#buscarProducto");
const catalogo = document.querySelector("#catalogo");


function crearHtml(arr) {
    catalogo.innerHTML = "";
    let html;
    for (const el of arr) {
        html = `<div class="card-producto">
                    <div class="image-producto">
                        <img src="./media/products/${el.img}" class="" />
                    </div>
                    <span class="title2">${el.categoria}</span>
                    <span class="title">${el.nombre}</span>
                    <span class="price">$${el.precio}</span>
                </div>`;        
        catalogo.innerHTML+= html;
    }
}

// listadoProductos.push(JSON.stringify(difusorAmb), JSON.stringify(aceiteHidro), JSON.stringify(perlasArom), JSON.stringify(aceiteMasajes), JSON.stringify(aguaBanio), JSON.stringify(showerGel), JSON.stringify(boxJabones), JSON.stringify(jabonPerfumado), JSON.stringify(jabonesInfantiles), JSON.stringify(jabonNatural), JSON.stringify(balsamoLabial), JSON.stringify(blanqueadorDental), JSON.stringify(shampooNeutro), JSON.stringify(esponjaVegetal), JSON.stringify(esponjaCapullo), JSON.stringify(almohadillaCervical), JSON.stringify(almohadillaOcular), JSON.stringify(almohadillaViaje), JSON.stringify(tapaluzOcular), JSON.stringify(portaCepillos), JSON.stringify(jaboneraMadera), JSON.stringify(bandejaTaco));

//push al array

listadoProductos.push(difusorAmb, aceiteHidro, perlasArom, aceiteMasajes, aguaBanio, showerGel, boxJabones, jabonPerfumado, jabonesInfantiles, jabonNatural, balsamoLabial, blanqueadorDental, shampooNeutro, esponjaVegetal, esponjaCapullo, almohadillaCervical, almohadillaOcular, almohadillaViaje, tapaluzOcular, portaCepillos, jaboneraMadera, bandejaTaco);

crearHtml(listadoProductos);


console.log(listadoProductos);
