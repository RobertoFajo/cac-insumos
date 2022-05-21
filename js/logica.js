/*
    En este momento tenemos algunos productos fake en la web, a modo de muestra, mostrados en componentes llamados "cartas" (cards).

    Objetivos:

    1) Generar en el sitio las cartas necesarias (ni más ni menos) de forma dinámica para mostrar todos los productos del array 'productos' que se definió en el archivo 'data.js'. Como mínimo hay que lograr mostrar el nombre, el precio, el rating (expresado en estrellas) y su foto.
    2) Cada vez que se presione algún botón "Añadir al carrito", se debe reflejar la cantidad de productos añadidos en el botón que figura en el header (arriba a la derecha). En paralelo también se debe mostrar por consola el array 'productosEnCarrito' con los ids de los productos añadidos (se pueden llegar repetir si se hizo varios clicks en el mismo botón).

    Tanto este script como el de la data ya están cargados en el HTML.
*/
//const productosEnCarrito = [];

// Con esto se ven los productos por consola, en forma de tabla (a modo de guía)
//console.table(productos);

// Con esto se ven los productos en el carrito por consola (actualmente vacío)
//console.table(productosEnCarrito);

const cardContainer = document.getElementById("cardConteiner");

for (let index = 0; index < productos.length; index++) {
    const producto = productos[index];
    cardContainer.innerHTML+=cardMaker(index, producto.nombre, producto.precio, producto.foto);
    const starConteiner = document.getElementById("starConteiner"+index);
    for (let i = 0; i < producto.rating; i++) {
        
        starConteiner.innerHTML += starMaker();
        
    }
    
}






function addInTrolley(){
    const trolleyText = document.getElementById("trolleyText");
    let cantidad = trolleyText.innerHTML;
    cantidad++;
    trolleyText.innerHTML=cantidad ;
    
}

function cardMaker(idx, nombre, precio, foto){
    return '\n                    <div class="col mb-5">\n                        <div class="card h-100">\n                            \x3C!-- Sale badge-->\n                            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Oferta</div>\n                            \x3C!-- Product image-->\n                            <img class="card-img-top" src="assets/productos/'+ foto +'" alt="...">\n                            \x3C!-- Product details-->\n                            <div class="card-body p-4">\n                                <div class="text-center">\n                                    \x3C!-- Product name-->\n                                    <h5 class="fw-bolder">'+ nombre +'</h5>\n                                    \x3C!-- Product reviews-->\n                                    <div id="starConteiner'+ idx +'" class="d-flex justify-content-center small text-warning mb-2">\n                                        </div>\n                                    \x3C!-- Product price-->\n                                    \n                                    $'+ precio +'\n                                </div>\n                            </div>\n                            \x3C!-- Product actions-->\n                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">\n                                <div class="text-center"><button type="button" onclick="addInTrolley()" id="btnAdd'+ idx +'"  class="btn btn-outline-dark mt-auto" href="#" >Añadir al carrito  </button></div>\n                            </div>\n                        </div>\n                    </div>     \n                '
}

function starMaker(){
    return '<div class="bi-star-fill"></div>';
}

btnAdd.onclick = addTrolley;