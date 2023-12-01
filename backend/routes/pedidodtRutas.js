
const pedidodtControl = require('../controllers/pedidodtControl');

module.exports = (app) => {
    app.post('/api/pedidodt/nuevoPedidodt', pedidodtControl.nuevoPedidoDetalle)
    app.post('/api/pedidodt/actualizarPedidodt', pedidodtControl.actualizarPedidoDetalle)
    app.post('/api/pedidodt/listaPedidodtIdPedido', pedidodtControl.listaPedidoDetalleIdPedido)
    app.post('/api/pedidodt/eliminarPedidodt', pedidodtControl.eliminarPedidoDetalle) 

    app.get('/api/pedidodt/listaPedidosdt', pedidodtControl.listaPedidosDetalle)
}