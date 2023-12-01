modificarTitulo('Promociones / Nueva Promocion')
var imagen = null
var nombreImagen = ""
var tmp = JSON.parse(sessionStorage.getItem('datos'))
document.getElementById('idEmpresa').value = tmp.idEmpresa
var datosSelect = []
llenarSelect()

function llenarSelect() {
    fetch(ipServidor + 'api/servicios/lsServicios', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ idEmpresa: document.getElementById('idEmpresa').value, estado: "ACTIVO" })
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            datosSelect = json.data
            if (json.data.length == 0 || json.data == null || json.data == undefined) {
                notificaciones("SERVICIOS", "no se han econtrado servicios habilitados para esta empresa, por favor primero ingrese almenos un servicio para crear una promocion", "mal")
            } else {
                var concat = "<option></option>"
                for (var i = 0; i < json.data.length; i++) {
                    concat += "<option value='" + json.data[i].id + "'>" + json.data[i].nombre + "</option>"
                }
                document.getElementById('selectServicio').innerHTML = concat
            }
        })
        .catch(err => {
            console.log(err)
        });
}

function traerDatos() {
    const searchedItem = findById(datosSelect, document.getElementById('selectServicio').value);
    console.log(searchedItem);
    document.getElementById('nombre').value = searchedItem.nombre
    document.getElementById('descripcion').value = searchedItem.descripcion
    document.getElementById('costo').value = searchedItem.costo
    document.getElementById('domicilio').value = searchedItem.domicilio
}


// Obtener los datos de los inputs y almacenarlos en un objeto
function guardar(e) {
    e.preventDefault();
    var datos = {};

    // Obtener los valores de los inputs
    var idEmpresa = document.getElementById('idEmpresa').value
    var idServicio = document.getElementById('selectServicio').value
    var descuento = document.getElementById('descuento').value

    // Almacenar los valores en el objeto datos
    datos.idEmpresa = idEmpresa
    datos.idServicio = idServicio
    datos.descuento = descuento
    datos.fecha = obtenerFechaActual()

    if (idEmpresa != undefined && idEmpresa != null && idEmpresa != "" && idServicio != "" && descuento != "" && descuento != "0") {
        fetch(ipServidor + 'api/promociones/nuevo', {
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
                    notificaciones("PROMOCIONES", "los datos se han almacenado correctamente", "bien")
                } else {
                    notificaciones("PROMOCIONES", "ha existido un error vuelva a intentarlo", "mal")
                }
                limpiarInputs()
            })
            .catch(err => {
                console.log(err)
            });
    } else {
        notificaciones("PROMOCIONES", "ha ocurrido un error", "mal")
    }
}

// Limpiar todos los inputs
function limpiarInputs() {
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('costo').value = '';
    document.getElementById('domicilio').value = '';
    llenarSelect()
    document.getElementById('descuento').value = '';
}
function findById(array, idToFind) {
    return array.find(item => item.id == idToFind);
}