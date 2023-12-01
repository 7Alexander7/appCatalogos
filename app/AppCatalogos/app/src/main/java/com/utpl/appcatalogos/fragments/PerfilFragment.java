package com.utpl.appcatalogos.fragments;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import com.utpl.appcatalogos.Login;
import com.utpl.appcatalogos.R;
import com.utpl.appcatalogos.api.Api;
import com.utpl.appcatalogos.utilizables.MensajesToast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class PerfilFragment extends Fragment {

    View myView;
    EditText nombres, apellidos, cedula, telefono, email;
    Button guardarCambios;
    String idUsuario;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        myView = inflater.inflate(R.layout.fragment_perfil, container, false);

        nombres = myView.findViewById(R.id.txtNombresPerfil);
        apellidos = myView.findViewById(R.id.txtApellidosPerfil);
        cedula = myView.findViewById(R.id.txtCedulaPerfil);
        cedula.setEnabled(false);
        telefono = myView.findViewById(R.id.txtTelefonoPerfil);
        email = myView.findViewById(R.id.txtEmailPerfil);
        guardarCambios = myView.findViewById(R.id.btnGuardarPerfil);

        SharedPreferences session = this.getActivity().getSharedPreferences("datosUsuario", Context.MODE_PRIVATE);
        idUsuario = session.getString("idUsuario", "-");
        nombres.setText(session.getString("nombres", "-"));
        apellidos.setText(session.getString("apellidos", "-"));
        cedula.setText(session.getString("cedula", "-"));
        telefono.setText(session.getString("telefono", "-"));
        email.setText(session.getString("email", "-"));

        guardarCambios.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                guardarPerfil(idUsuario, nombres.getText().toString(), apellidos.getText().toString(), cedula.getText().toString(), telefono.getText().toString(), email.getText().toString(), myView);
            }
        });

        return myView;
    }

    private void guardarPerfil(String idUsuario, String nombres, String apellidos, String cedula, String telefono, String email, View view){
        OkHttpClient client = new OkHttpClient();
        String url = Api.API_RUTA + "usuarios/actPerfil";
        RequestBody requestBody = new FormBody.Builder()
                .add("nombres", nombres)
                .add("apellidos", apellidos)
                .add("cedula", cedula)
                .add("telefono", telefono)
                .add("email", email)
                .add("idUsuario", idUsuario)
                .build();
        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
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
                            try {
                                responseData = response.body().string();
                                JSONObject jsonResponse = new JSONObject(responseData);
                                MensajesToast.toastExito(jsonResponse.getString("mensaje"), getContext(), view);
                                actualizarDatos(nombres, apellidos, telefono, email);
                            } catch (JSONException | IOException e) {
                                throw new RuntimeException(e);
                            }
                        } else {
                            MensajesToast.toastError("No existe la ruta ingresada", getContext(), view);
                        }
                    }
                });
            }
        });
    }

    private void actualizarDatos(String nombres, String apellidos, String telefono, String email) {
        SharedPreferences session = this.getActivity().getSharedPreferences("datosUsuario", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = session.edit();
        editor.putString("nombres", nombres);
        editor.putString("apellidos", apellidos);
        editor.putString("email", email);
        editor.putString("telefono", telefono);
        editor.commit();
    }

}