/*
    En este momento tenemos algunos productos fake en la web, a modo de muestra, mostrados en componentes llamados "cartas" (cards).

    Objetivos:

    1) Generar en el sitio las cartas necesarias (ni más ni menos) de forma dinámica para mostrar todos los productos del array 'productos' que se definió en el archivo 'data.js'. Como mínimo hay que lograr mostrar el nombre, el precio, el rating (expresado en estrellas) y su foto.
    2) Cada vez que se presione algún botón "Añadir al carrito", se debe reflejar la cantidad de productos añadidos en el botón que figura en el header (arriba a la derecha). En paralelo también se debe mostrar por consola el array 'productosEnCarrito' con los ids de los productos añadidos (se pueden llegar repetir si se hizo varios clicks en el mismo botón).

    Tanto este script como el de la data ya están cargados en el HTML.
*/
const productosEnCarrito = [];

// Con esto se ven los productos por consola, en forma de tabla (a modo de guía)
console.table(productos);

// Con esto se ven los productos en el carrito por consola (actualmente vacío)
console.table(productosEnCarrito);