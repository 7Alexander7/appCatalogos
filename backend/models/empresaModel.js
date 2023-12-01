const db = require('../config/config');

const Empresa = {};

Empresa.nueva = async (empresa, result) => {

    var sql = 'INSERT INTO empresas(ruc, razonsocial, nombrecomercial, telefonoEmpresa, direccion, activo) VALUES(?,?,?,?,?,?)'
    db.query(
        sql,
        [
            empresa.ruc,
            empresa.razonSocial,
            empresa.nombreComercial,
            empresa.telefonoEmpresa,
            empresa.direccionEmpresa,
            'FALSE'
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
    Empresa.nuevaImg = async (empresa, result) => {

        var sql = 'INSERT INTO empresas(ruc, razonsocial, nombrecomercial, telefonoEmpresa, direccion, activo, imagen) VALUES(?,?,?,?,?,?,?)'
        db.query(
            sql,
            [
                empresa.ruc,
                empresa.razonSocial,
                empresa.nombreComercial,
                empresa.telefono,
                empresa.direccion,
                'TRUE',
                empresa.nombreImagen
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
    Empresa.obtenerDatos = (req, result) => {
        const sql = `SELECT
        empresas.*
    FROM
        empresas
        INNER JOIN
        usuarios
        ON 
            empresas.id = usuarios.idEmpresa
    WHERE usuarios.id=?`
        db.query(sql, [req], (err, res) => {
            if (err) {
                result(err, null)
            } else {
                result(null, res[0])
            }
        })
    },
    Empresa.lsEmpresaActivada = (req, result) => {
        const sql = `SELECT
        empresas.*
    FROM
        empresas
    WHERE activo='TRUE'`
        db.query(sql, (err, res) => {
            if (err) {
                result(err, null)
            } else {
                result(null, res)
            }
        })
    },
    Empresa.lsEmpresaInactiva = (req, result) => {
        const sql = `SELECT
        empresas.*
    FROM
        empresas
    WHERE activo='FALSE'`
        db.query(sql, (err, res) => {
            if (err) {
                result(err, null)
            } else {
                result(null, res)
            }
        })
    },
    Empresa.lsEmpresaAsignadas = (req, result) => {
        const sql = `SELECT
        *
    FROM
        empresas
        INNER JOIN
        usuarios
        ON 
            empresas.id = usuarios.idEmpresa`
        db.query(sql, (err, res) => {
            if (err) {
                result(err, null)
            } else {
                result(null, res)
            }
        })
    },
    Empresa.lsEmpresaNoAsignadas = (req, result) => {
        const sql = `SELECT
        empresas.id,	 
        empresas.ruc, 
        empresas.razonsocial, 
        empresas.nombrecomercial, 
        empresas.telefonoEmpresa, 
        empresas.direccion, 
        empresas.activo, 
        empresas.imagen
    FROM
        empresas
        LEFT JOIN
        usuarios
        ON 
            empresas.id = usuarios.idEmpresa
    WHERE
        usuarios.idEmpresa IS NULL`
        db.query(sql, (err, res) => {
            if (err) {
                result(err, null)
            } else {
                result(null, res)
            }
        })
    },

    Empresa.actualizarEmpresa = async (empresa, result) => {
        var sql = 'UPDATE empresas SET ruc=?, razonsocial=?, nombrecomercial=?, telefonoEmpresa=?, direccion=? WHERE id=?'
        db.query(
            sql,
            [
                empresa.ruc,
                empresa.razonsocial,
                empresa.nombrecomercial,
                empresa.telefonoEmpresa,
                empresa.direccion,
                empresa.id
            ],
            (err, res) => {
                if (err) {
                    console.log(err)
                    result(err, null)
                } else {
                    result(null, empresa)
                }
            }
        )
    },

    Empresa.actImagen = async (datos, result) => {
        var sql = 'UPDATE empresas SET imagen=? WHERE id=?'
        db.query(
            sql,
            [
                datos.imagen,
                datos.idEmpresa
            ],
            (err, res) => {
                if (err) {
                    console.log(err)
                    result(err, null)
                } else {
                    result(null, datos)
                }
            }
        )
    },

    Empresa.estado = async (datos, result) => {
        var sql = 'UPDATE empresas SET activo=? WHERE id=?'
        db.query(
            sql,
            [
                datos.estado,
                datos.id
            ],
            (err, res) => {
                if (err) {
                    console.log(err)
                    result(err, null)
                } else {
                    result(null, datos)
                }
            }
        )
    }

    Empresa.asignacion = async (datos, result) => {
        var sql = 'UPDATE usuarios SET idEmpresa=? WHERE id=?'
        db.query(
            sql,
            [
                datos.idEmpresa,
                datos.idUsuario
            ],
            (err, res) => {
                if (err) {
                    console.log(err)
                    result(err, null)
                } else {
                    result(null, datos)
                }
            }
        )
    }

module.exports = Empresa;