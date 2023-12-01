modificarTitulo('Tiendas / Lista de Tiendas')
traerDatosInactiva()
traerDatosActivadas()

var datosDTB

function traerDatosActivadas(num) {
    if (num == 1) {
        $('#miTabla').DataTable().destroy()
    }
    fetch(ipServidor + 'api/empresa/lsEmpresaActivada', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'GET'
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
}

function traerDatosInactiva(num) {
    if (num == 1) {
        $('#miTabla2').DataTable().destroy()
    }
    fetch(ipServidor + 'api/empresa/lsEmpresaInactiva', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            dibujarTabla2(json.data)
        })
        .catch(err => {
            console.log(err)
        });
}

function dibujarTabla2(datos) {
    datosDTB = datos
    $('#miTabla2').DataTable({
        "data": datos,
        "columns": [
            { "data": "id", visible: false },
            { "data": "ruc" },
            { "data": "razonsocial" },
            { "data": "nombrecomercial" },
            { "data": "telefonoEmpresa" },
            { "data": "direccion" },
            {
                "render": function (data, type, row) {
                    // Genera el contenido personalizado para la columna de acciones
                    return '<button onclick="imagen(' + row.id + ')" class="btn btn-info mx-1 my-1">Imagen</button>' +
                        '<button onclick="activar(' + row.id + ')" class="btn btn-success mx-1 my-1">Activar</button>';
                }
            }
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

function dibujarTabla(datos) {
    datosDTB = datos
    $('#miTabla').DataTable({
        "data": datos,
        "columns": [
            { "data": "id", visible: false },
            { "data": "ruc" },
            { "data": "razonsocial" },
            { "data": "nombrecomercial" },
            { "data": "telefonoEmpresa" },
            { "data": "direccion" },
            {
                "render": function (data, type, row) {
                    // Genera el contenido personalizado para la columna de acciones
                    return '<button onclick="imagen(' + row.id + ')" class="btn btn-info mx-1 my-1">Imagen</button>' +
                        '<button onclick="desactivar(' + row.id + ')" class="btn btn-danger mx-1 my-1">Desactivar</button>';
                }
            }
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
function desactivar(id) {
    if (confirm("¿Estás seguro de que deseas continuar?")) {

        fetch(ipServidor + 'api/empresa/estado', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ id: id, estado: "FALSE" })
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                console.log(json)
                if (json.success == true) {
                    notificaciones("LISTA TIENDAS", "se han almacenado los cambios correctamente", "bien")
                    recargarPagina()
                } else {
                    notificaciones("LISTA TIENDAS", "ha existido un error vuelva a intentarlo", "mal")
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
}

function activar(id) {
    if (confirm("¿Estás seguro de que deseas continuar?")) {

        fetch(ipServidor + 'api/empresa/estado', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ id: id, estado: "TRUE" })
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                console.log(json)
                if (json.success == true) {
                    notificaciones("LISTA TIENDAS", "se han almacenado los cambios correctamente", "bien")
                    recargarPagina()
                } else {
                    notificaciones("LISTA TIENDAS", "ha existido un error vuelva a intentarlo", "mal")
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
}

function imagen(id) {
    var datos = datosDTB.find(function (objeto) {
        return objeto.id === id;
    });
    $('#modalImagen').modal('show');
    // Obtener referencias a los elementos de entrada HTML
    var rucInput = document.getElementById('ruc');
    var razonSocialInput = document.getElementById('razonsocial');
    var nombreComercialInput = document.getElementById('nombrecomercial');
    var telefonoEmpresaInput = document.getElementById('telefono');
    var direccionInput = document.getElementById('direccion');
    var imagenInput = document.getElementById('imagen');

    // Rellenar los campos de entrada con los valores del objeto
    rucInput.value = datos.ruc;
    razonSocialInput.value = datos.razonsocial;
    nombreComercialInput.value = datos.nombrecomercial;
    telefonoEmpresaInput.value = datos.telefonoEmpresa;
    direccionInput.value = datos.direccion;
    var contImagen = $('#imagen')
    if (datos.imagen == null || datos.imagen == "") {
        contImagen.addClass('hidden')
    } else {
        contImagen.removeClass('hidden')
        imagenInput.src = ipServidor + 'uploads/' + datos.imagen;
    }

}

