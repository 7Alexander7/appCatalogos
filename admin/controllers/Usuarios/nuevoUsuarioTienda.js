modificarTitulo('Uusarios / Nuevo Usuario')

var rolUsuario
function actRol(rol) {
    document.getElementById('btnRol').innerHTML = rol
    rolUsuario = rol
}

function guardarUsuario(e) {
    e.preventDefault();
    const usuario = {
        cedula: document.getElementById('cedula').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        clave: 'catalogos123',
        rol: rolUsuario
    }
    if (usuario.rol == "ADMINISTRADOR DE TIENDA") {
        usuario.rol = 'TIENDA'
    } else {
        usuario.rol = 'TECNICO'
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
    document.getElementById('btnRol').value="PRIVILEGIOS"
}