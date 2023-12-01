function registro(e) {
    e.preventDefault()
    console.log("listo par aenviar")
    const cedula = document.getElementById('cedula').value
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const email = document.getElementById('email').value
    const telefono = document.getElementById('telefono').value

    const ruc = document.getElementById('ruc').value
    const razonSocial = document.getElementById('razonSocial').value
    const nombreComercial = document.getElementById('nombreComercial').value
    const telefonoEmpresa = document.getElementById('telefonoEmpresa').value
    const direccionEmpresa = document.getElementById('direccionEmpresa').value

    const pass = document.getElementById('pass').value
    const pass2 = document.getElementById('pass2').value

    if (pass == pass2) {
        const registro = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
            ruc: ruc,
            razonSocial: razonSocial,
            nombreComercial: nombreComercial,
            telefonoEmpresa: telefonoEmpresa,
            direccionEmpresa: direccionEmpresa,
            clave: pass
        }
        fetch(ipServidor + 'api/usuarios/registroEmpresa', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(registro)
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                if (json.success == true) {
                    notificaciones("REGISTRO", json.mensaje, "bien")
                    setTimeout(() => {
                        volver()
                    }, "3000");

                } else {
                    notificaciones("REGISTRO", "El registro ha fallado, pro favor vuelva a intetarlo", "mal")
                }
                //console.log(json)
            })
            .catch(err => {
                console.log(err)
            });
    } else {
        notificaciones("REGISTRO", "Los password ingresados no coinciden", "mal")
    }
    return false;
}

function volver() {
    window.location.href = "./login.html"
}