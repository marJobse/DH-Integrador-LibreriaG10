window.addEventListener('load', function () {

    // veo si hay cosas en el carrito (local storage)
    const carritoLibros = JSON.parse(localStorage.getItem("g10libros"));
    const tablaCarrito = document.querySelector('.tabla-carrito')
    console.log(carritoLibros)
    if(carritoLibros){
        for(let j=0; j < carritoLibros.length; j++) {
        fetch('http://localhost:3030/api/books/' + carritoLibros[j].id)
        .then((response) => response.json())
        .then((libro)=>{
            console.log(libro.data)
            const libroEnCarrito = libro.data
            tablaCarrito.innerHTML += `
                <div class="tabla fila">
                    <div class="producto foto"><img
                            src="/images/products/${libroEnCarrito.imagen}"></div>
                    <div class="producto titulo">${libroEnCarrito.nombre}</div>
                    <div class="producto precio">${libroEnCarrito.precio}</div>
                    <div class="producto cantidad">
                        <div class="carrito-remove">-</div>
                        <div class="carrito-cantidad">${carritoLibros[j].qty}</div>
                        <div class="carrito-add">+</div>
                    </div>
                    <div class="producto subtotal">${Number(libroEnCarrito.precio) * carritoLibros[j].qty}</div>
                    <div class="producto borrar"><button id="delete"><i
                                class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>`
                // Comportamiento del carrito
                let allRows = document.querySelectorAll('.fila')
                let cantidad = document.querySelectorAll('.carrito-cantidad')
                let agregar = document.querySelectorAll('.carrito-add')
                let restar = document.querySelectorAll('.carrito-remove')
                let subtotal = document.querySelectorAll('.producto.subtotal')
                let precio = document.querySelectorAll('.producto.precio')

                
                for(let i=0; i < allRows.length; i++) {
                    agregar[i].addEventListener('click',()=>{
                        let cantidadActual = Number(cantidad[i].innerHTML) + 1
                        cantidad[i].innerHTML = cantidadActual
                        subtotal[i].innerHTML = Number(precio[i].innerHTML) * cantidadActual
                        // carritoLibros[j].qty = cantidadActual
                        // console.log(carritoLibros)
                        // localStorage.setItem("g10libros", JSON.stringify(carritoLibros))
                    })
                    
                    restar[i].addEventListener('click',()=>{
                        let cantidadActual = Number(cantidad[i].innerHTML) - 1
                        if(cantidadActual > 0){
                        cantidad[i].innerHTML = cantidadActual
                        subtotal[i].innerHTML = Number(precio[i].innerHTML) * cantidadActual
                        // carritoLibros[j].qty = cantidadActual
                        // localStorage.setItem("g10libros", JSON.stringify(carritoLibros))
                    }
                    })
                }
        })
        .catch(()=>{
            tablaCarrito.innerHTML += '<p> No hay productos en el carrito </p>'
        })
        }
    } else {
        tablaCarrito.innerHTML += '<p> No hay productos en el carrito </p>'
    }





})