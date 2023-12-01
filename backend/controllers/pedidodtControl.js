const PedidoDt = require('../models/pedidoDtModel');

module.exports = {
    nuevoPedidoDetalle(req, res) {
        PedidoDt.nuevoPedidoDetalle(req.body, (err, data) => {
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
    listaPedidoDetalleIdPedido(req, res) {
        PedidoDt.listaPedidoDetalleIdPedido(req.body, (err, data) => {
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
    actualizarPedidoDetalle(req, res) {
        PedidoDt.actualizarPedidoDetalle(req.body, (err, data) => {
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
    eliminarPedidoDetalle(req, res) {
        PedidoDt.eliminarPedidoDetalle(req.body.idDetalle, (err, data) => {
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
    listaPedidosDetalle(req, res) {
        PedidoDt.listaPedidosDetalle(req, (err, data) => {
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