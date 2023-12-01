const envioControl = require('../controllers/envioControl');

module.exports = (app) => {
    app.post('/api/usuarios/recuperarPass', envioControl.recuperarPass)
}