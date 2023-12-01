
const promocionesControl = require('../controllers/promocionesControl');

module.exports = (app) => {
    app.post('/api/promociones/nuevo', promocionesControl.nuevo)
    app.post('/api/promociones/lsPromociones', promocionesControl.lsPromociones)
    app.post('/api/promociones/actPromociones', promocionesControl.actPromociones)
}