console.log('se vinculo bien')

window.addEventListener('load', function () {
    let formulario = document.querySelector("#login-form"); // <form id="login-form" action="/users/login" method="POST">
    let campoEmail = document.querySelector("#email");//<input type="email" name="email" id="email" placeholder="Correo electrónico">
    let campoPassword = document.querySelector("#password");// <input type="password" name="password" id="password" placeholder="Contraseña"></input>
    let ulErrores = document.querySelector('ul');
    let errores = []

    campoEmail.addEventListener('change', () => {
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
    campoPassword.addEventListener('change', () => {
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

    if (errores.length > 0) {
        e.preventDefault();
        for (let i = 0; i <= errores.length; i++) {
            ulErrores.innerHTML += '<li>' + errores[i] + '</li>';
        };
    }



})


