const db = require('../config/config');

const PedidoDt = {};

PedidoDt.nuevoPedidoDetalle = (pedidoDetalle, result) => {
    const sql = 'INSERT INTO pedidosdt (idPedido, idServicio, cantidad, precio) VALUES (?, ?, ?, ?)';
    db.query(sql, [
        pedidoDetalle.idPedido,
        pedidoDetalle.idServicio,
        pedidoDetalle.cantidad,
        pedidoDetalle.precio
    ], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

PedidoDt.listaPedidoDetalleIdPedido = (objeto, result) => {
    const sql = `SELECT
	servicios.nombre, 
	servicios.descripcion, 
	servicios.costo, 
	servicios.domicilio, 
	servicios.imagen, 
	pedidosdt.cantidad, 
	pedidosdt.id, 
	pedidosdt.idPedido, 
	pedidosdt.idServicio, 
	pedidosdt.precio
FROM
	pedidosdt
	INNER JOIN
	servicios
	ON 
		pedidosdt.idServicio = servicios.id
WHERE
	idPedido = ?`;
    db.query(sql, [objeto.idPedido], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            if (res.length) {
                result(null, res);
            } else {
                result({ message: 'Detalle de pedido no encontrado' }, null);
            }
        }
    });
};

PedidoDt.actualizarPedidoDetalle = (pedidoDetalle, result) => {
    const sql = 'UPDATE pedidosdt SET idPedido=?, idServicio=?, cantidad=?, precio=? WHERE idDetalle=?';
    db.query(sql, [
        pedidoDetalle.idPedido,
        pedidoDetalle.idServicio,
        pedidoDetalle.cantidad,
        pedidoDetalle.precio,
        pedidoDetalle.idDetalle
    ], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, pedidoDetalle);
        }
    });
};

PedidoDt.eliminarPedidoDetalle = (detalleId, result) => {
    const sql = 'DELETE FROM pedidosdt WHERE idDetalle = ?';
    db.query(sql, [detalleId], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, { message: 'Detalle de pedido eliminado correctamente' });
        }
    });
};

PedidoDt.listaPedidosDetalle = (req, result) => {
    const sql = 'SELECT * FROM pedidosdt';
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = PedidoDt;