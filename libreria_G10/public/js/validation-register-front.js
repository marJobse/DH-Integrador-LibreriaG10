console.log('se vinculo bien')

window.addEventListener('load', function () {
    let formulario = document.querySelector(".form-register");
    let campoNombre = document.querySelector(".form-input-nombre");
    let campoApellido = document.querySelector(".form-input-apellido");
    let campoDomicilio = document.querySelector(".form-input-domicilio");
    let campoTelefono = document.querySelector(".form-input-telefono");
    let campoEmail = document.querySelector(".form-input-email");
    let campoImagen = document.querySelector(".form-input-imagen");
    let campoPassword = document.querySelector(".form-input-password");
    let campoConfirmacionPassword = document.querySelector(".form-input-confirmar-password");

    campoNombre.focus();
    let errores = []

    formulario.addEventListener('change', () => {
        if (campoNombre.value.trim() == '') {
            errores.push('El nombre esta vacio');
            title.placeholder = 'El nombre esta vacio';
        } else if (campoNombre.value.length < 3) {
            errores.push('El título debe tener al menos tres caracteres');
        } else {
            title.classList.remove('is-invalid');
            title.classList.add('is-valid');
        };
    });



    if (errores.length > 0) {
        e.preventDefault();
        let ulErrores = document.querySelector("div.errores-front ul");
        for (let i = 0; i <= errores.length; i++) {
            ulErrores.innerHTML += "<li>" + errores[i] + "<li>"
        }
    }

})





//<div class="col-12 col-md-6">
//<label for="nombre">Nombre:</label>
//<input type="text" id="nombre" name="nombre"
//    value=" <%= locals.oldData ? oldData.nombre : null  %> " class="form-input-nombre">
//</div>