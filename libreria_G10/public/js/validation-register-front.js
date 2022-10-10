console.log('se vinculo bien')

window.addEventListener('load', function () {
    let formulario = document.querySelector("#login-form"); // <form id="login-form" action="/users/login" method="POST">

    let campoNombre = document.querySelector("#nombre");
    let campoApellido = document.querySelector("#apellido");
    let campoDomicilio = document.querySelector("#domicilio");
    let campoTelefono = document.querySelector("#telefono");
    let campoEmail = document.querySelector("#email");
    let campoImagen = document.querySelector("#imagen");
    let campoPassword = document.querySelector("#password");
    let campoConfirmacionPassword = document.querySelector("#password2");


    let ulErrores = document.querySelector('ul');
    let errores = []


    campoNombre.addEventListener('blur', () => {
        if (campoNombre.value.trim() == '') {   // si esta vacio
            campoNombre.placeholder = 'El nombre esta vacio';
            campoNombre.classList.remove('is-valid');
            campoNombre.classList.add('is-invalid');
            errores.push('El nombre esta vacio');
        } else {
            if (!campoNombre.value.trim().length < 3) {
                errores.push('El nombre debe ser mas largo');
                campoNombre.classList.remove('is-valid');
                campoNombre.classList.add('is-invalid');
            }
            else {                              // si es válido
                campoNombre.classList.remove('is-invalid');
                campoNombre.classList.add('is-valid');
            }
        }

    });

    campoApellido.addEventListener('blur', () => {
        if (campoApellido.value.trim() == '') {   // si esta vacio
            campoApellido.placeholder = 'El apellido esta vacio';
            campoApellido.classList.remove('is-valid');
            campoApellido.classList.add('is-invalid');
            errores.push('El apellido esta vacio');
        } else {
            if (!campoApellido.value.trim().length < 3) {
                errores.push('El apellido debe ser mas largo');
                campoApellido.classList.remove('is-valid');
                campoApellido.classList.add('is-invalid');
            }
            else {                              // si es válido
                campoApellido.classList.remove('is-invalid');
                campoApellido.classList.add('is-valid');
            }
        }

    });


    campoDomicilio.addEventListener('blur', () => {
        if (campoDomicilio.value.trim() == '') {   // si esta vacio
            campoDomicilio.placeholder = 'El domiciio esta vacio';
            campoDomicilio.classList.remove('is-valid');
            campoDomicilio.classList.add('is-invalid');
            errores.push('El domiciio esta vacio');
        } else {
            if (!campoDomicilio.value.trim().length < 8) {
                errores.push('El domiciio debe ser mas largo');
                campoDomicilio.classList.remove('is-valid');
                campoDomicilio.classList.add('is-invalid');
            }
            else {                              // si es válido
                campoDomicilio.classList.remove('is-invalid');
                campoDomicilio.classList.add('is-valid');
            }
        }

    });
    campoTelefono.addEventListener('blur', () => {
        if (campoTelefono.value.trim() == '') {   // si esta vacio
            campoTelefono.placeholder = 'El telefono esta vacio';
            campoTelefono.classList.remove('is-valid');
            campoTelefono.classList.add('is-invalid');
            errores.push('El domiciio esta vacio');
        } else {
            if (!campoTelefono.value.trim().length < 8) {
                errores.push('El telefono debe ser mas largo');
                campoTelefono.classList.remove('is-valid');
                campoTelefono.classList.add('is-invalid');
            }
            else {                              // si es válido
                campoTelefono.classList.remove('is-invalid');
                campoTelefono.classList.add('is-valid');
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

    campoEmail.addEventListener('blur', () => {
        if (campoEmail.value.trim() == '') {   // si esta vacio
            campoEmail.placeholder = 'El email esta vacio';
            campoEmail.classList.remove('is-valid');
            campoEmail.classList.add('is-invalid');
            errores.push('El email esta vacio');
        } else {
            if (!campoEmail.value.trim().includes('@')) {  // si no incluye @
                errores.push('Email inválido');
                alert('Email inválido')
                campoEmail.classList.remove('is-valid');
                campoEmail.classList.add('is-invalid');
            }
            else {                              // si es válido
                campoEmail.classList.remove('is-invalid');
                campoEmail.classList.add('is-valid');
            }
        }

    });
    campoPassword.addEventListener('blur', () => {
        if (campoPassword.value.trim() == '') {
            errores.push('La contraseña esta vacio');
            campoPassword.placeholder = 'La contraseña esta vacia';
            campoPassword.classList.add('error')
            campoPassword.classList.remove('is-valid');
            campoPassword.classList.add('is-invalid');
        } else if (!campoPassword.value.trim().length < 8) {
            errores.push('Contraseña de 8 caracteres como mínimo');
            campoPassword.classList.remove('is-valid');
            campoPassword.classList.add('is-invalid');
        } else {
            campoPassword.classList.remove('is-invalid');
            campoPassword.classList.add('is-valid');
        };
    });
    campoConfirmacionPassword.addEventListener('blur', () => {
        if (campoConfirmacionPassword.value.trim() == '') {
            errores.push('La contraseña esta vacio');
            campoConfirmacionPassword.placeholder = 'La contraseña esta vacia';
            campoConfirmacionPassword.classList.add('error')
            campoConfirmacionPassword.classList.remove('is-valid');
            campoConfirmacionPassword.classList.add('is-invalid');
        } else if (!campoPcampoConfirmacionPasswordassword.value.trim().length < 8) {
            errores.push('Contraseña de 8 caracteres como mínimo');
            campoConfirmacionPassword.classList.remove('is-valid');
            campoConfirmacionPassword.classList.add('is-invalid');
        } else {
            campoConfirmacionPassword.classList.remove('is-invalid');
            campoConfirmacionPassword.classList.add('is-valid');
        };
    });

    if (errores.length > 0) {
        e.preventDefault();
        for (let i = 0; i <= errores.length; i++) {
            ulErrores.innerHTML += '<li>' + errores[i] + '</li>';
        };
    }



})

//<div class="col-12 col-md-6">
//<label for="nombre">Nombre:</label>
//<input type="text" id="nombre" name="nombre"
//    value=" <%= locals.oldData ? oldData.nombre : null  %> " class="form-input-nombre">
//</div>