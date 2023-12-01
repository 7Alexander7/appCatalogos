const db = require('../config/config');
const bcrypt = require('bcryptjs')

const Usuario = {};

Usuario.actPerfil = async (usuario, result) => {

    var sql = 'UPDATE usuarios SET cedula=?, nombres=?, apellidos=?, email=?, telefono=? WHERE id=?'
    db.query(
        sql,
        [
            usuario.cedula,
            usuario.nombre,
            usuario.apellido,
            usuario.email,
            usuario.telefono,
            usuario.idUsuario
        ],
        (err, res) => {
            if (err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, usuario)
            }
        }
    )
}

Usuario.eliUsuario = async (usuario, result) => {

    var sql = 'DELETE FROM usuarios WHERE id =?'
    db.query(
        sql,
        [
            usuario.id
        ],
        (err, res) => {
            if (err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, usuario)
            }
        }
    )
}

Usuario.listaUsuarios = (req, result) => {
    const sql = `SELECT * FROM usuarios`
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Usuario.listaTecnicos = (obj, result) => {
    const sql = `SELECT
    usuarios.id, 
	usuarios.cedula, 
	usuarios.nombres, 
	usuarios.apellidos, 
	usuarios.email, 
	usuarios.telefono, 
	usuarios.idRol,
    usuarios.idEmpresa,  
	roles.rol
FROM
	usuarios
	INNER JOIN
	roles
	ON 
		usuarios.idRol = roles.id
WHERE usuarios.idEmpresa=? AND roles.rol="TECNICO"`
    db.query(sql, [obj.idEmpresa], (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Usuario.listaUsuariosTienda = (req, result) => {
    const sql = `SELECT
    usuarios.id, 
	usuarios.cedula, 
	usuarios.nombres, 
	usuarios.apellidos, 
	usuarios.email, 
	usuarios.telefono, 
	usuarios.idRol,
    usuarios.idEmpresa,  
	roles.rol
FROM
	usuarios
	INNER JOIN
	roles
	ON 
		usuarios.idRol = roles.id
WHERE roles.rol = "TIENDA" OR roles.rol="TECNICO"`
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Usuario.listaUsuariosAdmin = (req, result) => {
    const sql = `SELECT
    usuarios.id, 
	usuarios.cedula, 
	usuarios.nombres, 
	usuarios.apellidos, 
	usuarios.email, 
	usuarios.telefono, 
	usuarios.idRol,
    usuarios.idEmpresa, 
	roles.rol
FROM
	usuarios
	INNER JOIN
	roles
	ON 
		usuarios.idRol = roles.id
WHERE roles.rol="ADMINISTRADOR"`
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Usuario.listaUsuariosSNEMpresa = (req, result) => {
    const sql = `SELECT
    usuarios.id, 
	usuarios.cedula, 
	usuarios.nombres, 
	usuarios.apellidos, 
	usuarios.email, 
	usuarios.telefono
FROM
	usuarios
WHERE usuarios.idEmpresa IS NULL AND usuarios.idRol!=1 AND usuarios.idRol!=4`
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Usuario.FindByUsername = (email, result) => {
    const sql = `SELECT
	usuarios.id, 
	usuarios.cedula, 
	usuarios.nombres, 
	usuarios.apellidos, 
	usuarios.email, 
	usuarios.pass, 
	usuarios.telefono, 
    usuarios.idEmpresa,
	roles.rol
FROM
	usuarios
	INNER JOIN
	roles
	ON 
		usuarios.idRol = roles.id
    WHERE usuarios.email=?`
    db.query(sql, [email], (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
        } else {
            //console.log("Usuario:", res[0])
            result(null, res[0])
        }
    })
}

Usuario.registro = async (usuario, result) => {

    const hash = await bcrypt.hash(usuario.clave, 10);

    var sql = 'INSERT INTO usuarios(cedula, nombres, apellidos, email, pass, telefono, idRol, idEmpresa) VALUES(?,?,?,?,?,?,?,?)'
    db.query(
        sql,
        [
            usuario.cedula,
            usuario.nombre,
            usuario.apellido,
            usuario.email,
            hash,
            usuario.telefono,
            usuario.idRol,
            usuario.idEmpresa
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
}

Usuario.actPass = async (usuario, result) => {
    const hash = await bcrypt.hash(usuario.pass, 10);
    var sql = 'UPDATE usuarios SET pass=? WHERE id=?'
    db.query(
        sql,
        [
            hash,
            usuario.idUsuario
        ],
        (err, res) => {
            if (err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, usuario)
            }
        }
    )
}

Usuario.actPassRecuperacion = async (usuario, result) => {
    const hash = await bcrypt.hash(usuario.clave, 10);
    var sql = 'UPDATE usuarios SET pass=? WHERE email=?'
    db.query(
        sql,
        [
            hash,
            usuario.email
        ],
        (err, res) => {
            if (err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, usuario)
            }
        }
    )
}

module.exports = Usuario;