

function llenarVariablesSession(datos) {
    //console.log("datos de usuario que inicio sesion: ", datos)
    sessionStorage.setItem('id', datos.idUsuario)
    sessionStorage.setItem('rol', datos.rol)
    //console.log(datos)
    sessionStorage.setItem('datos', JSON.stringify(datos))
    setTimeout(() => {
        window.location.href = "./views/principal.html"
    }, "2000");
}

function login(e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const pass = document.getElementById('pass').value
    if (email != "" && pass != "") {
        const usuario = {
            usuario: email,
            clave: pass
        }
        fetch(ipServidor + 'api/login', {
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
                    if (json.data.rol=='ADMINISTRADOR' || json.data.rol=='TIENDA' || json.data.rol=='TECNICO')
                    {
                        notificaciones("LOGIN", "Usuario autenticado con exito", "bien")
                        llenarVariablesSession(json.data)
                    }else{
                        notificaciones("LOGIN", "Nivel de privilegios incorrectos", "mal")
                    }
                } else {
                    document.getElementById('email').value = ""
                    document.getElementById("pass").value = ""
                    notificaciones("LOGIN", "Credenciales incorrectas", "mal")
                }
            })
            .catch(err => {
                console.log(err)
            });
    } else {
        notificaciones("LOGIN", "Es necesario todos los datos", "mal")
    }
    return false;
}

function irOlvidePass() {
    window.location.href = "./olvidePass.html"
}