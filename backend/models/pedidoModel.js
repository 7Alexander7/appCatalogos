const db = require('../config/config');

const Pedido = {};

Pedido.asignacion = (objeto, result) => {
    const sql = 'UPDATE ubicaciones SET idRepartidor=? WHERE idPedido=?';
    db.query(sql, [objeto.idUsuario, objeto.idPedido], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            const sql = 'UPDATE pedidos SET estado="ASIGNADO" WHERE id=?';
            db.query(sql, [objeto.idPedido], (err, res) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                }
            });
            result(null, objeto);
        }
    });
};

Pedido.notificaciones = (objeto, result) => {
    const sql = 'SELECT * FROM pedidos WHERE idEmpresa = ? AND estado = ? AND domicilio=?';
    db.query(sql, [objeto.idEmpresa, 'GENERADO', 'SI'], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            if (res.length) {
                result(null, res);
            } else {
                result({ message: 'Pedido no encontrado' }, null);
            }
        }
    });
};

Pedido.nuevoPedido = async (pedido, result) => {    
    var now = new Date();
    var fecha = now.toISOString().slice(0, 10);
    var hora = now.toTimeString().slice(0, 8);
    const sql = 'INSERT INTO pedidos (idUsuario, idEmpresa, fecha, hora, subtotal, iva, total, domicilio, comentario, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [
        pedido.idUsuario,
        pedido.idEmpresa,
        fecha,
        hora,
        Number(pedido.subtotal).toFixed(3),
        Number(pedido.iva).toFixed(3),
        pedido.total,
        pedido.domicilio,
        '-',
        pedido.estado
    ], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            const idPedido = res.insertId
            const detalles = JSON.parse(pedido.detalle)
            detalles.forEach(det => {
                const sqlDetalle = 'INSERT INTO pedidosdt (idPedido, idServicio, cantidad, precio) VALUES (?, ?, ?, ?)';
                let precio = Number(det.costo.replace("Precio: $", "")).toFixed(3)
                db.query(sqlDetalle, [res.insertId, det.idServicio, det.cantidad, precio], (errDetail, resDetail) => {
                    if (errDetail) {
                        console.log(errDetail)
                    }
                });
            });
            if(pedido.domicilio == "SI") {
                const sqlUbicaciones = 'INSERT INTO ubicaciones (idPedido, latDestino, lngDestino, referencia) VALUES (?,?,?,?)';
                db.query(sqlUbicaciones, [
                    idPedido,
                    Number(pedido.latDestino).toFixed(5),
                    Number(pedido.lngDestino).toFixed(5),
                    pedido.referencia
                ], (err, res) => {
                    if (err) {
                        console.log(err);
                        result(err, null);
                    }
                });
                result(null, res.insertId)
            } else {
                result(null, res.insertId)
            }            
        }
    });
};

Pedido.datosTecnico = (objeto, result) => {
    const sql = `SELECT
	usuarios.nombres, 
	usuarios.apellidos, 
	usuarios.cedula, 
	usuarios.email, 
	usuarios.telefono
FROM
	ubicaciones
	INNER JOIN
	usuarios
	ON 
		ubicaciones.idRepartidor = usuarios.id
		WHERE ubicaciones.idPedido=?`;
    db.query(sql, [objeto.idPedido], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            if (res.length) {
                result(null, res);
            } else {
                result({ message: 'Pedido no encontrado' }, null);
            }
        }
    });
};

Pedido.listaPedidoIdEmpresaProc = (objeto, result) => {
    const sql = `SELECT
	pedidos.idUsuario, 
	pedidos.id, 
	pedidos.idEmpresa, 
	DATE_FORMAT(fecha,'%Y-%m-%d') AS fecha, 
	pedidos.hora, 
	pedidos.subtotal, 
	pedidos.iva, 
	pedidos.total, 
	pedidos.domicilio, 
	pedidos.comentario, 
	pedidos.estado, 
	usuarios.nombres, 
	usuarios.apellidos, 
	usuarios.cedula, 
	usuarios.email, 
	usuarios.telefono
FROM
	pedidos
	INNER JOIN
	usuarios
	ON 
		pedidos.idUsuario = usuarios.id 
        WHERE pedidos.idEmpresa = ? AND pedidos.estado=?`;
    db.query(sql, [objeto.idEmpresa, objeto.estado], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            if (res.length) {
                result(null, res);
            } else {
                result({ message: 'Pedido no encontrado' }, null);
            }
        }
    });
};

