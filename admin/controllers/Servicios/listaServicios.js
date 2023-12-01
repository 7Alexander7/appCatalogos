modificarTitulo('Servicios / Lista de Servicios')

traerDatos(0, 'ACTIVO')
var dtbDatos
var imgNombreTmp = ''

function traerDatos(origen, estado) {
    try {
        var tmp = JSON.parse(sessionStorage.getItem('datos'))
        var idEmpresa = tmp.idEmpresa
        if (origen == 1) {
            $('#miTabla').DataTable().destroy()
        }
        fetch(ipServidor + 'api/servicios/lsServicios', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                idEmpresa: idEmpresa,
                estado: estado
            })
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                dibujarTabla(json.data)
            })
            .catch(err => {
                console.log(err)
            });
    } catch (error) {
        window.location.href = "./login.html"
    }
}

function dibujarTabla(datos) {
    dtbDatos = datos
    $('#miTabla').DataTable({
        "data": datos,
        "columns": [
            {
                "render": function (data, type, row) {
                    return '<button onclick="detalles(' + row.id + ')" class="btn btn-info mx-1 my-1">Detalles</button>';
                }
            },
            { "data": "id", visible: false },
            { "data": "nombre" },
            { "data": "descripcion" },
            { "data": "costo" },
            { "data": "domicilio" }
        ],
        "language": {
            "decimal": "",
            "emptyTable": "No hay datos disponibles en la tabla",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "Mostrando 0 a 0 de 0 registros",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron registros coincidentes",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
}

function detalles(id) {
    var datos = dtbDatos.find(function (objeto) {
        return objeto.id === id;
    });
    $('#modalDetalles').modal('show');
    if (datos.estado == "ACTIVO") {
        $('#btnActivar').addClass('hidden');
        $('#btnDesactivar').removeClass('hidden');
    } else {
        $('#btnActivar').removeClass('hidden')
        $('#btnDesactivar').addClass('hidden')
    }
    document.getElementById('nombre').value = datos.nombre
    document.getElementById('descripcion').value = datos.descripcion
    document.getElementById('costo').value = datos.costo
    document.getElementById('domicilio').value = datos.domicilio
    document.getElementById('idServicio').value = datos.id
    document.getElementById('estado').value = datos.estado
    var contImagen = $('#imagen')
    var imagenInput = document.getElementById('imagen');
    if (datos.imagen == null || datos.imagen == "") {
        contImagen.addClass('hidden')
        document.getElementById('tituloImg').innerHTML = "Subir Imagen"
    } else {
        contImagen.removeClass('hidden')
        imgNombreTmp = datos.imagen
        imagenInput.src = ipServidor + 'uploads/' + datos.imagen;
        document.getElementById('tituloImg').innerHTML = "Actualizar Imagen"
    }
}

document.getElementById('imageUpload').addEventListener('change', function (event) {
    imagen = event.target.files[0];
    var imageType = /image.*/;

    if (imagen && imagen.type.match(imageType)) {
        var reader = new FileReader();

        reader.onload = function () {
            var contImagen = $('#imagen')
            var img = document.getElementById('imagen');
            contImagen.removeClass('hidden')
            img.src = reader.result;
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
                imgNombreTmp = json.nombre
                document.getElementById('uploadButton').style.display = 'none';
                notificaciones("SERVICIOS", "se ha guardado la imagen exitosamente, RECUERDE guardar para finalizar", "bien")
            } else {
                notificaciones("SERVICIOS", "ha existido un error vuelva a intentarlo", "mal")
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function guardar(e) {
    e.preventDefault();
    $('#modalDetalles').modal('hide');
    var id = document.getElementById('idServicio').value
    var nombre = document.getElementById('nombre').value
    var descripcion = document.getElementById('descripcion').value
    var costo = document.getElementById('costo').value
    var domicilio = document.getElementById('domicilio').value
    var estado = document.getElementById('estado').value
    var objeto = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        costo: costo,
        domicilio: domicilio,
        imagen: imgNombreTmp,
        estado: estado
    }
    fetch(ipServidor + 'api/servicios/actServicio', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(objeto)
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            if (json.success == true) {
                notificaciones("SERVICIOS", "los datos se han almacenado correctamente", "bien")
                recargarPagina()
            } else {
                notificaciones("SERVICIOS", "ha existido un error vuelva a intentarlo", "mal")
            }
        })
        .catch(err => {
            console.log(err)
        });
}

function actEstado(estado) {
    if (confirm("¿Estás seguro de que deseas continuar?")) {
        if (estado == 'ACTIVAR') {
            estado = 'ACTIVO'
        } else if (estado == 'DESACTIVAR') {
            estado = 'INACTIVO'
        }
        $('#modalDetalles').modal('hide');
        var id = document.getElementById('idServicio').value
        var nombre = document.getElementById('nombre').value
        var descripcion = document.getElementById('descripcion').value
        var costo = document.getElementById('costo').value
        var domicilio = document.getElementById('domicilio').value
        var objeto = {
            id: id,
            nombre: nombre,
            descripcion: descripcion,
            costo: costo,
            domicilio: domicilio,
            imagen: imgNombreTmp,
            estado: estado
        }
        fetch(ipServidor + 'api/servicios/actServicio', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(objeto)
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                if (json.success == true) {
                    notificaciones("SERVICIOS", "los datos se han almacenado correctamente", "bien")
                    recargarPagina()
                } else {
                    notificaciones("SERVICIOS", "ha existido un error vuelva a intentarlo", "mal")
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
}