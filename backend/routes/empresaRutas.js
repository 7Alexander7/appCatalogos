
const empresaControl = require('../controllers/empresaControl');

module.exports = (app) => {
    app.post('/api/empresa/obtenerDatos', empresaControl.obtenerDatos)
    app.post('/api/empresa/actualizarDatos', empresaControl.actualizarDatos)
    app.post('/api/empresa/actImagen', empresaControl.actImagen)
    app.post('/api/empresa/nuevaImg', empresaControl.nuevaImg)
    app.post('/api/empresa/estado', empresaControl.estado)
    app.post('/api/empresa/asignacion', empresaControl.asignacion) 

    app.get('/api/empresa/lsEmpresaActivada', empresaControl.lsEmpresaActivada)
    app.get('/api/empresa/lsEmpresaInactiva', empresaControl.lsEmpresaInactiva)
    app.get('/api/empresa/lsEmpresaAsignadas', empresaControl.lsEmpresaAsignadas)
    app.get('/api/empresa/lsEmpresasNoAsignadas', empresaControl.lsEmpresaNoAsignadas)
}