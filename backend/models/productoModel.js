const db = require('../config/config');

const Producto = {};

Producto.nuevo = async (producto, result) => {

    var sql = 'INSERT INTO productos(nombre, descripcion, costo, domicilio, imagen, estado, idEmpresa) VALUES(?,?,?,?,?,?,?)'
    db.query(
        sql,
        [
            producto.nombre,
            producto.descripcion,
            producto.costo,
            producto.domicilio,
            producto.nombreImagen,
            "ACTIVO",
            producto.idEmpresa
        ],
        (err, res) => {
            if (err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, res.insertId)
            }
        }
    )
},
    Producto.lsProductos = (req, result) => {
        const sql = `SELECT * FROM productos
        WHERE idEmpresa=? AND estado=?`
        db.query(sql, [
            req.idEmpresa, req.estado
        ], (err, res) => {
            if (err) {
                result(err, null)
            } else {
                result(null, res)
            }
        })
    },

    Producto.actProducto = async (producto, result) => {
        var sql = 'UPDATE productos SET nombre=?, descripcion=?, costo=?, domicilio=?, imagen=?, estado=? WHERE id=?'
        db.query(
            sql,
            [
                producto.nombre,
                producto.descripcion,
                producto.costo,
                producto.domicilio,
                producto.imagen,
                producto.estado,
                producto.id
            ],
            (err, res) => {
                if (err) {
                    console.log(err)
                    result(err, null)
                } else {
                    result(null, res.insertId)
                }
            }
        )
    },

    module.exports = Producto;