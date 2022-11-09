    window.onload = () => {}

    // variables
    
    const carrito = document.querySelector("#carrito");
    const contenedorCarrito = document.querySelector("#datos-carrito tbody");
    const vaciarCarritobtn = document.querySelector("#vaciar-carrito");
    const listaCarrito = document.querySelector("#lista-productos");
    let productosCarrito = [];
    
    
    // Agrega y elimina Productos del carrito
    
    registrarEventListeners();
    function registrarEventListeners() {
        listaCarrito.addEventListener("click", agregarProductos);
    
        carrito.addEventListener("click", eliminarProducto);

        vaciarCarritobtn.addEventListener("click", () => {
            productosCarrito = []; 
            limpiarHTML();
        })
    
        document.addEventListener("DOMContentLoaded", () => {
            productosCarrito = JSON.parse( localStorage.getItem ("carrito")) || [];
            carritoHTML()
        });
        
        
    }
    
    // Funciones
    
    function agregarProductos(e) {
        e.preventDefault();
        if(e.target.classList.contains("agregar-carrito")) {
            const procuntoSeleccionado = e.target.parentElement.parentElement;
            datosProcunto(procuntoSeleccionado)
        }
    }
    // Esta funcion elimina un producto
    function eliminarProducto(e) {
        if(e.target.classList.contains("borrar-producto")) {
            const productoId =e.target.getAttribute("data-id");
            
            //Elimina del carrito por id
            productosCarrito = productosCarrito.filter( producto => producto.id !== productoId);
            console.log(productosCarrito);
            carritoHTML ();
            
        }
    }
    // Obteniendo datos del Producto
    function datosProcunto(producto) {
        // console.log(Producto);
    
        //objeto del producto seleccionado
        const infoProducto = {
            imagen: producto.querySelector("img").src,
            titulo: producto.querySelector("h5").textContent,
            precio: producto.querySelector(".precio span").textContent,
            id: producto.querySelector("a").getAttribute("data-id"),
            cantidad: 1
        }
    
        // Revisa producto duplicado en carrito

        const duplicado = productosCarrito.some( producto => producto.id === infoProducto.id);
        console.log(duplicado);
        if(duplicado) {
            // Actualiza cantidad
            const Producto = productosCarrito.map( producto => {
                if(producto.id === infoProducto.id) {
                    producto.cantidad++;
                    return producto;
                } else {
                    return producto;
                }
            } );
            productosCarrito = [...Producto];
        } else {
        //Agregar a productosCarrito
            productosCarrito = [...productosCarrito, infoProducto];
        }

        console.log(productosCarrito);
        
        carritoHTML();
    }
    
    // Muestra Carrito en HTML
    
    function carritoHTML () {
    
        limpiarHTML();
    
        productosCarrito.forEach( productocarrito => {
            const {imagen, titulo, id, precio, cantidad} = productocarrito;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>  
                    <img src="${imagen}" width=100>
                </td>
                <td>${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto" data-id="${productocarrito.id}"> X </a>
                </td>
            `;
            contenedorCarrito.appendChild(row);
        });
    
        //Storage
        aplicarStorage()
        
    }
    
    function aplicarStorage() {
        localStorage.setItem("carrito", JSON.stringify(productosCarrito));
    }
    
    // Elimina productos mal cargados
    function limpiarHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
    }
  