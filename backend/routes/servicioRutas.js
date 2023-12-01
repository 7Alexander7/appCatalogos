
const servicioControl = require('../controllers/servicioControls');

module.exports = (app) => {
    app.post('/api/servicios/nuevo', servicioControl.nuevo)
    app.post('/api/servicios/lsServicios', servicioControl.lsServicios)
    app.post('/api/servicios/actServicio', servicioControl.actServicio)
}