package com.utpl.appcatalogos.modelos;

public class Servicio {

    private String id;
    private String nombre;
    private String descripcion;
    private String costo;
    private String domicilio;
    private String imagen;
    private String estado;
    private String idEmpresa;
    private String descuento;
    private String costoConDescuento;

    public Servicio(){
    }

    public Servicio(String id, String nombre, String descripcion, String costo, String domicilio, String imagen, String estado, String idEmpresa, String descuento, String costoConDescuento) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.costo = costo;
        this.domicilio = domicilio;
        this.imagen = imagen;
        this.estado = estado;
        this.idEmpresa = idEmpresa;
        this.descuento = descuento;
        this.costoConDescuento = costoConDescuento;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCosto() {
        return costo;
    }

    public void setCosto(String costo) {
        this.costo = costo;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getIdEmpresa() {
        return idEmpresa;
    }

    public void setIdEmpresa(String idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    public String getDescuento() {
        return descuento;
    }

    public void setDescuento(String descuento) {
        this.descuento = descuento;
    }

    public String getCostoConDescuento() {
        return costoConDescuento;
    }

    public void setCostoConDescuento(String costoConDescuento) {
        this.costoConDescuento = costoConDescuento;
    }
}
