const Servicio = require('../models/servicioModel');

module.exports = {
    nuevo(req, res) {        
        Servicio.nuevo(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                data: data
            })
        })

    },
    lsServicios(req, res) {
        Servicio.lsServicios(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                data: data
            })
        })
    },
    actServicio(req, res) {
        Servicio.actServicio(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                data: data
            })
        })
    },
}