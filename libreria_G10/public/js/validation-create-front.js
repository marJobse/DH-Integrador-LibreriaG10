console.log('se vinculo bien')

window.addEventListener('load', function () {
    let formulario = document.querySelector("#product-create"); 

    let campoNombre = document.querySelector("#nombre");
    let campoResenia = document.querySelector("#resenia");
    let campoAnioEdicion = document.querySelector("#anioEdicion");
    let campoPrecio = document.querySelector("#precio");
    let campoFechaPublicacion = document.querySelector("#fechaPublicacion");
    let campoImagen = document.querySelector("#imagen");
    let campoStock = document.querySelector("#stock");
    let campoNroPaginas = document.querySelector("#nroPaginas");
    let campoEditorial = document.querySelector("#editorial");
    let campoAutor = document.querySelector("#autor");
    let campoClasificacion = document.querySelector("#clasificacion");
    let campoIdioma = document.querySelector("#idioma_id");
    let campoIsbn = document.querySelector("#isbn");



    let ulErrores = document.querySelector('ul');
    let errores = []


    campoNombre.addEventListener('blur', () => {
        if (campoNombre.value.trim() == '') {   // si esta vacio
            campoNombre.placeholder = 'Debes ingresar un nombre.';
            campoNombre.classList.remove('is-valid');
            campoNombre.classList.add('is-invalid');
            errores.push('El nombre esta vacio');
        } else {
            if (!campoNombre.value.trim().length < 5) {
                errores.push('El nombre debe tener al menos 5 caracteres.');
                campoNombre.classList.remove('is-valid');
                campoNombre.classList.add('is-invalid');
            }
            else {                              // si es válido
                campoNombre.classList.remove('is-invalid');
                campoNombre.classList.add('is-valid');
            }
        }

    });

    campoResenia.addEventListener('blur', () => {
        if (campoResenia.value.trim() == '') {   // si esta vacio
            campoResenia.placeholder = 'Debes ingresar una reseña.';
            campoResenia.classList.remove('is-valid');
            campoResenia.classList.add('is-invalid');
            errores.push('Debes ingresar una reseña.');
        } else if (!campoResenia.value.trim().length < 20) {
                errores.push('La reseña debe tener al menos 20 caracteres');
                campoResenia.classList.remove('is-valid');
                campoResenia.classList.add('is-invalid');
            }
            else {                              // si es válido
                campoResenia.classList.remove('is-invalid');
                campoResenia.classList.add('is-valid');
        }
    });

    campoAnioEdicion.addEventListener('blur', () => {
        if (campoAnioEdicion.value.trim() == '') {   // si esta vacio
            campoAnioEdicion.placeholder = 'Debes ingresar el año de edición';
            campoAnioEdicion.classList.remove('is-valid');
            campoAnioEdicion.classList.add('is-invalid');
            errores.push('Debes ingresar el año de edición');
        } else {                              // si es válido
                campoAnioEdicion.classList.remove('is-invalid');
                campoAnioEdicion.classList.add('is-valid');  
        }
    });
    campoPrecio.addEventListener('blur', () => {
        if (campoPrecio.value.trim() == '') {   // si esta vacio
            campoPrecio.placeholder = 'El precio esta vacio';
            campoPrecio.classList.remove('is-valid');
            campoPrecio.classList.add('is-invalid');
            errores.push('El precio esta vacio');
        } else {
            if (!campoPrecio.value.trim().length > 8) {
                errores.push('Se aceptan valores menores a $9999.99');
                campoPrecio.classList.remove('is-valid');
                campoPrecio.classList.add('is-invalid');
            }
            else {                              // si es válido
                campoPrecio.classList.remove('is-invalid');
                campoPrecio.classList.add('is-valid');
            }
        }

    });
    campoImagen.addEventListener('blur', () => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (!file) {
            errores.push('Tienes que subir una imagen');
            campoImagen.classList.remove('is-valid');
            campoImagen.classList.add('is-invalid');
        }
        else {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)) {
                errores.push('Las extensiones de archivo permitidas son ' + acceptedExtensions.join(','));
                campoImagen.classList.remove('is-valid');
                campoImagen.classList.add('is-invalid');

            }
            else {
                campoImagen.classList.remove('is-invalid');
                campoImagen.classList.add('is-valid');
            }
        }

    });

    campoFechaPublicacion.addEventListener('blur', () => {
        if (campoFechaPublicacion.value.trim() == '') {   // si esta vacio
            campoFechaPublicacion.placeholder = 'Debes ingresar una fecha de publicación';
            campoFechaPublicacion.classList.remove('is-valid');
            campoFechaPublicacion.classList.add('is-invalid');
            errores.push('Debes ingresar una fecha de publicación');
        } else {                              // si es válido
                campoFechaPublicacion.classList.remove('is-invalid');
                campoFechaPublicacion.classList.add('is-valid');
            }

    });
    campoStock.addEventListener('blur', () => {
        if (campoStock.value.trim() == '') {
            errores.push('Debes especificar el stock');
            campoStock.placeholder = 'Debes especificar el stock';
            campoStock.classList.add('error')
            campoStock.classList.remove('is-valid');
            campoStock.classList.add('is-invalid');
        } else if (!campoStock.value.trim().length > 8) {
            errores.push('El stock máximo es de 99999999');
            campoStock.classList.remove('is-valid');
            campoStock.classList.add('is-invalid');
        } else {
            campoStock.classList.remove('is-invalid');
            campoStock.classList.add('is-valid');
        };
    });
    campoNroPaginas.addEventListener('blur', () => {
        if (campoNroPaginas.value.trim() == '') {
            errores.push('Debes ingresar el número de páginas');
            campoNroPaginas.placeholder = 'Debes ingresar el número de páginas';
            campoNroPaginas.classList.add('error')
            campoNroPaginas.classList.remove('is-valid');
            campoNroPaginas.classList.add('is-invalid');
        } else {
            campoNroPaginas.classList.remove('is-invalid');
            campoNroPaginas.classList.add('is-valid');
        };
    });

        if (errores.length > 0) {
            e.preventDefault();
            for (let i = 0; i <= errores.length; i++) {
                ulErrores.innerHTML += '<li>' + errores[i] + '</li>';
            };
        }
    



})