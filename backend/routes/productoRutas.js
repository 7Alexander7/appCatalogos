
const productoControl = require('../controllers/productoControl');

module.exports = (app) => {
    app.post('/api/productos/nuevo', productoControl.nuevo)
    app.post('/api/productos/lsProductos', productoControl.lsProductos)
    app.post('/api/productos/actProducto', productoControl.actProducto)
}