//JS V1.0

alert("Bienvenido a La Vie Est Belle, a continuación, se detallan los códigos de los productos que desea añadir al carrito: \n1-Jabón perfumado......($700)\n2-Perfuminas.................($1200) \n3-Velas aromáticas......($1400) \n4-Sales de baño..............($850)\n5-Apresto para ropa....($1500)\n\n Por favor lea detenidamente los códigos de los productos y prepárese para realizar su pedido. Al final, se le devolverá el monto final de la compra.");

//declaración de funciones

function producto(num1, num2){
    let resultado = (parseFloat(num1))*(parseFloat(num2));
    return resultado;
}
function pedirCantidad(){
    let numero = false;
    while (!numero){
        cantidad = parseFloat(prompt("Ingrese la cantidad del producto que desea adquirir:"));
        numero = !isNaN(cantidad);
        if (numero){
            return cantidad;
            break;
        }
        else{
            alert("Ha habido un error al intentar leer la cantidad. Escriba la cantidad en numeros por favor");
        }
    }
}

//declaración de variables

const jabonPerfumado = 700, perfumina = 1200, velasAromaticas = 1400, salesBaño = 850, aprestoRopa = 1500;
let contador1 = 0, contador2 = 0, contador3 = 0, contador4 = 0, contador5 = 0;
let totalCarrito = 0;
let codigoProducto = 0;
let cantidad;

do{
    codigoProducto = parseFloat(prompt("Ingrese el código del producto que desea añadir al carrito. Si no desea realizar una compra o ya eligió todos los productos, ingrese el numero 0"));
    switch (codigoProducto){
        case 1:
            cantidad = pedirCantidad();
            totalCarrito+= producto(jabonPerfumado, cantidad);
            contador1+=cantidad;
            break;
        case 2:
            cantidad = pedirCantidad();
            totalCarrito+= producto(perfumina, cantidad);
            contador2+=cantidad;
            break;
        case 3:
            cantidad = pedirCantidad();
            totalCarrito+= producto(velasAromaticas, cantidad);
            contador3+=cantidad;
            break;
        case 4:
            cantidad = pedirCantidad();
            totalCarrito+= producto(salesBaño, cantidad);
            contador4+=cantidad;
            break;
        case 5:
            cantidad = pedirCantidad();
            totalCarrito+= producto(aprestoRopa, cantidad);
            contador5+=cantidad;
            break;
        case 0: 
            alert("Su factura final: \nJabones perfumados...."+contador1+"\nPerfuminas..............."+contador2+"\nVelas Aromaticas...."+contador3+"\nSales de Baño.........."+contador4+"\nApresto para ropa...."+contador5+"\n\nEl total de la compra ha sido $"+totalCarrito);
            break;
        default:
            alert("El código ingresado debe coincidir con algun producto, o si desea salir, recuerde ingresar 0");
    }

}while(codigoProducto!=0);
alert("Gracias por su compra en La Vie Est Belle");