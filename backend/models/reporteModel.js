const db = require('../config/config');

const Reporte = {};

Reporte.rpVentasAdminP = ( result) => {
    const sql = `SELECT
	COUNT(idEmpresa) as pedidos,
	SUM(pedidos.subtotal)as subtotal, 
	SUM(pedidos.iva)as iva, 
	SUM(pedidos.total)as total, 
	empresas.nombrecomercial as empresa
FROM
	pedidos
	INNER JOIN
	empresas
	ON 
		pedidos.idEmpresa = empresas.id
GROUP BY pedidos.idEmpresa`;
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Reporte.rpVentasTiendaPieDomicilio = (objeto, result) => {
    const sql = `SELECT
    domicilio,
    COUNT(*) AS cantidad,
		SUM(total) as total
FROM
    pedidos
WHERE idEmpresa=?
GROUP BY
    domicilio;`;
    db.query(sql,[objeto.idEmpresa], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Reporte.rpVentasTiendaPieServicio = (objeto, result) => {
    const sql = `SELECT
	servicios.nombre, 
	COUNT(pedidosdt.cantidad) as cantidad
FROM
	pedidos
	INNER JOIN
	pedidosdt
	ON 
		pedidos.id = pedidosdt.idPedido
	INNER JOIN
	servicios
	ON 
		pedidosdt.idServicio = servicios.id
	WHERE pedidos.idEmpresa=?
	GROUP BY pedidosdt.idServicio`;
    db.query(sql,[objeto.idEmpresa], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Reporte.rpVentasTiendaListaC = (objeto, result) => {
    console.log(objeto)
    const sql = `SELECT
    COUNT(pedidos.id) as cantidad,
        usuarios.nombres, 
        usuarios.apellidos, 
        usuarios.cedula, 
        usuarios.email, 
        usuarios.telefono, 
        sum(pedidos.total)as total
    FROM
        pedidos
        INNER JOIN
        usuarios
        ON 
            pedidos.idUsuario = usuarios.id
        WHERE pedidos.idEmpresa=?`;
    db.query(sql,[objeto.idEmpresa], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Reporte.rpVentasTiendaListaS = (objeto, result) => {
    console.log(objeto)
    const sql = `SELECT
	pedidosdt.cantidad, 
	pedidosdt.precio, 
	servicios.nombre, 
	servicios.descripcion, 
	DATE_FORMAT(fecha,'%Y-%m-%d') AS fecha, 
	pedidos.hora, 
	pedidos.id, 
	usuarios.nombres, 
	usuarios.apellidos, 
	usuarios.cedula, 
	usuarios.email, 
	usuarios.telefono, 
	pedidos.subtotal, 
	pedidos.iva, 
	pedidos.total, 
	pedidos.comentario, 
	pedidos.estado, 
	pedidos.domicilio, 
	pedidosdt.idServicio, 
	servicios.imagen, 
	servicios.domicilio, 
	servicios.costo
FROM
	pedidos
	INNER JOIN
	pedidosdt
	ON 
		pedidos.id = pedidosdt.idPedido
	INNER JOIN
	servicios
	ON 
		pedidosdt.idServicio = servicios.id
	INNER JOIN
	usuarios
	ON 
		pedidos.idUsuario = usuarios.id
		WHERE pedidos.idEmpresa=?`;
    db.query(sql,[objeto.idEmpresa], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Reporte.rpVentasTiendaListaP = (objeto, result) => {
    console.log(objeto)
    const sql = `SELECT
	pedidos.id, 
	pedidos.idUsuario, 
	DATE_FORMAT(fecha,'%Y-%m-%d') AS fecha, 
	pedidos.idEmpresa, 
	pedidos.hora, 
	pedidos.subtotal, 
	pedidos.iva, 
	pedidos.total, 
	pedidos.domicilio, 
	pedidos.estado, 
	pedidos.comentario, 
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
WHERE
	pedidos.idEmpresa = ? AND
	YEAR(pedidos.fecha) = YEAR(CURDATE());`;
    db.query(sql,[objeto.idEmpresa], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Reporte.rpVentasTienda = (objeto, result) => {
    const sql = `SELECT
    idEmpresa,
    MONTH(fecha) AS mes,
    YEAR(fecha) AS año,
    COUNT(id) AS pedidos,
    SUM(total) AS total,
		SUM(iva)AS iva,
		SUM(subtotal)AS subtotal
FROM
    pedidos
WHERE idEmpresa = ?
GROUP BY
    idEmpresa, MONTH(fecha), YEAR(fecha)
ORDER BY
    idEmpresa, YEAR(fecha), MONTH(fecha);`;
    db.query(sql,[objeto.idEmpresa], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Reporte.rpVentasTiendaServicios = (objeto, result) => {
    const sql = `SELECT
	ps.idServicio, 
	MONTH(p.fecha) AS mes, 
	YEAR(p.fecha) AS 'año', 
	SUM(ps.cantidad) AS cantidad, 
	SUM(ps.cantidad * ps.precio) AS total, 
	servicios.nombre
FROM
	pedidos AS p
	INNER JOIN
	pedidosdt AS ps
	ON 
		p.id = ps.idPedido
	INNER JOIN
	servicios
	ON 
		ps.idServicio = servicios.id
WHERE
	p.idEmpresa = ?
GROUP BY
	ps.idServicio, 
	MONTH(p.fecha), 
	YEAR(p.fecha)
ORDER BY
	ps.idServicio ASC, 
	YEAR(p.fecha) ASC, 
	MONTH(p.fecha) ASC;`;
    db.query(sql,[objeto.idEmpresa], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


module.exports = Reporte;