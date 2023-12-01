modificarTitulo('Tiendas / Lista de Tiendas por Asignaciòn de usuarios')
traerDatosNoAsignadas()
traerDatosAsignadas()
$.fn.dataTable.ext.errMode = 'none'

var datosDTB
var datosDTBUsuarios

function traerDatosAsignadas(num) {
    if (num == 1) {
        $('#miTabla').DataTable().destroy()
    }
    fetch(ipServidor + 'api/empresa/lsEmpresaAsignadas', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            //console.log(json)
            dibujarTabla(json.data)
        })
        .catch(err => {
            console.log(err)
        });
}

function traerDatosNoAsignadas(num) {
    if (num == 1) {
        $('#miTabla2').DataTable().destroy()
    }
    fetch(ipServidor + 'api/empresa/lsEmpresasNoAsignadas', {
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
            {
                "render": function (data, type, row) {
                    // Genera el contenido personalizado para la columna de acciones
                    return '<button onclick="asignar(' + row.id + ')" class="btn btn-info mx-1 my-1">Asignar</button>'
                }
            },
            { "data": "id", visible: false },
            { "data": "ruc" },
            { "data": "razonsocial" },
            { "data": "nombrecomercial" },
            { "data": "telefonoEmpresa" },
            { "data": "direccion" }
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
            {
                "render": function (data, type, row) {
                    // Genera el contenido personalizado para la columna de acciones
                    return '<button onclick="masDatos(' + row.id + ')" class="btn btn-info mx-1 my-1">Datos</button>'
                }
            },
            { "data": "id", visible: false },
            { "data": "ruc" },
            { "data": "razonsocial" },
            { "data": "nombrecomercial" },
            { "data": "telefonoEmpresa" },
            { "data": "direccion" }
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
function dibujarTabla3(datos) {
    datosDTBUsuarios = datos
    console.log(datosDTBUsuarios)
    $('#miTabla3').DataTable({
        "data": datos,
        "columns": [
            {
                "render": function (data, type, row) {
                    // Genera el contenido personalizado para la columna de acciones
                    return '<button onclick="asignarUsuario(' + row.id + ')" class="btn btn-info mx-1 my-1">Asignar</button>'
                }
            },
            { "data": "id", visible: false },
            { "data": "cedula" },
            { "data": "nombres" },
            { "data": "apellidos" },
            { "data": "email" },
            { "data": "telefono" }
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

function asignar(id) {
    $('#modalAsignar').modal('show');
    fetch(ipServidor + 'api/usuarios/lsUsuariosSNEMpresa', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            document.getElementById('idEmpresa').value = id
            dibujarTabla3(json.data)
        })
        .catch(err => {
            console.log(err)
        });
}

function asignarUsuario(id) {
    if (confirm("¿Estás seguro de que deseas continuar?")) {
        var idEmpresa = document.getElementById('idEmpresa').value;
        if (idEmpresa == undefined || idEmpresa == null || idEmpresa == '') {
            notificaciones("ASIGNACION DE USUARIOS", "Error vuelva a intentarlo", "mal")
        } else {
            fetch(ipServidor + 'api/empresa/asignacion', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ idUsuario: id, idEmpresa: idEmpresa })
            })
                .then(response => {
                    return response.json()
                })
                .then(json => {
                    if (json.success == true) {
                        notificaciones("ASIGNACION USUARIOS", "se han almacenado los cambios correctamente", "bien")
                        recargarPagina();
                    } else {
                        notificaciones("ASIGNACION USUARIOS", "ha existido un error vuelva a intentarlo", "mal")
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }
}

function masDatos(id) {
    var datos = datosDTB.find(function (objeto) {
        return objeto.id === id;
    });
    $('#modalMasDatos').modal('show');
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

