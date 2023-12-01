
const Usuario = require('../models/usuarioModel');
const Empresa = require('../models/empresaModel');
const Roles = require('../models/rolModel');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Rol = require('../models/rolModel');

module.exports = {

    login(req, res) {

        const usuario = req.body.usuario;
        const clave = req.body.clave;

        Usuario.FindByUsername(usuario, async (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Hubo un error",
                    error: err
                })
            }

            if (!data) {
                return res.status(401).json({
                    success: false,
                    mensaje: "El Usuario no fue encontrado",
                })
            }

            const isPasswordValid = await bcrypt.compare(clave, data.pass)

            if (isPasswordValid) {

                const dataJwt = {
                    idUsuario: data.id,
                    rol: data.rol,
                    cedula: data.cedula,
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    email: data.email,
                    telefono: data.telefono,
                    idEmpresa:data.idEmpresa
                }
                console.log(dataJwt)
                return res.status(201).json({
                    success: true,
                    mensaje: "El Usuario fue autenticado con exito",
                    data: dataJwt
                })
            } else {
                return res.status(401).json({
                    success: false,
                    mensaje: "El Usuario o la contraseña son incorrectas"
                })
            }
        })

    },

    registroEmpresa(req, res) {
        var registro = req.body;
        console.log("registro de empresa")
        Rol.buscarRol('TIENDA', (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Hubo un error",
                    error: err
                })
            }
            registro['idRol'] = data.id
            Empresa.nueva(registro, (err, data2) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        mensaje: "Hubo un error",
                        error: err
                    })
                }
                registro['idEmpresa'] = data2

                Usuario.registro(registro, (err, data3) => {
                    if (err) {
                        return res.status(501).json({
                            success: false,
                            mensaje: "Hubo un error",
                            error: err
                        })
                    }
                    registro['idUsuario'] = data3
                    return res.status(201).json({
                        success: true,
                        mensaje: "la empresa y usuario se han registrado correctamente",
                        data: registro
                    })
                })
            })
        })
    },

    eliUsuario(req, res) {
        Usuario.eliUsuario(req.body, (err, data) => {
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

    actPerfil(req, res) {
        Usuario.actPerfil(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                mensaje: "Perfil actualizado correctamente",
                data: data
            })
        })
    },
    actPass(req, res) {
        Usuario.FindByUsername(req.body.email, async (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Hubo un error",
                    error: err
                })
            }

            if (!data) {
                return res.status(401).json({
                    success: false,
                    mensaje: "El Usuario no fue encontrado",
                })
            }

            const isPasswordValid = await bcrypt.compare(req.body.passOriginal, data.pass)

            if (isPasswordValid) {
                Usuario.actPass(req.body, (err, data) => {
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
            } else {
                return res.status(401).json({
                    success: false,
                    mensaje: "El Usuario o la contraseña son incorrectas"
                })
            }
        })
    },

    listaUsuarios(req, res) {
        console.log('listaUsuarios')
        Usuario.listaUsuarios(req.body, (err, data) => {
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
    listaUsuariosAdmin(req, res) {
        console.log('listaUsuariosAdmin')
        Usuario.listaUsuariosAdmin(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                })
            }
            return res.status(201).json(data)
        })
    },    
    listaTecnicos(req, res) {
        console.log('listaUsuariosAdmin')
        Usuario.listaTecnicos(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                })
            }
            return res.status(201).json(data)
        })
    },
    listaUsuariosTienda(req, res) {
        console.log('listaUsuariosTienda')
        Usuario.listaUsuariosTienda(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                })
            }
            return res.status(201).json(data)
        })
    },
    listaUsuariosSNEMpresa(req, res) {
        Usuario.listaUsuariosSNEMpresa(req.body, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Ha existido un error",
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                mensaje: "",
                data: data
            })
        })
    },

    nuevoUsuario(req, res) {
        var registro = req.body;
        console.log("nuevo usuario")
        Rol.buscarRol(registro.rol, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    mensaje: "Hubo un error",
                    error: err
                })
            }
            registro['idRol'] = data.id

            Usuario.registro(registro, (err, data2) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        mensaje: "Hubo un error",
                        error: err
                    })
                }

                registro['idUsuario'] = data2
                return res.status(201).json({
                    success: true,
                    mensaje: "El usuario se ha almacenado correctamente",
                    data: registro
                })
            })
        })
    },

}
