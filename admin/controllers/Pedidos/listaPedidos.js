
modificarTitulo('Pedidos / Lista de Pedidos')
var dtbDatos = {}
var dtbTecnicos = {}
var dtEstado
traerDatos(0, 'GENERADO')

function traerDatos(origen, estado) {
    dtEstado = estado
    try {
        if (origen == 1) {
            $('#miTabla').DataTable().destroy()
        }
        if (estado == 'GENERADO' || estado == 'ASIGNADO') {
            fetch(ipServidor + 'api/pedido/listaPedidoIdEmpresaDom', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    idEmpresa: varIdEmpresa,
                    estado: estado
                })
            })
                .then(response => {
                    return response.json()
                })
                .then(json => {
                    dtbDatos = {}
                    if (json.data == null) { json.data = [] }
                    dibujarTabla(json.data, estado)
                })
                .catch(err => {
                    console.log(err)
                });
        } else if (estado == 'PROCESO' || estado == 'FINALIZADO') {
            fetch(ipServidor + 'api/pedido/listaPedidoIdEmpresaProc', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    idEmpresa: varIdEmpresa,
                    estado: estado
                })
            })
                .then(response => {
                    return response.json()
                })
                .then(json => {
                    dtbDatos = {}
                    if (json.data == null) { json.data = [] }
                    dibujarTabla(json.data, estado)
                })
                .catch(err => {
                    console.log(err)
                });
        }

        fetch(ipServidor + 'api/usuarios/listaTecnicos', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                idEmpresa: varIdEmpresa,
            })
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                dibujarTecnicos(json)
            })
            .catch(err => {
                console.log(err)
            });
    } catch (error) {
        window.location.href = "./login.html"
    }
}

function dibujarTabla(datos, estado) {
    dtbDatos = datos
    $('#miTabla').DataTable({
        "data": dtbDatos,
        "columns": [
            {
                "render": function (data, type, row) {
                    return '<button onclick="detalles(' + row.id + ')" class="btn btn-info mx-1 my-1">Detalle</button>';
                }
            },
            { "data": "id", visible: false },
            { "data": "fecha" },
            { "data": "hora" },
            { "data": "subtotal" },
            { "data": "iva" },
            { "data": "total" },
            { "data": "comentario" }
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

function dibujarTecnicos(datos) {
    dtbTecnicos = datos
    $('#miTabla2').DataTable({
        "data": dtbTecnicos,
        "columns": [
            {
                "render": function (data, type, row) {
                    return '<button type="button" onclick="asignar(' + row.id + ')" class="btn btn-info mx-1">Asignar</button>';
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
    if (confirm("¿Está seguro que desea asignar a este pedido el técnico seleccionado?")) {
        var idPedido = document.getElementById('idPedido').value
        fetch(ipServidor + 'api/pedido/asignacion', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                idPedido: idPedido,
                idUsuario: id
            })
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                if (json.success) {
                    notificaciones("PEDIDOS", "Se ha asignado un tecnico para este pedido exitosamente", "bien")
                    setTimeout(window.location.reload(), 3000)
                } else {
                    notificaciones("PEDIDOS", "Ha ocurrido un error vuelva a intentarlo", "mal")
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
}
function detalles(id) {
    var datos = dtbDatos.find(function (objeto) {
        return objeto.id === id;
    });
    if (datos.estado == 'GENERADO' || datos.estado == 'ASIGNADO') {
        if (datos.domicilio == "SI") {
            $('#p1').removeClass('hidden')
            localStorage.setItem('lat', datos.latDestino)
            localStorage.setItem('lon', datos.lngDestino)
            document.getElementById("iframe").src = './mapa.html'
        } else {
            $('#p1').addClass('hidden')
            document.getElementById("iframe").src = ''
        }
        if (datos.estado == 'ASIGNADO') {
            $('#acordionAsignacion').addClass('hidden')
            $('#acordionTecnico').removeClass('hidden')
            llenarDatosTecnico(datos.id)
        }
    } else {
        $('#acordionAsignacion').addClass('hidden')
        $('#p1').addClass('hidden')
        document.getElementById("iframe").src = ''
        if (datos.domicilio == "SI") {
            $('#acordionTecnico').removeClass('hidden')
            llenarDatosTecnico(datos.id)
        }
    }


    document.getElementById('idPedido').value = datos.id
    document.getElementById('fecha').value = datos.fecha
    document.getElementById('hora').value = datos.hora
    document.getElementById('subtotal').value = datos.subtotal
    document.getElementById('iva').value = datos.iva
    document.getElementById('total').value = datos.total

    document.getElementById('cedula').value = datos.cedula
    document.getElementById('nombre').value = datos.nombres
    document.getElementById('apellido').value = datos.apellidos
    document.getElementById('email').value = datos.email
    document.getElementById('telefono').value = datos.telefono

    fetch(ipServidor + 'api/pedidodt/listaPedidodtIdPedido', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            idPedido: datos.id
        })
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            var contServicios = document.getElementById('contenedorServicios')
            contServicios.innerHTML = ''
            if (json.success) {
                var concat = ''
                for (var i = 0; i < json.data.length; i++) {
                    concat += `<div class="card border border-primary mx-1" style="width: 18rem;">
                    <h5 class="card-header text-center">`+ json.data[i].nombre + `</h5>
                    <img src="`+ ipServidor + '/' + json.data[i].imagen + `" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">`+ json.data[i].descripcion + `</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Costo: `+ json.data[i].costo + `</li>
                        <li class="list-group-item">Costo Domicilio: `+ json.data[i].domicilio + `</li>
                        <li class="list-group-item">Cantidad: `+ json.data[i].cantidad + `</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Total: $`+ json.data[i].precio + `</a>
                    </div>
                </div>`
                }
                contServicios.innerHTML = concat
            }
        })
        .catch(err => {
            console.log(err)
        });
    $('#modalDetalles').modal('show')
}
function llenarDatosTecnico(idPedido) {
    fetch(ipServidor + 'api/pedido/tecnicoId', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            idPedido: idPedido
        })
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            document.getElementById('cedula1').value = json.data[0].cedula
            document.getElementById('nombre1').value = json.data[0].nombres
            document.getElementById('apellido1').value = json.data[0].apellidos
            document.getElementById('email1').value = json.data[0].email
            document.getElementById('telefono1').value = json.data[0].telefono
        })
        .catch(err => {
            console.log(err)
        });
}