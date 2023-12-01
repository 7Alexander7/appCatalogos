
const Usuario = require('../models/usuarioModel');
const nodemailer = require('nodemailer');

const servidorCorreo = 'hotmail' //gmail, hotmail, smtp
const emailParaEnvio = 'ejemplo@hotmail.com'
const passEmailParaEnvio = 'password123'


// Configurar el transporte
const transporter = nodemailer.createTransport({
    service: servidorCorreo,//gmail, hotmail, smtp
    auth: {
        user: emailParaEnvio,
        pass: passEmailParaEnvio
    }
});

// Definir los detalles del correo electrónico


module.exports = {
    recuperarPass(req, res) {
        var obj = {
            email: req.body.email,
            clave: 'catalogos123'
        }

        const mailOptions = {
            from: emailParaEnvio,
            to: obj.email,
            subject: 'AppCatalogos Recuperación de Contraseña',
            html: 'Hola, le notificamos que ha sido activada la recuperación de contraseña en su cuenta,<br>'+
             'para poder acceder a la misma use provicionalmente esta: catalogos123 <br>'+
             'RECUERDE al momneto de acceder a su cuenta nuevamente cambiar <br>'+
             'la contraseña provicional por una propia en el apartado de cambio de contraseña en perfil'
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Correo electrónico enviado: ' + info.response);
            }
        });

        Usuario.actPassRecuperacion(obj, (err, data) => {
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
}