const Pedido = require('../models/pedidoModel');

module.exports = {
    asignacion(req, res) {
        Pedido.asignacion(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                //data: data
            });
        });
    },
    notificaciones(req, res) {
        Pedido.notificaciones(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                data: data
            });
        });
    },
    nuevoPedido(req, res) {
        Pedido.nuevoPedido(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                data: data
            });
        });
    },
    datosTecnico(req, res) {
        Pedido.datosTecnico(req.body, (err, data) => {
            return res.status(200).json({
                success: true,
                data: data
            });
        });
    },
    listaPedidoIdEmpresaDom(req, res) {
        Pedido.listaPedidoIdEmpresaDom(req.body, (err, data) => {
            return res.status(200).json({
                success: true,
                data: data
            });
        });
    },
    listaPedidoIdEmpresaProc(req, res) {
        Pedido.listaPedidoIdEmpresaProc(req.body, (err, data) => {
            return res.status(200).json({
                success: true,
                data: data
            });
        });
    },
    actualizarPedido(req, res) {
        Pedido.actualizarPedido(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                data: data
            });
        });
    },
    eliminarPedido(req, res) {
        Pedido.eliminarPedido(req.body.idPedido, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                data: data
            });
        });
    },
    listaPedidos(req, res) {
        Pedido.listaPedidos(req, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                data: data
            });
        });
    },
    listaPedidosCliente(req, res) {
        const idCliente = req.query.idUsuario
        Pedido.listaPedidosCliente(idCliente, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                data: data
            });
        });
    }
};