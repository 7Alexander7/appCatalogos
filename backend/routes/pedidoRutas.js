
const pedidoControl = require('../controllers/pedidoControl');

module.exports = (app) => {
    app.post('/api/pedido/notificaciones', pedidoControl.notificaciones)
    app.post('/api/pedido/nuevoPedido', pedidoControl.nuevoPedido)
    app.post('/api/pedido/actualizarPedido', pedidoControl.actualizarPedido)
    app.post('/api/pedido/listaPedidoIdEmpresaDom', pedidoControl.listaPedidoIdEmpresaDom)
    app.post('/api/pedido/listaPedidoIdEmpresaProc', pedidoControl.listaPedidoIdEmpresaProc)
    app.post('/api/pedido/eliminarPedido', pedidoControl.eliminarPedido)
    app.post('/api/pedido/asignacion',pedidoControl.asignacion)
    app.post('/api/pedido/tecnicoId',pedidoControl.datosTecnico)

    app.get('/api/pedido/listaPedidos', pedidoControl.listaPedidos)
    app.get('/api/pedido/listaPedidosCliente', pedidoControl.listaPedidosCliente)
}