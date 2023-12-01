const Reporte = require('../models/reporteModel');

module.exports = {
    
    rpVentasAdminP(req,res) {
        Reporte.rpVentasAdminP((err, data) => {
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

    rpVentasTiendaPieServicio(req, res) {
        Reporte.rpVentasTiendaPieServicio(req.body, (err, data) => {
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

    rpVentasTiendaPieDomicilio(req, res) {
        Reporte.rpVentasTiendaPieDomicilio(req.body, (err, data) => {
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
    rpVentasTiendaListaC(req, res) {
        Reporte.rpVentasTiendaListaC(req.body, (err, data) => {
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
    rpVentasTiendaListaS(req, res) {
        Reporte.rpVentasTiendaListaS(req.body, (err, data) => {
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
    rpVentasTiendaListaP(req, res) {
        Reporte.rpVentasTiendaListaP(req.body, (err, data) => {
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
    rpVentasTienda(req, res) {
        Reporte.rpVentasTienda(req.body, (err, data) => {
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
    rpVentasTiendaServicios(req, res) {
        Reporte.rpVentasTiendaServicios(req.body, (err, data) => {
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
};