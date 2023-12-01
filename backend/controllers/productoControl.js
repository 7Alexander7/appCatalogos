const Producto = require('../models/productoModel');

module.exports = {
    nuevo(req, res) {
        console.log(req.body)
        Producto.nuevo(req.body, (err, data) => {
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
    lsProductos(req, res) {
        Producto.lsProductos(req.body, (err, data) => {
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
    actProducto(req, res) {
        Producto.actProducto(req.body, (err, data) => {
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