const Promociones = require('../models/promocionesModel');

module.exports = {
    nuevo(req, res) {
        console.log(req.body)
        Promociones.nuevo(req.body, (err, data) => {
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
    lsPromociones(req, res) {
        Promociones.lsPromociones(req.body, (err, data) => {
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
    actPromociones(req, res) {
        Promociones.actPromociones(req.body, (err, data) => {
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