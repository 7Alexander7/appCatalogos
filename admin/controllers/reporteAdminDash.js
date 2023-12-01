modificarTitulo('Reporte / Dashboard')

var dtbReportePedidos = {}

fetch(ipServidor + 'api/reporte/rpVentasAdminP', {
    headers: {
        'Content-type': 'application/json'
    },
    method: 'GET',
})
    .then(response => {
        return response.json()
    })
    .then(json => {
        console.log(json)
        dtbReportePedidos = {}
        if (json.data == null) { json.data = [] }
        dibujarTabla(json.data)
    })
    .catch(err => {
        console.log(err)
    });

function dibujarTabla(datos) {
    dtbReportePedidos = datos
    $('#tblReportePedido').DataTable({
        "data": dtbReportePedidos,
        "columns": [
            { "data": "empresa" },
            { "data": "pedidos" },
            { "data": "subtotal" },
            { "data": "iva" },
            { "data": "total" }
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
                .column(4, { page: 'current' })
                .data()
                .reduce((a, b) => intVal(a) + intVal(b), 0);

            api.column(4).footer().innerHTML =
                'Total en la Pagina $' + pageTotal;
        }
    });
}