package com.utpl.appcatalogos.modelos;

public class Pedidos {

    private String id;
    private String idUsuario;
    private String idEmpresa;
    private String fecha;
    private String hora;
    private String subtotal;
    private String iva;
    private String total;
    private String domicilio;
    private String comentario;
    private String estado;
    private String empresa;
    private String servicio;
    private String imagen;

    public Pedidos(){

    }

    public Pedidos(String id, String idUsuario, String idEmpresa, String fecha, String hora, String subtotal, String iva, String total, String domicilio, String comentario, String estado, String empresa, String servicio, String imagen) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idEmpresa = idEmpresa;
        this.fecha = fecha;
        this.hora = hora;
        this.subtotal = subtotal;
        this.iva = iva;
        this.total = total;
        this.domicilio = domicilio;
        this.comentario = comentario;
        this.estado = estado;
        this.empresa = empresa;
        this.servicio = servicio;
        this.imagen = imagen;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getIdEmpresa() {
        return idEmpresa;
    }

    public void setIdEmpresa(String idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(String subtotal) {
        this.subtotal = subtotal;
    }

    public String getIva() {
        return iva;
    }

    public void setIva(String iva) {
        this.iva = iva;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public String getServicio() {
        return servicio;
    }

    public void setServicio(String servicio) {
        this.servicio = servicio;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}
