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
import com.utpl.appcatalogos.modelos.Pedidos;
import com.utpl.appcatalogos.modelos.Servicio;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

public class AdaptadorPedidos extends RecyclerView.Adapter<AdaptadorPedidos.ViewHolderPedidos> implements View.OnClickListener  {

    ArrayList<Pedidos> listaPedidos;
    private Context context;
    private View.OnClickListener listener;

    public AdaptadorPedidos(ArrayList<Pedidos> listaPedidos, Context context) {
        this.listaPedidos = listaPedidos;
        this.context = context;
    }

    @NonNull
    @Override
    public AdaptadorPedidos.ViewHolderPedidos onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_pedido, parent, false);
        view.setOnClickListener(this);
        return new AdaptadorPedidos.ViewHolderPedidos(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AdaptadorPedidos.ViewHolderPedidos holder, int position) {
        holder.empresa.setText(listaPedidos.get(position).getEmpresa());
        holder.servicio.setText(listaPedidos.get(position).getServicio());
        holder.fecha.setText(listaPedidos.get(position).getFecha());
        holder.hora.setText(listaPedidos.get(position).getHora());
        holder.total.setText(listaPedidos.get(position).getTotal());
        holder.estado.setText(listaPedidos.get(position).getEstado());
        if(listaPedidos.get(position).getImagen() != null){
            Bitmap bmp = get_imagen(listaPedidos.get(position).getImagen().toString());
            holder.foto.setImageBitmap(bmp);
        } else {
            holder.foto.setImageResource(R.drawable.catalogostienda);
        }
    }

    @Override
    public int getItemCount() {
        return listaPedidos.size();
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

    public class ViewHolderPedidos extends RecyclerView.ViewHolder {
        TextView empresa, servicio, fecha, hora, total, estado ;
        ImageView foto;
        public ViewHolderPedidos(@NonNull View itemView) {
            super(itemView);
            empresa = itemView.findViewById(R.id.idEmpresa);
            servicio = itemView.findViewById(R.id.idServicio);
            fecha = itemView.findViewById(R.id.idFecha);
            hora = itemView.findViewById(R.id.idHora);
            foto = itemView.findViewById(R.id.idImagenHistorial);
            total = itemView.findViewById(R.id.idTotal);
            estado = itemView.findViewById(R.id.idEstado);
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
