
const reporteControl = require('../controllers/reporteControl');

module.exports = (app) => {

    app.post('/api/reporte/rpVentasTienda', reporteControl.rpVentasTienda)
    app.post('/api/reporte/rpVentasTiendaListaP', reporteControl.rpVentasTiendaListaP)
    app.post('/api/reporte/rpVentasTiendaListaS', reporteControl.rpVentasTiendaListaS)
    app.post('/api/reporte/rpVentasTiendaListaC', reporteControl.rpVentasTiendaListaC)
    app.post('/api/reporte/rpVentasTiendaServicios', reporteControl.rpVentasTiendaServicios)

    app.post('/api/reporte/rpVentasTiendaPieDomicilio', reporteControl.rpVentasTiendaPieDomicilio)
    app.post('/api/reporte/rpVentasTiendaPieServicio', reporteControl.rpVentasTiendaPieServicio)

    app.get('/api/reporte/rpVentasAdminP', reporteControl.rpVentasAdminP)
    //app.get('/api/pedidodt/listaPedidosdt', pedidodtControl.listaPedidosDetalle)
}