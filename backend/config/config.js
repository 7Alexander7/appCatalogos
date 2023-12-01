const mysql = require('mysql');

const db = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'catalogosbd'
});

db.connect(function(err){
    if(err) throw err;
    console.log("Conexion a la BD exitosa");
}) 

module.exports = db;