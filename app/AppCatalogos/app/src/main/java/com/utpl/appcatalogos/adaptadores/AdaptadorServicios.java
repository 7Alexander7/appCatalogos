package com.utpl.appcatalogos.adaptadores;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.utpl.appcatalogos.R;
import com.utpl.appcatalogos.modelos.Servicio;
import com.utpl.appcatalogos.modelos.Tienda;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

public class AdaptadorServicios extends RecyclerView.Adapter<AdaptadorServicios.ViewHolderServicios> implements View.OnClickListener {

    ArrayList<Servicio> listaServicios;
    private Context context;
    private View.OnClickListener listener;

    public AdaptadorServicios(ArrayList<Servicio> listaServicios, Context context) {
        this.listaServicios = listaServicios;
        this.context = context;
    }

    @NonNull
    @Override
    public AdaptadorServicios.ViewHolderServicios onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_servicio, parent, false);
        view.setOnClickListener(this);
        return new AdaptadorServicios.ViewHolderServicios(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AdaptadorServicios.ViewHolderServicios holder, int position) {
        Servicio servicioActual = listaServicios.get(position);
        holder.nombre.setText(listaServicios.get(position).getNombre());
        holder.descripcion.setText(listaServicios.get(position).getDescripcion());
        holder.costo.setText(listaServicios.get(position).getCosto());
        holder.domicilio.setText(listaServicios.get(position).getDomicilio());
        holder.descuento.setText(listaServicios.get(position).getDescuento());
        if (servicioActual.getDescuento() != null && servicioActual.getDescuento() != "") {
            holder.descuento.setText("- " + servicioActual.getDescuento() + "%");
            holder.descuento.setVisibility(View.VISIBLE);
        } else {
            holder.descuento.setVisibility(View.GONE);
        }
        if(listaServicios.get(position).getImagen() != null){
            Bitmap bmp = get_imagen(listaServicios.get(position).getImagen().toString());
            holder.foto.setImageBitmap(bmp);
        } else {
            holder.foto.setImageResource(R.drawable.catalogostienda);
        }
    }

    @Override
    public int getItemCount() {
        return listaServicios.size();
    }

    public void setOnClickListener(View.OnClickListener listener){
        this.listener = listener;
    }

    @Override
    public void onClick(View view) {
        if(listener!=null){
            listener.onClick(view);
        }
    }

    public class ViewHolderServicios extends RecyclerView.ViewHolder {
        TextView nombre, descripcion, costo, domicilio, descuento ;
        ImageView foto;
        public ViewHolderServicios(@NonNull View itemView) {
            super(itemView);
            nombre = itemView.findViewById(R.id.idNombreServicio);
            descripcion = itemView.findViewById(R.id.idDescripcionServicio);
            costo = itemView.findViewById(R.id.idPrecioServicio);
            domicilio = itemView.findViewById(R.id.idDomicilioServicio);
            foto = itemView.findViewById(R.id.idImagenServicio);
            descuento = itemView.findViewById(R.id.idDescuento);
        }
    }

    private Bitmap get_imagen(String url) {
        Bitmap bm = null;
        try {
            URL _url = new URL(url);
            URLConnection con = _url.openConnection();
            con.connect();
            InputStream is = con.getInputStream();
            BufferedInputStream bis = new BufferedInputStream(is);
            bm = BitmapFactory.decodeStream(bis);
            bis.close();
            is.close();
        } catch (IOException e) {

        }
        return bm;
    }

}
