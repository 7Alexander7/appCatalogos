const db = require('../config/config');

const Rol = {};

Rol.buscarRol = (rol, result) => {
    const sql = `SELECT id FROM
	roles
    WHERE roles.rol=?`
    db.query(sql, [rol], (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res[0])
        }
    })
}


module.exports = Rol;