Pedido.listaPedidoIdEmpresaDom = (objeto, result) => {
    const sql = `SELECT
	pedidos.idUsuario, 
	pedidos.id, 
	pedidos.idEmpresa, 
	DATE_FORMAT(fecha,'%Y-%m-%d') AS fecha, 
	pedidos.hora, 
	pedidos.subtotal, 
	pedidos.iva, 
	pedidos.total, 
	pedidos.domicilio, 
	pedidos.comentario, 
	pedidos.estado, 
	usuarios.nombres, 
	usuarios.apellidos, 
	usuarios.cedula, 
	usuarios.email, 
	usuarios.telefono, 
	ubicaciones.latDestino, 
	ubicaciones.lngDestino,
    ubicaciones.idRepartidor
FROM
	pedidos
	INNER JOIN
	usuarios
	ON 
		pedidos.idUsuario = usuarios.id
	INNER JOIN
	ubicaciones
	ON 
		pedidos.id = ubicaciones.idPedido  
        WHERE pedidos.idEmpresa = ? AND pedidos.estado=?`;
    db.query(sql, [objeto.idEmpresa, objeto.estado], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            if (res.length) {
                result(null, res);
            } else {
                result({ message: 'Pedido no encontrado' }, null);
            }
        }
    });
};

Pedido.actualizarPedido = async (pedido, result) => {
    const sql = 'UPDATE pedidos SET idUsuario=?, idEmpresa=?, fecha=?, hora=?, subtotal=?, iva=?, total=?, domicilio=?, comentario=?, estado=? WHERE id=?';
    db.query(sql, [
        pedido.idUsuario,
        pedido.idEmpresa,
        pedido.fecha,
        pedido.hora,
        pedido.subtotal,
        pedido.iva,
        pedido.total,
        pedido.domicilio,
        pedido.comentario,
        pedido.estado,
        pedido.id
    ], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, pedido);
        }
    });
};

Pedido.eliminarPedido = (pedidoId, result) => {
    const sql = 'DELETE FROM pedidos WHERE id = ?';
    db.query(sql, [pedidoId], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, { message: 'Pedido eliminado correctamente' });
        }
    });
};

Pedido.listaPedidos = (req, result) => {
    const sql = 'SELECT * FROM pedidos';
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Pedido.listaPedidosCliente = (idCliente, result) => {
    const sql = `SELECT
    pedidos.id, 
    pedidos.idUsuario, 
    pedidos.idEmpresa, 
    DATE_FORMAT(pedidos.fecha, "%Y-%m-%d") as fecha, 
    pedidos.hora, 
    pedidos.subtotal, 
    pedidos.iva, 
    pedidos.total, 
    pedidos.domicilio, 
    pedidos.comentario, 
    pedidos.estado, 
    empresas.nombrecomercial as empresa, 
    GROUP_CONCAT(servicios.nombre SEPARATOR ', ') as servicio, 
	empresas.imagen
    FROM
    pedidos
    INNER JOIN
    pedidosdt
    ON 
    pedidos.id = pedidosdt.idPedido
    INNER JOIN
    empresas
    ON 
    pedidos.idEmpresa = empresas.id
    INNER JOIN
    servicios
    ON 
    pedidosdt.idServicio = servicios.id    
    WHERE pedidos.idUsuario = ?
    GROUP BY
    pedidos.id, 
    pedidos.idUsuario, 
    pedidos.idEmpresa, 
    pedidos.fecha, 
    pedidos.hora, 
    pedidos.subtotal, 
    pedidos.iva, 
    pedidos.total, 
    pedidos.domicilio, 
    pedidos.comentario, 
    pedidos.estado, 
    empresas.nombrecomercial`;
    db.query(sql, [idCliente], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Pedido;