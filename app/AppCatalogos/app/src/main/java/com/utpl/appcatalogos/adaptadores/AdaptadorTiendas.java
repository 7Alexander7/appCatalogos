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
import com.utpl.appcatalogos.modelos.Tienda;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

public class AdaptadorTiendas extends RecyclerView.Adapter<AdaptadorTiendas.ViewHolderTiendas> implements View.OnClickListener {

    ArrayList<Tienda> listaTiendas;
    private Context context;
    private View.OnClickListener listener;

    public AdaptadorTiendas(ArrayList<Tienda> listaTiendas, Context context) {
        this.listaTiendas = listaTiendas;
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolderTiendas onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_tienda, parent, false);
        view.setOnClickListener(this);
        return new ViewHolderTiendas(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolderTiendas holder, int position) {
        holder.nombrecomercial.setText(listaTiendas.get(position).getNombrecomercial());
        holder.direccion.setText(listaTiendas.get(position).getDireccion());
        holder.telefono.setText(listaTiendas.get(position).getTelefonoEmpresa());
        if(listaTiendas.get(position).getImagen() != null){
            Bitmap bmp = get_imagen(listaTiendas.get(position).getImagen().toString());
            holder.foto.setImageBitmap(bmp);
        } else {
            holder.foto.setImageResource(R.drawable.catalogostienda);
        }
    }

    @Override
    public int getItemCount() {
        return listaTiendas.size();
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

    public class ViewHolderTiendas extends RecyclerView.ViewHolder {
        TextView nombrecomercial, direccion, telefono;
        ImageView foto;
        public ViewHolderTiendas(@NonNull View itemView) {
            super(itemView);
            nombrecomercial = itemView.findViewById(R.id.idNombre);
            direccion = itemView.findViewById(R.id.idDireccion);
            telefono = itemView.findViewById(R.id.idTelefono);
            foto = itemView.findViewById(R.id.idImagen);
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
