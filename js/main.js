// Carrito de compras
// Inicialización de los arrays contenedores de productos y carrito
const listadoProductos = [];
const lineaHome = [];
const lineaSpa = [];
const jabones = [];
const cosmeticaNatural = [];
const almohadillasYAntifaces = [];
const esponjas = [];
const carrito = [];
// clases
    // producto
class producto {
    constructor (id, nombre, categoria, img, precio) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.img = img;
        this.precio = precio;
    }
}
// declaracion de objetos
const difusorAmb = new producto(1, "Difusor ambiental", "Linea HOME", "linea-home/difusor-ambiental.webp", 2799);
const aceiteHidro = new producto(2, "Aceite hidrosoluble", "Linea HOME", "linea-home/aceites-hidrosolubles.webp", 4499);
const perlasArom = new producto(3, "Perlas aromáticas", "Linea HOME", "linea-home/aceites-hidrosolubles.webp", 2349);
const aceiteMasajes = new producto(4, "Aceite para masajes", "Linea Spa", "linea-spa/aceite-para-masajes.webp", 1999);
const aguaBanio = new producto(5, "Agua de baño", "Linea Spa", "linea-spa/agua-de-bano.webp", 1899);
const showerGel = new producto(6, "Shower Gel", "Linea Spa", "linea-spa/shower-gel.webp", 1669);
const boxJabones = new producto(7, "Box de degustación de Jaboncitos", "Jabones", "jabones/box-degustacion-jabones.webp", 2699);
const jabonPerfumado = new producto(8, "Barra de jabon perfumado", "Jabones", "jabones/jabones-perfumados-frases.webp", 1399);
const jabonesInfantiles = new producto(9, "Corazoncitos infantiles", "Jabones", "jabones/jaboncitos-infantiles.webp", 2099);
const jabonNatural = new producto(10, "Jabon natural grande", "Jabones", "jabones/jabon-natural-grande.webp", 1999);
const balsamoLabial = new producto(11, "Bálsamo labial", "Cosmetica Natural", "cosmetica-natural/balsamo-labial.webp", 1399);
const blanqueadorDental = new producto(12, "Blanqueador dental", "Cosmetica Natural", "cosmetica-natural/blanqueador-dental.webp", 1799);
const shampooNeutro = new producto(13, "Shampoo neutro", "Cosmetica Natural", "cosmetica-natural/shampoo-neutro.webp", 2699);
const esponjaVegetal = new producto(14, "Esponja vegetal", "Esponjas", "esponjas/esponja-vegetal.webp", 3199);
const esponjaCapullo = new producto(15, "Esponja capullo", "Esponjas", "esponjas/esponja-vegetal.webp", 2799);
const almohadillaCervical = new producto(16, "Almohadilla cervical", "Almohadillas y antifaces", "almohadilla-antifaz/almohadilla-cervical.webp", 3699);
const almohadillaOcular = new producto(17, "Almohadilla térmica ocular", "Almohadillas y antifaces", "almohadilla-antifaz/almohadilla-termica-ocular.webp", 2899);
const almohadillaViaje = new producto(18, "Almohadilla de viaje", "Almohadillas y antifaces", "almohadilla-antifaz/almohadilla-viaje.webp", 4299);
const tapaluzOcular = new producto(19, "Tapaluz ocular", "Almohadillas y antifaces", "almohadilla-antifaz/tapaluz-ocular.webp", 2299);
const portaCepillos = new producto(20, "Porta cepillos de madera", "Accesorios de madera", "accesorios-madera/porta-cepillos.webp", 2749);
const jaboneraMadera = new producto(21, "Jabonera de madera virgen", "Accesorios de madera", "accesorios-madera/jabonera-madera-v.webp", 2649);
const bandejaTaco = new producto(21, "Bandeja y taco de madera", "Accesorios de madera", "accesorios-madera/bandeja-taco-madera.webp", 2479);
//push al array en formato JSON
listadoProductos.push(JSON.stringify(difusorAmb), JSON.stringify(aceiteHidro), JSON.stringify(perlasArom), JSON.stringify(aceiteMasajes), JSON.stringify(aguaBanio), JSON.stringify(showerGel), JSON.stringify(boxJabones), JSON.stringify(jabonPerfumado), JSON.stringify(jabonesInfantiles), JSON.stringify(jabonNatural), JSON.stringify(balsamoLabial), JSON.stringify(blanqueadorDental), JSON.stringify(shampooNeutro), JSON.stringify(esponjaVegetal), JSON.stringify(esponjaCapullo), JSON.stringify(almohadillaCervical), JSON.stringify(almohadillaOcular), JSON.stringify(almohadillaViaje), JSON.stringify(tapaluzOcular), JSON.stringify(portaCepillos), JSON.stringify(jaboneraMadera), JSON.stringify(bandejaTaco));

console.log(listadoProductos);
