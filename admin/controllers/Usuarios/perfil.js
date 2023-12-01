restablecer()
modificarTitulo('Usuarios / Perfil')

function actPass(e) {
    e.preventDefault()
    const passOriginal = document.getElementById('passOriginal').value
    const pass1 = document.getElementById('pass1').value
    const pass2 = document.getElementById('pass2').value
    var tmp = JSON.parse(sessionStorage.getItem('datos'))
    if (pass1 === pass2) {
        fetch(ipServidor + 'api/usuarios/actPass', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                pass: pass1,
                passOriginal: passOriginal,
                email: tmp.email,
                idUsuario: tmp.idUsuario
            })
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                $('#modal-form').modal('hide')
                if (json.success == true) {
                    notificaciones("PERFIL", "se han almacenado los cambios correctamente", "bien")
                } else {
                    notificaciones("PERFIL", "ha existido un error vuelva a intentarlo", "mal")
                }
            })
            .catch(err => {
                console.log(err)
            });
    } else {
        notificaciones("PERFIL", "Las contraseñas nuevas ingresadas no coinciden", "mal")
    }
    return false
}

function guardarCambiosPerfil() {
    try {
        const idUsuario = document.getElementById('idUsuario').value
        const cedula = document.getElementById('cedula').value
        const nombre = document.getElementById('nombre').value
        const apellido = document.getElementById('apellido').value
        const email = document.getElementById('email').value
        const telefono = document.getElementById('telefono').value
        const usuario = {
            idUsuario: idUsuario,
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono
        }
        if (idUsuario != null && idUsuario != undefined && cedula != "" && cedula != null) {
            fetch(ipServidor + 'api/usuarios/actPerfil', {
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
                        notificaciones("PERFIL", "se han almacenado lso cambios correctamente", "bien")
                    } else {
                        notificaciones("PERFIL", "ha existido un error vuelva a intentarlo", "mal")
                        restablecer()
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        } else {
            restablecer()
        }
    } catch (error) {
        restablecer()
    }
}

function restablecer() {
    try {
        const perfil = JSON.parse(sessionStorage.getItem('datos'))
        //console.log(perfil)
        document.getElementById('idUsuario').value = perfil.idUsuario
        document.getElementById('cedula').value = perfil.cedula
        document.getElementById('nombre').value = perfil.nombres
        document.getElementById('apellido').value = perfil.apellidos
        document.getElementById('email').value = perfil.email
        document.getElementById('telefono').value = perfil.telefono

    } catch (error) {
        console.error(error)
    }
}
