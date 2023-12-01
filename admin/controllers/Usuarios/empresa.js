modificarTitulo('Escritorio / Datos de Empresa')

obtenerDatos()

const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('image', file);

    fetch(ipServidor + 'api/subirImagen', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            if (json.success == true) {
                console.log(json);
                fetch(ipServidor + 'api/empresa/actImagen', {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        idEmpresa:document.getElementById('idEmpresa').value,
                        imagen:json.nombre
                    })
                })
                notificaciones("EMPRESA", "se ha guardado la imagen exitosamente", "bien")
                obtenerDatos()
            } else {
                notificaciones("EMPRESA", "ha existido un error vuelva a intentarlo", "mal")
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function guardarCambiosEmpresa() {
    const obj = {
        id: document.getElementById('idEmpresa').value,
        ruc: document.getElementById('ruc').value,
        razonsocial: document.getElementById('razonSocial').value,
        nombrecomercial: document.getElementById('nombreComercial').value,
        direccion: document.getElementById('direccion').value,
        telefonoEmpresa: document.getElementById('telefonoEmpresa').value
    }
    fetch(ipServidor + 'api/empresa/actualizarDatos', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(obj)
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            if (json.success == true) {
                llenarEmpresa(json.data)
                notificaciones("EMPRESA", "se han actualizado los datos correctamente", "bien")
            } else {
                notificaciones("EMPRESA", "ha existido un error vuelva a intentarlo", "mal")
            }
        })
        .catch(err => {
            console.log(err)
        });
}

function obtenerDatos() {
    try {
        const idUsuario = sessionStorage.getItem('id')
        const datos = { idUsuario: idUsuario }
        fetch(ipServidor + 'api/empresa/obtenerDatos', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(datos)
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                if (json.success == true) {
                    llenarEmpresa(json.data)
                } else {
                    notificaciones("EMPRESA", "ha existido un error vuelva a intentarlo", "mal")
                }
            })
            .catch(err => {
                console.log(err)
            });
    } catch (error) {
        notificaciones("EMPRESA", "ha existido un error vuelva a intentarlo", "mal")
    }
}

function llenarEmpresa(datos) {
    document.getElementById('idEmpresa').value = datos.id
    document.getElementById('ruc').value = datos.ruc
    document.getElementById('razonSocial').value = datos.razonsocial
    document.getElementById('nombreComercial').value = datos.nombrecomercial
    document.getElementById('direccion').value = datos.direccion
    document.getElementById('telefonoEmpresa').value = datos.telefonoEmpresa
    if (datos.imagen!='' && datos.imagen!=undefined)
    {
        document.getElementById('banner').src = ipServidor + 'uploads/' + datos.imagen
    }
}