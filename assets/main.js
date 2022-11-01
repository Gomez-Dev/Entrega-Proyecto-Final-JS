window.onload = () => {

    // variables
    
    const carrito = document.querySelector("#carrito");
    const contenedorCarrito = document.querySelector("#datos-carrito tbody");
    const vaciarCarritobtn = document.querySelector("#vaciar-carrito");
    const listaCarrito = document.querySelector("#lista-productos");
    let productosCarrito = [];
    
    
    // Agrga y elimina Productos del carrito
    registrarEventListeners();
    function registrarEventListeners() {
        listaCarrito.addEventListener("click", agregarProductos);
    
        carrito.addEventListener("click", eliminarProducto);
    
        document.addEventListener("DOMcontentLoaded", () => {
            productosCarrito = JSON.pasrse(localStorage.getItem("carrito")) || [];
        })
        carritoHTML();
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
    
            productosCarrito = productosCarrito.filter( producto => producto.id !== productoId);
            console.log(productosCarrito);
            carritoHTML ();
            
        }
    }
    // Obteniendo datos del Producto
    function datosProcunto(Producto) {
        // console.log(Producto);
    
        //objeto del producto seleccionado
        const infoProducto = {
            imagen: Producto.querySelector("img").src,
            titulo: Producto.querySelector("h5").textContent,
            precio: Producto.querySelector(".precio span").textContent,
            id: Producto.querySelector("a").getAttribute("data-id"),
            cantidad: 1
        }
    
        // console.log(infoProducto);
        // Agregar a productosCarrito
    
        productosCarrito = [...productosCarrito, infoProducto];
        console.log(productosCarrito);
        
        carritoHTML();
    }
    
    // Carrito en HTML
    
    function carritoHTML () {
    
        limpiarHTML();
    
        productosCarrito.forEach( productocarrito => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    ${productocarrito.titulo}
                    ${productocarrito.id}
                </td>
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
    
    }