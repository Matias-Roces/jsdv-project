//JS V1.0

//declaración de funciones
function articulos(id, nombre, precio, stock){
    //atributos
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.contador = 0;
    this.totalProducto = 0;
    // metodos
    this.mostrarStock = function(){
        alert(`El stock disponible de ${this.nombre} es ${this.stock}, por favor ingrese una cantidad que no supere nuestro stock.`)
    }
    this.stockNow = function(cant){
        if ((!isNaN(cant)) && (cant > 0)){
            this.stock-= cant;
        }                 
    }
    this.calcularCompra = function(){
        this.totalProducto = this.contador * this.precio;
        return this.totalProducto;
    }
    // metodo de validación de cantidad positiva y que no supere stock
    this.cantidadCompra = function(){
        let numero = false;
        while (!numero){
            let cant = parseFloat(prompt("Ingrese la cantidad del producto que desea adquirir:"));
            numero = !isNaN(cant);
            if (numero && (cant > 0)){
                if (cant <= this.stock){
                    this.contador+=cant;                
                    return cant;
                }
                else{
                    this.mostrarStock();
                }                                    
            }
            else {
                alert("Ha habido un error al intentar leer la cantidad. Escriba la cantidad en numeros naturales, por favor");
            }
            
        }
    }
    
}

//declaración de variables
const arrayProductos = new Array();
const jabonPerfumado = new articulos(1, "Jabon Perfumado", 700, 10);
arrayProductos.push(jabonPerfumado);
const perfumina = new articulos(2, "Perfuminas", 1200, 20);
arrayProductos.push(perfumina);
const velasAromaticas = new articulos(3, "Velas Aromaticas", 1400, 8);
arrayProductos.push(velasAromaticas);
const salesBaño = new articulos(4, "Sales de Baño", 850, 5);
arrayProductos.push(salesBaño);
const aprestoRopa = new articulos(5, "Apresto para Ropa", 1500, 3);
arrayProductos.push(aprestoRopa);

//mensaje inicial
alert(`Bienvenido a La Vie Est Belle, a continuación, se detallan los códigos de los productos que desea añadir al carrito: \n1-${arrayProductos[0].nombre} (Stock: ${arrayProductos[0].stock})......($${arrayProductos[0].precio})\n2-${arrayProductos[1].nombre} (Stock: ${arrayProductos[1].stock}).................($${arrayProductos[1].precio}) \n3-${arrayProductos[2].nombre} ((Stock: ${arrayProductos[2].stock}))......($${arrayProductos[2].precio}) \n4-${arrayProductos[3].nombre} (Stock: ${arrayProductos[3].stock})..............($${arrayProductos[3].precio})\n5-${arrayProductos[4].nombre} (Stock: ${arrayProductos[4].stock})....($${arrayProductos[4].precio})\n\n Por favor lea detenidamente los códigos de los productos y prepárese para realizar su pedido. Al final, se le devolverá el monto final de la compra. Si no desea comprar, o si ya finalizó su compra, ingrese el codigo 0.`);

let codigoProducto = 0;
let cantidad;

do{
    codigoProducto = parseFloat(prompt("Ingrese el código del producto que desea añadir al carrito. Si no desea realizar una compra o ya eligió todos los productos, ingrese el numero 0"));
    switch (codigoProducto){
        case 1:
            cantidad = arrayProductos[0].cantidadCompra();
            arrayProductos[0].stockNow(cantidad);            
            break;
        case 2:
            cantidad = arrayProductos[1].cantidadCompra();
            arrayProductos[1].stockNow(cantidad);            
            break;
        case 3:
            cantidad = arrayProductos[2].cantidadCompra();
            arrayProductos[2].stockNow(cantidad);         
            break;
        case 4:
            cantidad = arrayProductos[3].cantidadCompra();
            arrayProductos[3].stockNow(cantidad);           
            break;
        case 5:
            cantidad = arrayProductos[4].cantidadCompra();
            arrayProductos[4].stockNow(cantidad);            
            break;
        case 0:            
            break;
        default:
            alert("El código ingresado debe coincidir con algun producto, o si desea salir, recuerde ingresar 0");
    }
}while(codigoProducto!=0);

arrayProductos.forEach(producto => producto.calcularCompra());
const totalCarrito = arrayProductos.reduce((acc, producto) => acc + producto.totalProducto, 0);

alert(`Su factura final: \nJabones perfumados....${arrayProductos[0].calcularCompra()}"\nPerfuminas..............."${arrayProductos[1].calcularCompra()}"\nVelas Aromaticas....${arrayProductos[2].calcularCompra()}\nSales de Baño.........."${arrayProductos[3].calcularCompra()}"\nApresto para ropa...."${arrayProductos[4].calcularCompra()}"\n\nEl total de la compra ha sido $${totalCarrito}`);

if (totalCarrito != 0){
    alert("Gracias por su compra en La Vie Est Belle, vuelva prontos");
}
else {
    alert("Recargue la página y compre algo, no sea rata.");
}