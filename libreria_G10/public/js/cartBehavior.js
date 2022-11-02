window.addEventListener('load', function () {
    // Defaulteo los montos
    let montoParcial = document.querySelector('.total-monto.monto-parcial')
    let montoDescontado = document.querySelector('.monto-descontado')
    let montoFinal = document.querySelector('.monto-final')
    let cuponBoton = document.querySelector("#cupon-aplicar")
    let cuponInput = document.querySelector("#cupon")
    let botonComprar = document.querySelector("#comprar")
    let userID = document.querySelector("#user-id")


    let subtotalMonto = 0;
    let descuentoValidado = 0;
    let descuentosMonto = 0;


    // veo si hay cosas en el carrito (local storage)
    // Si hay, traigo fila por fila cada libro y enciendo escuchas de los botones para editar la cantidad y para eliminar del carrito
    let carritoLibros = JSON.parse(localStorage.getItem("g10libros"));
    const tablaCarrito = document.querySelector('.tabla-carrito')
    if (carritoLibros && carritoLibros.length > 0) {
        for (let j = 0; j < carritoLibros.length; j++) {
            fetch('http://localhost:3030/api/books/' + carritoLibros[j].id)
                .then((response) => response.json())
                .then((libro) => {
                    const libroEnCarrito = libro.data
                    tablaCarrito.innerHTML += `
                <div class="tabla fila">
                <div class="producto foto"><img
                src="/images/products/${libroEnCarrito.imagen}"></div>
                <div class="producto titulo">${libroEnCarrito.nombre}</div>
                <div class="producto precio">${libroEnCarrito.precio}</div>
                <div class="producto cantidad">
                <div class="carrito-remove" id="${libroEnCarrito.id}">-</div>
                <div class="carrito-cantidad">${carritoLibros[j].qty}</div>
                <div class="carrito-add" id="${libroEnCarrito.id}">+</div>
                </div>
                <div class="producto subtotal">${Number(libroEnCarrito.precio) * carritoLibros[j].qty}</div>
                <div class="producto borrar"><button class="product delete"><i
                class="fa-solid fa-trash-can" id="${libroEnCarrito.id}"></i></button>
                </div>
                </div>`
                    subtotalMonto = subtotalMonto + (Number(libroEnCarrito.precio) * carritoLibros[j].qty)
                    montoParcial.innerHTML = `${subtotalMonto}`
                    // montoDescontado.innerHTML = `${descuentosMonto}`
                    let total = subtotalMonto - descuentosMonto

                    montoFinal.innerHTML = `${total}`

                    // console.log(subtotalMonto)
                    // Comportamiento del carrito
                    let allRows = document.querySelectorAll('.fila')
                    let cantidad = document.querySelectorAll('.carrito-cantidad')
                    let agregar = document.querySelectorAll('.carrito-add')
                    let restar = document.querySelectorAll('.carrito-remove')
                    let subtotal = document.querySelectorAll('.producto.subtotal')
                    let precio = document.querySelectorAll('.producto.precio')
                    let eliminar = document.querySelectorAll('.delete')


                    for (let i = 0; i < allRows.length; i++) {
                        agregar[i].addEventListener('click', (e) => {
                            let cantidadActual = Number(cantidad[i].innerHTML) + 1
                            cantidad[i].innerHTML = cantidadActual
                            subtotal[i].innerHTML = Number(precio[i].innerHTML) * cantidadActual
                            libroCantidad = carritoLibros.find((libro) => libro.id == e.target.id)
                            libroCantidad.qty = cantidadActual
                            localStorage.setItem("g10libros", JSON.stringify(carritoLibros))
                            location.reload();
                        })

                        restar[i].addEventListener('click', (e) => {
                            let cantidadActual = Number(cantidad[i].innerHTML) - 1
                            if (cantidadActual > 0) {
                                cantidad[i].innerHTML = cantidadActual
                                subtotal[i].innerHTML = Number(precio[i].innerHTML) * cantidadActual
                                libroCantidad = carritoLibros.find((libro) => libro.id == e.target.id)
                                libroCantidad.qty = cantidadActual
                                localStorage.setItem("g10libros", JSON.stringify(carritoLibros))
                                location.reload();
                            }
                        })
                        eliminar[i].addEventListener('click', (e) => {
                            e.preventDefault()
                            console.log(e.target.id)
                            carritoLibros = carritoLibros.filter((libro) => libro.id != e.target.id);
                            console.log(carritoLibros)
                            localStorage.setItem("g10libros", JSON.stringify(carritoLibros));
                            location.reload();
                        })
                    }
                })
                .catch(() => {
                    tablaCarrito.innerHTML += '<p> No hay productos en el carrito </p>'
                })
        }
    }
    // si no hay productos, muestro el mensaje
    else {
        tablaCarrito.innerHTML += '<p> No hay productos en el carrito </p>'
    }
    // comienza la suma del total, chequeo por descuentos, si existe, lo precarga en el input
    if (localStorage.getItem("g10libros-descuento")) {
        descuentoExistente = JSON.parse(localStorage.getItem("g10libros-descuento"))
        cuponInput.value = descuentoExistente.codigo
    }

    // boton aplicar, busca el descuento en la base de datos y hace las cuentas
    cuponBoton.addEventListener('click', (e) => {
        e.preventDefault()
        let codigoDescuento = cuponInput.value

        fetch('http://localhost:3030/api/discounts/' + codigoDescuento)
            .then((response) => response.json())
            .then(resultado => {
                if (resultado) {
                    descuentoValidado = Number(resultado.data.descuento)
                }
                descuentosMonto = subtotalMonto * descuentoValidado / 100
                montoDescontado.innerHTML = descuentosMonto
                montoFinal.innerHTML = `${subtotalMonto - descuentosMonto}`
                localStorage.setItem("g10libros-descuento", JSON.stringify({ codigo: resultado.data.codigo, descuento: resultado.data.descuento }))
            })
    })
    botonComprar.addEventListener('click',(e)=>{
        e.preventDefault
        let usuario;
        let direccion;
        let totalCompra = subtotalMonto - descuentosMonto

        if(userID != null){
            usuario = Number(userID.textContent)
            direccion = prompt('Ingresá la dirección de envío')
        } else { 
        this.alert('Debes iniciar sesión para comprar')}
        console.log(usuario)
        console.log(direccion)

        console.log(subtotalMonto)
        console.log(descuentosMonto)

        let dataPost = {
            direccion: direccion,
            total: totalCompra,
            usuario_id: usuario,
        }
        fetch('http://localhost:3030/api/books/compra', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(dataPost), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
              console.log('Success:', response)
              alert(`Tu compra ${response.data.id} fue exitosa. Total: ${response.data.total}. El pedido fue enviado a: ${response.data.direccion}`)
              localStorage.clear();
              window.location.href = "http://localhost:3030/";
            });

    })
})