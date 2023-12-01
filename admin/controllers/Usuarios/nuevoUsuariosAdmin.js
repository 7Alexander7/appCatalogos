modificarTitulo('Usuarios / Nuevo Usuario')


function guardarUsuario(e) {
    e.preventDefault();
    const usuario = {
        cedula: document.getElementById('cedula').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        clave: 'catalogos123',
        rol: 'ADMINISTRADOR'
    }
    if (usuario.cedula != "" && usuario.cedula != null) {
        fetch(ipServidor + 'api/usuarios/nuevoUsuario', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(usuario)
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                if (json.success == true) {
                    notificaciones("NUEVO USUARIO", "se han almacenado los datos correctamente", "bien")
                    restablecer()
                } else {
                    notificaciones("NUEVO USUARIO", "ha existido un error vuelva a intentarlo", "mal")
                    restablecer()
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    return false
}

function restablecer() {
    document.getElementById('cedula').value = ""
    document.getElementById('nombre').value = ""
    document.getElementById('apellido').value = ""
    document.getElementById('email').value = ""
    document.getElementById('telefono').value = ""
}