const db = require('../config/config');

const Servicio = {};

Servicio.nuevo = async (servicio, result) => {

    var sql = 'INSERT INTO servicios(nombre, descripcion, costo, domicilio, imagen, estado, idEmpresa) VALUES(?,?,?,?,?,?,?)'
    db.query(
        sql,
        [
            servicio.nombre,
            servicio.descripcion,
            servicio.costo,
            servicio.domicilio,
            servicio.nombreImagen,
            "ACTIVO",
            servicio.idEmpresa
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
    Servicio.lsServicios = (req, result) => {
        const sql = `SELECT 
        servicios.id,
        servicios.nombre,
        servicios.descripcion,
        servicios.costo,
        servicios.domicilio,
        servicios.imagen,
        servicios.estado,
        servicios.idEmpresa,
        promociones.descuento,
        CASE 
            WHEN promociones.descuento IS NOT NULL THEN servicios.costo * (1 - (promociones.descuento / 100))
            ELSE servicios.costo
        END AS costoConDescuento
        FROM servicios
        LEFT JOIN promociones ON servicios.id = promociones.idServicio AND servicios.idEmpresa = promociones.idEmpresa
        WHERE servicios.idEmpresa = ? AND servicios.estado = ?`
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

    Servicio.actServicio = async (servicio, result) => {
        var sql = 'UPDATE servicios SET nombre=?, descripcion=?, costo=?, domicilio=?, imagen=?, estado=? WHERE id=?'
        db.query(
            sql,
            [
                servicio.nombre,
                servicio.descripcion,
                servicio.costo,
                servicio.domicilio,
                servicio.imagen,
                servicio.estado,
                servicio.id
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

    module.exports = Servicio;