modificarTitulo('Promociones / Lista de Promociones')

traerDatos()
var dtbDatos
var imgNombreTmp = ''

function traerDatos() {
    try {
        var tmp = JSON.parse(sessionStorage.getItem('datos'))
        var idEmpresa = tmp.idEmpresa
        fetch(ipServidor + 'api/promociones/lsPromociones', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                idEmpresa: idEmpresa
            })
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                console.log(json.data)
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
            { "data": "costo" },
            { "data": "domicilio" },
            { "data": "descuento" },
            { "data": "fecha" }
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
    document.getElementById('nombre').value = datos.nombre
    document.getElementById('descripcion').value = datos.descripcion
    document.getElementById('costo').value = datos.costo
    document.getElementById('domicilio').value = datos.domicilio
    document.getElementById('idPromocion').value = datos.id
    document.getElementById('descuento').value = datos.descuento
    document.getElementById('fecha').value = datos.fecha

    var contImagen = $('#imagen')
    var imagenInput = document.getElementById('imagen');
    if (datos.imagen == null || datos.imagen == "") {
        contImagen.addClass('hidden')
    } else {
        contImagen.removeClass('hidden')
        imgNombreTmp = datos.imagen
        imagenInput.src = ipServidor + 'uploads/' + datos.imagen;
    }
}

function guardar(e) {
    e.preventDefault();
    $('#modalDetalles').modal('hide');
    var id = document.getElementById('idPromocion').value
    var descuento = document.getElementById('descuento').value
    var fecha = document.getElementById('fecha').value
    var objeto = {
        id: id,
        descuento: descuento,
        fecha: fecha
    }
    fetch(ipServidor + 'api/promociones/actPromociones', {
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
                notificaciones("PROMOCIONES", "los datos se han almacenado correctamente", "bien")
                recargarPagina()
            } else {
                notificaciones("PROMOCIONES", "ha existido un error vuelva a intentarlo", "mal")
            }
        })
        .catch(err => {
            console.log(err)
        });
}

function eliminar(e) {
    e.preventDefault();
    var id = document.getElementById('idPromocion').value
    var respuesta = confirm("¿Estás seguro de que quieres eliminar esta promocion?");
    if (respuesta) {
        $('#modalDetalles').modal('hide');

        fetch(ipServidor + 'api/promociones/eliPromociones', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({id:id})
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                if (json.success == true) {
                    notificaciones("PROMOCIONES", "la promocion se ha eliminado correctamente", "bien")
                    recargarPagina()
                } else {
                    notificaciones("PROMOCIONES", "ha existido un error vuelva a intentarlo", "mal")
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
}
