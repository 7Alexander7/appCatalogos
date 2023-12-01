package com.utpl.appcatalogos.fragments;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.StrictMode;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.utpl.appcatalogos.Login;
import com.utpl.appcatalogos.R;
import com.utpl.appcatalogos.ServiciosTienda;
import com.utpl.appcatalogos.adaptadores.AdaptadorTiendas;
import com.utpl.appcatalogos.api.Api;
import com.utpl.appcatalogos.modelos.Tienda;
import com.utpl.appcatalogos.utilizables.MensajesToast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class TiendasFragment extends Fragment {

    RecyclerView recyclerTiendas;
    ArrayList<Tienda> listaTiendas;
    ProgressDialog dialog;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        View vista = inflater.inflate(R.layout.fragment_tiendas, container, false);
        listaTiendas = new ArrayList<>();

        recyclerTiendas = vista.findViewById(R.id.recyclerTiendas);
        recyclerTiendas.setLayoutManager(new LinearLayoutManager(this.getContext()));
        recyclerTiendas.setHasFixedSize(true);
        cargarTiendas(vista);
        return vista;
    }

    private void cargarTiendas(View view) {
        dialog = new ProgressDialog(getContext());
        dialog.setMessage("Cargando Tiendas");
        dialog.show();
        OkHttpClient client = new OkHttpClient();
        String url = Api.API_RUTA + "empresa/lsEmpresaActivada";
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
                            Tienda tienda = null;
                            try {
                                responseData = response.body().string();
                                JSONObject data = new JSONObject(responseData);
                                JSONArray json = data.optJSONArray("data");
                                if(json.length() == 0) {
                                    dialog.hide();
                                    MensajesToast.toastError("No hay tiendas disponibles", getContext(), view);
                                } else {
                                    for(int x=0; x<json.length();x++){
                                        tienda = new Tienda();
                                        JSONObject jsonObject = null;
                                        jsonObject = json.getJSONObject(x);
                                        tienda.setId(jsonObject.optInt("id"));
                                        tienda.setNombrecomercial(jsonObject.optString("nombrecomercial"));
                                        tienda.setDireccion(jsonObject.optString("direccion"));
                                        tienda.setTelefonoEmpresa(jsonObject.optString("telefonoEmpresa"));
                                        tienda.setImagen(Api.API_RUTA_IMG + jsonObject.optString("imagen"));
                                        listaTiendas.add(tienda);
                                    }
                                    AdaptadorTiendas adaptadorTiendas = new AdaptadorTiendas(listaTiendas, getContext());
                                    adaptadorTiendas.setOnClickListener(new View.OnClickListener() {
                                        @Override
                                        public void onClick(View view) {
                                            Intent intent = new Intent(getContext(), ServiciosTienda.class);
                                            intent.putExtra("idEmpresa", String.valueOf(listaTiendas.get(recyclerTiendas.getChildAdapterPosition(view)).getId()));
                                            startActivity(intent);
                                        }
                                    });
                                    recyclerTiendas.setAdapter(adaptadorTiendas);
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