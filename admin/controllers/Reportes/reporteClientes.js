
modificarTitulo('Reportes / Listas')

var dtbReporteCliente = {}

fetch(ipServidor + 'api/reporte/rpVentasTiendaListaC', {
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
        dtbReporteCliente = {}
        if (json.data == null) { json.data = [] }
        console.log("servicios",json.data)
        dibujarTablaS(json.data)
    })
    .catch(err => {
        console.log(err)
    });

function dibujarTablaS(datos) {
    console.log(datos)
    dtbReporteCliente = datos
    $('#tblReporteServicio').DataTable({
        "data": dtbReporteCliente,
        "columns": [
            { "data": "cantidad" },
            { "data": "total" },
            { "data": "nombres" },
            { "data": "apellidos" },
            { "data": "cedula" },
            { "data": "email" },
            { "data": "telefono" }
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
                .column(1, { page: 'current' })
                .data()
                .reduce((a, b) => intVal(a) + intVal(b), 0);

            api.column(1).footer().innerHTML =
                'Total en la Pagina $' + pageTotal;
        }
    });
}