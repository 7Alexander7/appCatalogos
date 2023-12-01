package com.utpl.appcatalogos.fragments;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.StrictMode;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.utpl.appcatalogos.R;
import com.utpl.appcatalogos.ServiciosTienda;
import com.utpl.appcatalogos.adaptadores.AdaptadorPedidos;
import com.utpl.appcatalogos.adaptadores.AdaptadorTiendas;
import com.utpl.appcatalogos.api.Api;
import com.utpl.appcatalogos.modelos.Pedidos;
import com.utpl.appcatalogos.modelos.Tienda;
import com.utpl.appcatalogos.utilizables.MensajesToast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class HistorialFragment extends Fragment {

    RecyclerView recyclerPedidos;
    ArrayList<Pedidos> listaPedidos;
    ProgressDialog dialog;
    String idUsuario;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        View vista = inflater.inflate(R.layout.fragment_historial, container, false);
        listaPedidos = new ArrayList<>();

        SharedPreferences session = this.getActivity().getSharedPreferences("datosUsuario", Context.MODE_PRIVATE);
        idUsuario = session.getString("idUsuario", "-");

        recyclerPedidos = vista.findViewById(R.id.recyclerPedidos);
        recyclerPedidos.setLayoutManager(new LinearLayoutManager(this.getContext()));
        recyclerPedidos.setHasFixedSize(true);
        cargarHistorial(idUsuario, vista);
        return vista;
    }

    private void cargarHistorial(String id, View view) {
        dialog = new ProgressDialog(getContext());
        dialog.setMessage("Cargando Historial");
        dialog.show();
        OkHttpClient client = new OkHttpClient();
        String url = Api.API_RUTA + "pedido/listaPedidosCliente?idUsuario=" + id;
        Request request = new Request.Builder()
                .url(url)
                .build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                MensajesToast.toastInfo("No hay comunicación con el BackEnd", getContext(), view);
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.isSuccessful()) {
                            String responseData = null;
                            Pedidos pedido = null;
                            try {
                                responseData = response.body().string();
                                JSONObject data = new JSONObject(responseData);
                                JSONArray json = data.optJSONArray("data");
                                if(json.length() == 0) {
                                    dialog.hide();
                                    MensajesToast.toastError("No hay pedidos en el historial", getContext(), view);
                                } else {
                                    for(int x=0; x<json.length();x++){
                                        pedido = new Pedidos();
                                        JSONObject jsonObject = null;
                                        jsonObject = json.getJSONObject(x);
                                        pedido.setId(jsonObject.optString("id"));
                                        pedido.setEmpresa(jsonObject.optString("empresa"));
                                        pedido.setServicio(jsonObject.optString("servicio"));
                                        pedido.setFecha(jsonObject.optString("fecha"));
                                        pedido.setHora(jsonObject.optString("hora"));
                                        pedido.setEstado(jsonObject.optString("estado"));
                                        pedido.setTotal("Total: $" + jsonObject.optString("total"));
                                        pedido.setImagen(Api.API_RUTA_IMG + jsonObject.optString("imagen"));
                                        listaPedidos.add(pedido);
                                    }
                                    AdaptadorPedidos adaptadorPedidos = new AdaptadorPedidos(listaPedidos, getContext());
                                    adaptadorPedidos.setOnClickListener(new View.OnClickListener() {
                                        @Override
                                        public void onClick(View view) {

                                        }
                                    });
                                    recyclerPedidos.setAdapter(adaptadorPedidos);
                                    dialog.hide();
                                }
                            } catch (JSONException | IOException e) {
                                throw new RuntimeException(e);
                            }
                        } else {
                            dialog.hide();
                            MensajesToast.toastError("No existe la ruta ingresada", getActivity(), view);
                        }
                    }
                });
            }
        });
    }

}