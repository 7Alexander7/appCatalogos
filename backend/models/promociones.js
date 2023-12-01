const db = require('../config/config');

const Promociones = {};

Promociones.nuevo = async (promociones, result) => {

    var sql = 'INSERT INTO promociones(idEmpresa,idServicio,fecha,descuento) VALUES(?,?,?,?)'
    db.query(
        sql,
        [
            promociones.idEmpresa,
            promociones.idServicio,
            promociones.fecha,
            promociones.descuento
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
    Promociones.lsPromociones = (req, result) => {
        const sql = `SELECT
        servicios.nombre, 
        servicios.descripcion, 
        servicios.costo, 
        servicios.domicilio, 
        servicios.imagen, 
        servicios.estado, 
        promociones.fecha, 
        promociones.descuento, 
        promociones.id, 
        promociones.idServicio, 
        promociones.idEmpresa
    FROM
        promociones
        INNER JOIN
        servicios
        ON 
            promociones.idServicio = servicios.id
        WHERE promociones.idEmpresa=?`
        db.query(sql, [
            req.idEmpresa
        ], (err, res) => {
            if (err) {
                result(err, null)
            } else {
                result(null, res)
            }
        })
    },

    Promociones.actPromociones = async (promociones, result) => {
        var sql = 'UPDATE promociones SET fecha=?, descuento=? WHERE id=?'
        db.query(
            sql,
            [
                promociones.fecha,
                promociones.descuento,
                promociones.id
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

    module.exports = Promociones;