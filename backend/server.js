const express = require('express');
const app = express();
const HTTP = require('http');
const server = HTTP.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

/*
IMPORTACION DE RUTAS
*/
const usuariosRoutes = require('./routes/usuarioRutas')
const empresaRoutes = require('./routes/empresaRutas')
const envioRutas = require('./routes/envioRutas')
const subirRutas = require('./routes/subirRutas')
const servicioRutas = require('./routes/servicioRutas')
const productoRutas = require('./routes/productoRutas')
const promociones = require('./routes/promocionesRutas')
const pedidoRutas = require('./routes/pedidoRutas')
const pedidodtRutas = require('./routes/pedidodtRutas')
const reporteRutas = require('./routes/reporteRutas')

const port = process.env.PORT || 3000;

app.set('port', port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors());
app.use(passport.initialize())
app.use(passport.session())

//Ruta para acceder a las imagenes
app.use(express.static('uploads'))

require('./config/passport')(passport)

app.disable('x-powered-by');


/*
LLAMADO DE RUTAS
*/
usuariosRoutes(app);
empresaRoutes(app)
envioRutas(app)
subirRutas(app)
servicioRutas(app)
pedidoRutas(app)
pedidodtRutas(app)
reporteRutas(app)
productoRutas(app)
promociones(app)
app.use('/uploads', express.static('uploads'));

server.listen(3000, '192.168.100.31' || 'localhost', function () {
    console.log("Servidor funcionando PID: " + process.pid + " en el puerto " + port)
});


//manejo de rutas de acceso

app.get('/', (req, res) => {
    res.send('Ruta raiz del Backend');
})


//manejo de errores

app.use((err, req, res, next) => {
    //200 - significa respuesta exitosa
    //400 - significa que la url no existe
    //500 - significa que ha existido un error interno en el servidor 
    console.log(err)
    res.status(err.status || 500).send(err.stack);
});