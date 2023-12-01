/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100425
 Source Host           : localhost:3306
 Source Schema         : catalogosbd

 Target Server Type    : MySQL
 Target Server Version : 100425
 File Encoding         : 65001

 Date: 05/10/2023 06:56:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comentarios
-- ----------------------------
DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE `comentarios`  (
  `id` int NOT NULL,
  `idPedido` int NULL DEFAULT NULL,
  `comentarioCliente` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `comentarioTecnico` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comentarios
-- ----------------------------

-- ----------------------------
-- Table structure for empresas
-- ----------------------------
DROP TABLE IF EXISTS `empresas`;
CREATE TABLE `empresas`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ruc` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `razonsocial` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `nombrecomercial` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `telefonoEmpresa` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `direccion` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `activo` varchar(5) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `imagen` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of empresas
-- ----------------------------
INSERT INTO `empresas` VALUES (1, '1719513457001', 'STE', 'STE', '2221452', 'Av. América y Uruguay, Sector centro', 'TRUE', 'empresaste.png');
INSERT INTO `empresas` VALUES (2, '1725270225001', 'Compu Space', 'Compu Space', '099815122', 'Av. Eloy alfaro y 12 de Marzo', 'TRUE', 'empresacompuspace.jpeg');
INSERT INTO `empresas` VALUES (3, '111111', 'clinicadelalma', 'erasoft', '2607038', 'conocoto', '', NULL);

-- ----------------------------
-- Table structure for pedidos
-- ----------------------------
DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE `pedidos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NULL DEFAULT NULL,
  `idEmpresa` int NULL DEFAULT NULL,
  `fecha` date NULL DEFAULT NULL,
  `hora` time NULL DEFAULT NULL,
  `subtotal` double(11, 3) NULL DEFAULT NULL,
  `iva` double(11, 3) NULL DEFAULT NULL,
  `total` double(11, 3) NULL DEFAULT NULL,
  `domicilio` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `comentario` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `estado` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fkUsuarioPedido`(`idUsuario` ASC) USING BTREE,
  INDEX `fkEmpresaPedido`(`idEmpresa` ASC) USING BTREE,
  CONSTRAINT `fkEmpresaPedido` FOREIGN KEY (`idEmpresa`) REFERENCES `empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkUsuarioPedido` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pedidos
-- ----------------------------
INSERT INTO `pedidos` VALUES (1, 3, 3, '2023-07-28', '10:50:57', 2.000, 1.000, 15.000, 'SI', '-', 'GENERADO');
INSERT INTO `pedidos` VALUES (2, 4, 3, '2023-07-29', '10:50:57', 2.000, 1.000, 15.000, 'SI', '-', 'GENERADO');
INSERT INTO `pedidos` VALUES (12, 4, 2, '2023-08-01', '03:35:03', 4.911, 0.589, 5.500, 'SI', '-', 'GENERADO');

-- ----------------------------
-- Table structure for pedidosdt
-- ----------------------------
DROP TABLE IF EXISTS `pedidosdt`;
CREATE TABLE `pedidosdt`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NULL DEFAULT NULL,
  `idServicio` int NULL DEFAULT NULL,
  `cantidad` int NULL DEFAULT NULL,
  `precio` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fkPedidoDetalle`(`idPedido` ASC) USING BTREE,
  INDEX `fkServicioDetalle`(`idServicio` ASC) USING BTREE,
  CONSTRAINT `fkPedidoDetalle` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkServicioDetalle` FOREIGN KEY (`idServicio`) REFERENCES `servicios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pedidosdt
-- ----------------------------
INSERT INTO `pedidosdt` VALUES (1, 1, 2, 2, 33);
INSERT INTO `pedidosdt` VALUES (2, 12, 3, 2, 22);
INSERT INTO `pedidosdt` VALUES (10, 12, 4, 1, 6);

-- ----------------------------
-- Table structure for productos
-- ----------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `costo` double(11, 2) NULL DEFAULT NULL,
  `domicilio` double(11, 2) NULL DEFAULT NULL,
  `imagen` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `estado` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `idEmpresa` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of productos
-- ----------------------------
INSERT INTO `productos` VALUES (1, 'Producto 1', 'desc1', 2.00, 22.00, 'image-1684514743782-503412984.jpg', 'ACTIVO', 1);

-- ----------------------------
-- Table structure for promociones
-- ----------------------------
DROP TABLE IF EXISTS `promociones`;
CREATE TABLE `promociones`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `idEmpresa` int NULL DEFAULT NULL,
  `idServicio` int NULL DEFAULT NULL,
  `fecha` date NULL DEFAULT NULL,
  `descuento` double(11, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of promociones
-- ----------------------------
INSERT INTO `promociones` VALUES (1, 1, 2, '2023-10-05', 10.00);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'ADMINISTRADOR');
INSERT INTO `roles` VALUES (2, 'TIENDA');
INSERT INTO `roles` VALUES (3, 'TECNICO');
INSERT INTO `roles` VALUES (4, 'CLIENTE');

-- ----------------------------
-- Table structure for servicios
-- ----------------------------
DROP TABLE IF EXISTS `servicios`;
CREATE TABLE `servicios`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `descripcion` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `costo` double(11, 2) NULL DEFAULT NULL,
  `domicilio` double(11, 2) NULL DEFAULT NULL,
  `imagen` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `estado` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `idEmpresa` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of servicios
-- ----------------------------
INSERT INTO `servicios` VALUES (1, 'prueba', 'descripcion', 2.00, 22.00, '', 'INACTIVO', 9);
INSERT INTO `servicios` VALUES (2, 'prueba1', 'desc1', 2.00, 22.00, 'image-1684514743782-503412984.jpg', 'ACTIVO', 1);
INSERT INTO `servicios` VALUES (3, 'prueba2', 'descripcion', 2.00, 22.00, 'image-1684514743782-503412984.jpg', 'ACTIVO', 1);
INSERT INTO `servicios` VALUES (4, 'prueba final', 'asdasd', 5.50, 2.50, 'image-1684514743782-503412984.jpg', 'ACTIVO', 2);

-- ----------------------------
-- Table structure for ubicaciones
-- ----------------------------
DROP TABLE IF EXISTS `ubicaciones`;
CREATE TABLE `ubicaciones`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `idRepartidor` int NULL DEFAULT NULL,
  `idPedido` int NULL DEFAULT NULL,
  `latDestino` double(11, 5) NULL DEFAULT NULL,
  `lngDestino` double(11, 5) NULL DEFAULT NULL,
  `referencia` varchar(500) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fkPedidoUbicaciones`(`idPedido` ASC) USING BTREE,
  CONSTRAINT `fkPedidoUbicaciones` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ubicaciones
-- ----------------------------
INSERT INTO `ubicaciones` VALUES (3, NULL, 12, -3.69268, -79.60155, 'qweqweqw, Referencia: asdasdas');

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `apellidos` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `cedula` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `telefono` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `pass` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `idRol` int NULL DEFAULT NULL,
  `idEmpresa` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fkRolUsuario`(`idRol` ASC) USING BTREE,
  INDEX `fkEmpresaUsuario`(`idEmpresa` ASC) USING BTREE,
  CONSTRAINT `fkEmpresaUsuario` FOREIGN KEY (`idEmpresa`) REFERENCES `empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkRolUsuario` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES (1, 'Administrador', 'Sistema', '1111111111', 'admin@hotmail.com', '111111111', '$2a$10$bdWbLh2q.p2rdEL2MnDPOulaJuzbqDseZelYlZUWMikJeYY/CpUNy', 2, 3);
INSERT INTO `usuarios` VALUES (2, 'Jorge', 'Ortiz', '1719513458', 'ste@hotmail.com', '0998286811', '$2a$10$bdWbLh2q.p2rdEL2MnDPOulaJuzbqDseZelYlZUWMikJeYY/CpUNy', 2, NULL);
INSERT INTO `usuarios` VALUES (3, 'Manuel', 'Rojas', '1725270225', 'compuspace@gmail.com', '0921452001', '$2a$10$bdWbLh2q.p2rdEL2MnDPOulaJuzbqDseZelYlZUWMikJeYY/CpUNy', 2, NULL);
INSERT INTO `usuarios` VALUES (4, 'Daniel', 'Aguirre', '1719513458', 'panchin_.car@hotmail.com', '0998286811', '$2a$10$d5efCP4gBSN8aLofjEIOuOv.xiQmaSGOadGjoKSiy5vNKx2CsMdjy', 4, NULL);
INSERT INTO `usuarios` VALUES (5, 'Maria Beatriz', 'Guevara Espinosa', '1719513457', 'maria@hotmail.com', '2221219', '$2a$10$J32iYC4o31Wxm0e3rGaYGezwfo.c58//peApiULeGu5THjnhmj5sG', 2, NULL);
INSERT INTO `usuarios` VALUES (6, 'Jose Luis', 'Robles Rojas', '1709863946', 'jose@hotmail.com', '2232212', '$2a$10$AOIXcP3cOUrfFn1Jy2um5eTeUpS7a/Ufpm1uMpHOn/nKz4jY0H7KG', 2, NULL);

SET FOREIGN_KEY_CHECKS = 1;
