
modificarTitulo('Reportes / Listas')
var dtbReportePedidos = {}
var dtbReporteServicio = {}
var dtbTecnicos = {}

fetch(ipServidor + 'api/reporte/rpVentasTiendaListaP', {
    headers: {
        'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
        idEmpresa: varIdEmpresa
    })
})
    .then(response => {
        return response.json()
    })
    .then(json => {
        dtbReportePedidos = {}
        if (json.data == null) { json.data = [] }
        dibujarTabla(json.data)
    })
    .catch(err => {
        console.log(err)
    });

fetch(ipServidor + 'api/reporte/rpVentasTiendaListaS', {
    headers: {
        'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
        idEmpresa: varIdEmpresa
    })
})
    .then(response => {
        return response.json()
    })
    .then(json => {
        dtbReporteServicio = {}
        if (json.data == null) { json.data = [] }
        console.log("servicios",json.data)
        dibujarTablaS(json.data)
    })
    .catch(err => {
        console.log(err)
    });

function dibujarTablaS(datos) {
    console.log(datos)
    dtbReporteServicio = datos
    $('#tblReporteServicio').DataTable({
        "data": dtbReporteServicio,
        "columns": [
            {
                "render": function (data, type, row) {
                    return '<button onclick="detalles(1,' + row.id + ')" class="btn btn-info mx-1 my-1">Detalle</button>';
                }
            },
            { "data": "id", visible: false },
            { "data": "fecha" },
            { "data": "hora" },
            { "data": "nombre" },
            { "data": "cantidad" },
            { "data": "precio" }
        ],
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5',
            'print'
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
        },
        footerCallback: function (row, data, start, end, display) {
            let api = this.api();

            let intVal = function (i) {
                return typeof i === 'string'
                    ? i.replace(/[\$,]/g, '') * 1
                    : typeof i === 'number'
                        ? i
                        : 0;
            };
            pageTotal = api
                .column(6, { page: 'current' })
                .data()
                .reduce((a, b) => intVal(a) + intVal(b), 0);

            api.column(6).footer().innerHTML =
                'Total en la Pagina $' + pageTotal;
        }
    });
}

function dibujarTabla(datos) {
    dtbReportePedidos = datos
    $('#tblReportePedido').DataTable({
        "data": dtbReportePedidos,
        "columns": [
            {
                "render": function (data, type, row) {
                    return '<button onclick="detalles(0,' + row.id + ')" class="btn btn-info mx-1 my-1">Detalle</button>';
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
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5',
            'print'
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
        },
        footerCallback: function (row, data, start, end, display) {
            let api = this.api();

            let intVal = function (i) {
                return typeof i === 'string'
                    ? i.replace(/[\$,]/g, '') * 1
                    : typeof i === 'number'
                        ? i
                        : 0;
            };
            pageTotal = api
                .column(5, { page: 'current' })
                .data()
                .reduce((a, b) => intVal(a) + intVal(b), 0);

            api.column(5).footer().innerHTML =
                'Total en la Pagina $' + pageTotal;
        }
    });
}

function detalles(origen,id) {
    var datos 
    if (origen==0)
    {
        datos = dtbReportePedidos.find(function (objeto) {
            return objeto.id === id;
        });
    }else {
        datos = dtbReporteServicio.find(function (objeto) {
            return objeto.id === id;
        });
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