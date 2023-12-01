modificarTitulo('Tiendas / Nueva Tienda')
var imagen = null
var nombreImagen = ""


document.getElementById('imageUpload').addEventListener('change', function (event) {
    imagen = event.target.files[0];
    var imageType = /image.*/;

    if (imagen && imagen.type.match(imageType)) {
        var reader = new FileReader();

        reader.onload = function () {
            var img = document.getElementById('previewImage');
            img.src = reader.result;
            document.getElementsByClassName('dropdown__preview')[0].style.display = 'block';
            document.getElementById('uploadButton').style.display = 'block';
        }

        reader.readAsDataURL(imagen);
    }
});

document.getElementById('uploadButton').addEventListener('click', function () {

    const formData = new FormData();
    formData.append('image', imagen);

    fetch(ipServidor + 'api/subirImagen', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            if (json.success == true) {
                nombreImagen = json.nombre
                document.getElementById('uploadButton').style.display = 'none';
                document.getElementById('labelImageUpload').style.display = 'none';
                notificaciones("SERVICIOS", "se ha guardado la imagen exitosamente", "bien")
            } else {
                notificaciones("SERVICIOS", "ha existido un error vuelva a intentarlo", "mal")
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});




// Obtener los datos de los inputs y almacenarlos en un objeto
function guardar(e) {
    e.preventDefault();

    var ruc = document.getElementById('ruc').value;
    var razonSocial = document.getElementById('razonsocial').value;
    var nombreComercial = document.getElementById('nombrecomercial').value;
    var telefono = document.getElementById('telefono').value;
    var direccion = document.getElementById('direccion').value;

    var datos = {
        ruc: ruc,
        razonSocial: razonSocial,
        nombreComercial: nombreComercial,
        telefono: telefono,
        direccion: direccion
    };


    if (nombreImagen != "" && imagen != null) {
        datos.nombreImagen = nombreImagen
        fetch(ipServidor + 'api/empresa/nuevaImg', {
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
                    notificaciones("TIENDAS", "los datos se han almacenado correctamente", "bien")
                    recargarPagina()
                } else {
                    notificaciones("TIENDAS", "ha existido un error vuelva a intentarlo", "mal")
                    limpiarInputs()
                }
            })
            .catch(err => {
                console.log(err)
            });
    } else {
        notificaciones("SERVICIOS", "debe subir primero una imagen del servicio", "mal")
    }
}

// Limpiar todos los inputs
function limpiarInputs() {
    document.getElementById('ruc').value = '';
    document.getElementById('razonSocial').value = '';
    document.getElementById('nombreComercial').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('direccion').value = '';
    imagen = null
    nombreImagen = ""
    document.getElementById('labelImageUpload').style.display = 'block';
}