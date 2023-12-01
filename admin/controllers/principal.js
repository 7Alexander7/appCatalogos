var varIdEmpresa, varROl
//cargar componentes del modulo principal
$('#pluginConfig').load('./config.html')
$('#footerCont').load('./footer.html')
$.fn.dataTableExt.sErrMode = 'throw';
//$('#contenedorPrincipal').load('./Usuarios/listaUsuariosAdmin.html')

//revisar correcto inicio de sesion
try {
    if (sessionStorage.getItem('id') && sessionStorage.getItem('rol')) {
        const temp = JSON.parse(sessionStorage.getItem('datos'))
        varIdEmpresa = temp.idEmpresa
        varROl = temp.rol
        if (temp.rol == sessionStorage.getItem('rol') && temp.id == sessionStorage.getItem('idUsuario')) {
            dibujarMenu(temp.rol)
        } else {
            notificaciones("PRINCIPAL", "Acceso no Autorizado", "mal")
            setTimeout(() => {
                window.location.href = "./login.html"
            }, "2000");
        }
    } else {
        notificaciones("PRINCIPAL", "Acceso no Autorizado", "mal")
        setTimeout(() => {
            window.location.href = "./login.html"
        }, "2000");
    }
} catch (error) {
    notificaciones("PRINCIPAL", "Acceso no Autorizado", "mal")
    setTimeout(() => {
        window.location.href = "./login.html"
    }, "2000");
}

function dibujarMenu(rol) {
    if (rol == 'ADMINISTRADOR') {
        $('#mnEmpresa').addClass('hidden')
        $('#usuariosTienda').addClass('hidden')
        $('#mnServicios').addClass('hidden')
        $('#mnPedidos').addClass('hidden')
        $('#mnReporteClientes').addClass('hidden')
        $('#mnReportePedidos').addClass('hidden')
        $('#mnReporteServicios').addClass('hidden')
        //cargarHoja('./Usuarios/perfil.html')
    } else if (rol == 'TIENDA') {
        $('#usuariosAdmin').addClass('hidden')
        $('#mnTiendas').addClass('hidden')
    } else {
        $('#mnEmpresa').addClass('hidden')
        $('#usuariosTienda').addClass('hidden')
        $('#mnTiendas').addClass('hidden')
        $('#mnServicios').addClass('hidden')
        $('#mnPedidos').addClass('hidden')
        $('#usuariosAdmin').addClass('hidden')
        $('#mnTiendas').addClass('hidden')
        $('#mnReporteClientes').addClass('hidden')
        $('#mnReportePedidos').addClass('hidden')
        $('#mnReporteServicios').addClass('hidden')
    }
}

revisarHoja()
setInterval(revisarNotificaciones, 30000)

async function revisarNotificaciones() {
    if (varROl == 'TIENDA' || varROl == 'ADMINISTRADOR') {
        await fetch(ipServidor + 'api/pedido/notificaciones', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: '{"idEmpresa":"' + varIdEmpresa + '"}'
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                if (json.success) {
                    var concat = ''
                    var cont = document.getElementById('contenedorNotificaciones')
                    $('#puntoNotificaciones').removeClass('hidden')
                    cont.innerHTML = ""
                    for (var i = 0; i < json.data.length; i++) {
                        concat += `<li class="mb-2">
                        <a class="dropdown-item border-radius-md" href="javascript:;" onclick="cargarHoja('./Pedidos/listaPedidos.html')">
                            <div class="d-flex py-1">
                                <div class="d-flex flex-column justify-content-center">
                                    <h6 class="text-sm font-weight-normal mb-1">
                                        <span class="font-weight-bold">Nuevo Pedido</span>`+ json.data[i].hora + `
                                    </h6>
                                </div>
                            </div>
                        </a>
                    </li>`
                    }
                    cont.innerHTML = concat
                } else {
                    document.getElementById('contenedorNotificaciones').innerHTML = ''
                    $('#puntoNotificaciones').addClass('hidden')
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
}

function reporte(){
    if (varROl == "ADMINISTRADOR") {
        cargarHoja('./reporteAdminDash.html')
    } else {
        cargarHoja('./reporteTiendaDash.html')
    }
}

function revisarHoja() {
    var queryString = window.location.search
    var urlParams = new URLSearchParams(queryString)
    var hoja = urlParams.get('x')
    if (hoja) {
        hoja = desencriptar(hoja.replace(/ /g, '+'), claveCript)
        $('#contenedorPrincipal').load(hoja)
    } else {
        if (varROl == "ADMINISTRADOR") {
            cargarHoja('./reporteAdminDash.html')
        } else {
            cargarHoja('./reporteTiendaDash.html')
        }
    }
}
function encriptar(texto) {
    var textoEncriptado = CryptoJS.AES.encrypt(texto, claveCript).toString();
    return textoEncriptado;
}

function desencriptar(textoEncriptado) {
    var bytes = CryptoJS.AES.decrypt(textoEncriptado, claveCript);
    var textoDesencriptado = bytes.toString(CryptoJS.enc.Utf8);
    return textoDesencriptado;
}

function cargarHoja(hoja) {
    if (hoja != undefined && hoja != null) {
        var d = encriptar(hoja.toString())
        window.location.href = "principal.html?x=" + d.toString()
    }
}
//cargarHoja('./Pedidos/listaPedidos.html')

function modificarTitulo(titulo) {
    document.getElementById('titular').innerHTML = titulo
}

/*function cargarHojax(e, hoja) {
    var links = document.getElementsByClassName('nav-link text-white')
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('active')
        links[i].classList.remove('bg-gradient-primary')
    }
    $(e.srcElement).addClass('bg-gradient-primary active')
    $('#contenedorPrincipal').load(hoja)
}*/

function cerrarSesion() {
    localStorage.clear()
    location.href = "../index.html";
}