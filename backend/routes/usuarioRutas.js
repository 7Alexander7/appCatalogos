const usuarioControl = require('../controllers/usuarioControl');

module.exports = (app) => {
    app.post('/api/usuarios/registroEmpresa', usuarioControl.registroEmpresa)
    app.post('/api/login', usuarioControl.login)
    app.post('/api/usuarios/actPerfil', usuarioControl.actPerfil)
    app.post('/api/usuarios/nuevoUsuario', usuarioControl.nuevoUsuario)
    app.post('/api/usuarios/actPass', usuarioControl.actPass)
    app.post('/api/usuarios/eliUsuario', usuarioControl.eliUsuario)
    app.post('/api/usuarios/listaTecnicos', usuarioControl.listaTecnicos)

    app.get('/api/usuarios/listaUsuarios', usuarioControl.listaUsuarios)
    app.get('/api/usuarios/lsUsuariosAdmin', usuarioControl.listaUsuariosAdmin)
    app.get('/api/usuarios/lsUsuariosTienda', usuarioControl.listaUsuariosTienda)
    app.get('/api/usuarios/lsUsuariosSNEMpresa', usuarioControl.listaUsuariosSNEMpresa)
}