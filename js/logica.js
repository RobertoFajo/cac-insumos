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
const templateCarrito = document.getElementById("template-carrito").content;
const templateFooter = document.getElementById("template-footer").content;
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const fragment = document.createDocumentFragment();
let carrito ={};
const productosEnCarrito = [];
let nCantidad=0;
let nPrecio=0;


for (let index = 0; index < productos.length; index++) {
    const producto = productos[index];
    cardContainer.innerHTML+=cardMaker(index, producto.nombre, producto.precio, producto.foto);
    const starConteiner = document.getElementById("starConteiner"+index);
    for (let i = 0; i < producto.rating; i++) {
        
        starConteiner.innerHTML += starMaker();
        
    }

    //producto.idx = new Producto(1, "monitor", 10, 5000);
    
}

// // Constructor function for Person objects
// function Producto(idx, item, cantidad, precio) {
//     this.idx = idx;
//     this.item = item;
//     this.cantidad = cantidad;
//     this.precio = precio;
//   }
  
//   // Create a Person object
//   //const pepe = new Producto(123, "monitor", 50, 300);
//   console.log(0)



items.addEventListener("click", e =>{
    btnAccion(e);
})

//Esta función la llama el btn

function addInTrolley(idx){
    const trolleyText = document.getElementById("trolleyText");
    let cantidad = trolleyText.innerHTML;
    cantidad++;
    trolleyText.innerHTML=cantidad ;
    //console.log(idx);
    //console.log(productos[0].id);
    //console.log(productos[1].id);
        let suma=0;
        const producto = {
            id: productos[idx].id,
            title: productos[idx].nombre,
            precio: productos[idx].precio,
            cantidad: 1,
            indx: idx
        }
        if(consultaStock(idx)){
            for (let i = 0; i < productosEnCarrito.length; i++) {
                if (productosEnCarrito[i].indx == idx) {
                    productosEnCarrito[i].cantidad += 1;
                    suma++
                }  
            }
            if(suma==0){{
                productosEnCarrito.push(producto)
            }   
        }
        console.log(productos[idx].stock); 
        //console.log(productosEnCarrito);
        pintarCarrito();
    }
}

function consultaStock(idx){
    if(productos[idx].stock > 0){
        productos[idx].stock--;
        return true; 
    }else{
        alert("Lo siento ya no tenemos "+productos[idx].nombre+" en stock")
        return false;
    }
}

const pintarCarrito = () => {
    //console.log(carrito);
    items.innerHTML = "";

    for (let i = 0; i < productosEnCarrito.length; i++) {
        templateCarrito.querySelector('th').textContent = productosEnCarrito[i].id;
        templateCarrito.querySelectorAll('td')[0].textContent = productosEnCarrito[i].title;
        templateCarrito.querySelectorAll('td')[1].textContent = productosEnCarrito[i].cantidad;
        templateCarrito.querySelector('span').textContent = productosEnCarrito[i].precio * productosEnCarrito[i].cantidad;
        
        templateCarrito.querySelector('.btn-info').dataset.id = productosEnCarrito[i].indx;
        templateCarrito.querySelector('.btn-danger').dataset.id = productosEnCarrito[i].indx;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
         
    }
    items.appendChild(fragment);
    pintarFooter();
}

const pintarFooter = () => {
    footer.innerHTML = " ";

    if(productosEnCarrito.length === 0){
        items.innerHTML = '<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>';
        return
    }

    nCantidad=0;
    nPrecio=0;
    for (let a = 0; a < productosEnCarrito.length; a++) {
        
            nCantidad += (productosEnCarrito[a].cantidad);
            nPrecio += (productosEnCarrito[a].cantidad * productosEnCarrito[a].precio);           
    }    
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector("span").textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    
    footer.appendChild(fragment);

    const btnVaciar = document.getElementById("vaciar-carrito");
    btnVaciar.addEventListener("click", () =>{
        for (let c = productosEnCarrito.length; c > 0; c--) {
            productosEnCarrito.pop();
            
        }
        trolleyText.innerHTML=0;
        pintarCarrito();
    })
}

const btnAccion = e =>{
    //console.log(e.target)
    if(e.target.classList.contains("btn-info")){
        if(consultaStock(e.target.dataset.id)){
            productosEnCarrito[e.target.dataset.id].cantidad++;
            cantidad = trolleyText.innerHTML;
            cantidad++;
            productos[e.target.dataset.id].stock++
            trolleyText.innerHTML=cantidad;
            console.log(roductos[e.target.dataset.id].stock);
        }
        
        
        pintarCarrito();
        
    }

    if(e.target.classList.contains("btn-danger")){
        productosEnCarrito[e.target.dataset.id].cantidad--;
        console.log(e.target.dataset.id)
        cantidad = trolleyText.innerHTML;
        cantidad--;
        trolleyText.innerHTML=cantidad;
        if(productosEnCarrito[e.target.dataset.id].cantidad === 0){
            productosEnCarrito.splice(e.target.dataset.id,1)
        }
        pintarCarrito();
        
    }

    e.stopPropagation();
}




function cardMaker(idx, nombre, precio, foto){
    return '\n                    <div class="col mb-5">\n                        <div class="card h-100">\n                            \x3C!-- Sale badge-->\n                            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Oferta</div>\n                            \x3C!-- Product image-->\n                            <img class="card-img-top" src="assets/productos/'+ foto +'" alt="...">\n                            \x3C!-- Product details-->\n                            <div class="card-body p-4">\n                                <div class="text-center">\n                                    \x3C!-- Product name-->\n                                    <h5 class="fw-bolder">'+ nombre +'</h5>\n                                    \x3C!-- Product reviews-->\n                                    <div id="starConteiner'+ idx +'" class="d-flex justify-content-center small text-warning mb-2">\n                                        </div>\n                                    \x3C!-- Product price-->\n                                    \n                                    $'+ precio +'\n                                </div>\n                            </div>\n                            \x3C!-- Product actions-->\n                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">\n                                <div class="text-center"><button type="button" onclick="addInTrolley('+ idx +' )" id="btnAdd'+ idx +'"  class="btn btn-outline-dark mt-auto" href="#" >Añadir al carrito  </button></div>\n                            </div>\n                        </div>\n                    </div>     \n                '
}

function starMaker(){
    return '<div class="bi-star-fill"></div>';
}

