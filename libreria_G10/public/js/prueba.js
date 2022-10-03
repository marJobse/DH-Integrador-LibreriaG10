console.log('se vinculo bien')

window.addEventListener('load', function () {
    let formulario = document.querySelector("#register-form"); //  <form class="form-register" id="register-form" action="/users/" method="POST"
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
    console.log('entro aca')

    campoNombre.addEventListener('change', () => {
        if (campoNombre.value.trim() == '') {   // si esta vacio
            campoNombre.placeholder = 'Debes completar el nombre';
            campoNombre.classList.remove('is-valid');
            campoNombre.classList.add('is-invalid');
            errores.push('Debes completar el nombre');
        } else {
            if (!campoNombre.value.trim() < 3) {  // si no tiene caracteres necesarios 3
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
    campoApellido.addEventListener('change', () => {
        if (campoApellido.value.trim() == '') {   // si esta vacio
            campoApellido.placeholder = 'Debes completar el apellido';
            campoApellido.classList.remove('is-valid');
            campoApellido.classList.add('is-invalid');
            errores.push('Debes completar el apellido');
        } else {
            if (!campoApellido.value.trim() < 3) {  // si no tiene caracteres necesarios 3
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
    campoDomicilio.addEventListener('change', () => {
        if (campoDomicilio.value.trim() == '') {   // si esta vacio
            campoDomicilio.placeholder = 'Debes completar el domicilio';
            campoDomicilio.classList.remove('is-valid');
            campoDomicilio.classList.add('is-invalid');
            errores.push('Debes completar el domicilio');
        } else {
            if (!campoDomicilio.value.trim() < 8) {  // si no tiene caracteres necesarios 3
                errores.push('El domicilio debe ser mas largo');
                campoDomicilio.classList.remove('is-valid');
                campoDomicilio.classList.add('is-invalid');
            }
            else {                              // si es válido
                campoDomicilio.classList.remove('is-invalid');
                campoDomicilio.classList.add('is-valid');
            }
        }

    });
    campoTelefono.addEventListener('change', () => {
        if (campoTelefono.value.trim() == '') {   // si esta vacio
            campoTelefono.placeholder = 'Debes completar el telefono';
            campoTelefono.classList.remove('is-valid');
            campoTelefono.classList.add('is-invalid');
            errores.push('Debes completar el telefono');
        } else {
            if (!campoTelefono.value.trim() < 8) {  // si no tiene caracteres necesarios 3
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

    campoEmail.addEventListener('change', () => {
        if (campoEmail.value.trim() == '') {   // si esta vacio
            campoEmail.placeholder = 'Debes completar el email';
            campoEmail.classList.remove('is-valid');
            campoEmail.classList.add('is-invalid');
            errores.push('Debes completar el email ');
        } else {
            if (!campoEmail.value.trim().includes('@')) {  // si no incluye @
                errores.push('Debes completar un formato de correo válido ');
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
    campoPassword.addEventListener('change', () => {
        if (campoPassword.value.trim() == '') {
            errores.push('Debes completar la contraseña ');
            campoPassword.placeholder = 'Debes completar la contraseña ';
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
    campoConfirmacionPassword.addEventListener('change', () => {
        if (campoConfirmacionPassword.value.trim() == '') {
            errores.push('Debes completar la confirmación de la contraseña ');
            campoConfirmacionPassword.placeholder = 'Debes completar la confirmación de la contraseña ';
            campoConfirmacionPassword.classList.add('error')
            campoConfirmacionPassword.classList.remove('is-valid');
            campoConfirmacionPassword.classList.add('is-invalid');
        } else if (!campoConfirmacionPassword.value.trim().length < 8) {
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


