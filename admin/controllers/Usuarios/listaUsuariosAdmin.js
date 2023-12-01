modificarTitulo('Usuarios / Lista de Usuarios')
traerDatos()
var datosDTB

function traerDatos() {
    fetch(ipServidor + 'api/usuarios/lsUsuariosAdmin', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            dibujarTabla(json)
        })
        .catch(err => {
            console.log(err)
        });
}
function dibujarTabla(datos) {
    datosDTB = datos
    $('#miTabla').DataTable({
        "data": datos,
        "columns": [
            { "data": "id", visible: false },
            { "data": "cedula" },
            { "data": "nombres" },
            { "data": "apellidos" },
            { "data": "email" },
            { "data": "telefono" },
            {
                "render": function (data, type, row) {
                    // Genera el contenido personalizado para la columna de acciones
                    return '<button onclick="editar(' + row.id + ')" class="btn btn-info mx-1 my-1">Editar</button>' +
                        '<button onclick="eliminar(' + row.id + ')" class="btn btn-danger mx-1 my-1">Eliminar</button>';
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

function editar(id) {
    var objeto = datosDTB.find(function (objeto) {
        return objeto.id === id;
    });
    $('#modalEditar').modal('show');
    // Obtener los inputs
    const idInput = document.getElementById('id');
    const cedulaInput = document.getElementById('cedula');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');

    // Llenar los inputs con los valores del objeto
    idInput.value = objeto.id;
    cedulaInput.value = objeto.cedula;
    nombreInput.value = objeto.nombres;
    apellidoInput.value = objeto.apellidos;
    emailInput.value = objeto.email;
    telefonoInput.value = objeto.telefono;
}

function actualizarUsuario(e) {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    const objeto = {
        idUsuario: id,
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono
    };
    fetch(ipServidor + 'api/usuarios/actPerfil', {
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
                notificaciones("LISTA DE USUARIOS", "se han almacenado los cambios correctamente", "bien")
                recargarPagina()
            } else {
                notificaciones("LISTA DE USUARIOS", "ha existido un error vuelva a intentarlo", "mal")
            }
        })
        .catch(err => {
            console.log(err)
        });
}

function eliminar(id) {
    if (confirm("¿Estás seguro de que deseas continuar?")) {

        fetch(ipServidor + 'api/usuarios/eliUsuario', {
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
                console.log(json)
                if (json.success == true) {
                    notificaciones("LISTA DE USUARIOS", "se han almacenado los cambios correctamente", "bien")
                    recargarPagina()
                } else {
                    notificaciones("LISTA DE USUARIOS", "ha existido un error vuelva a intentarlo", "mal")
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
}