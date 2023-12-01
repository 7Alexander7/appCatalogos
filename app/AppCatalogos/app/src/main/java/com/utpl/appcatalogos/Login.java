package com.utpl.appcatalogos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.utpl.appcatalogos.api.Api;
import com.utpl.appcatalogos.utilizables.MensajesToast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class Login extends AppCompatActivity {

    Button registro, login;
    TextView olvido;
    EditText usuario, clave;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        registro = findViewById(R.id.btnRegistro);
        olvido = findViewById(R.id.txtOlvido);
        login = findViewById(R.id.btnLogin);
        usuario = findViewById(R.id.txtUsuario);
        clave = findViewById(R.id.txtClave);

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(validar(usuario.getText().toString(), clave.getText().toString())) {
                    iniciarSesion(usuario.getText().toString(), clave.getText().toString(), view);
                } else {
                    MensajesToast.toastInfo("Debe llenar todos los campos", Login.this, view);
                }
            }
        });
        olvido.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                MensajesToast.toastInfo("Disponible proximamente", Login.this, view);
            }
        });
        registro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Login.this, Registro.class));
            }
        });

    }

    private boolean validar(String email, String clave){
        return !email.equals("") && !clave.equals("");
    }

    private void iniciarSesion(String email, String clave, View view){
        OkHttpClient client = new OkHttpClient();
        String url = Api.API_RUTA + "login";
        RequestBody requestBody = new FormBody.Builder()
                .add("usuario", email)
                .add("clave", clave)
                .build();
        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Login.this.runOnUiThread(new Runnable() {
                    public void run() {
                        e.printStackTrace();
                        MensajesToast.toastInfo("No hay comunicación con el BackEnd", Login.this, view);
                    }
                });
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Login.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.isSuccessful()) {
                            String responseData = null;
                            try {
                                responseData = response.body().string();
                                JSONObject jsonResponse = new JSONObject(responseData);
                                JSONObject data = new JSONObject(String.valueOf(jsonResponse.getJSONObject("data")));
                                if(data.getString("rol").equals("CLIENTE")) {
                                    saveUsuario(data.getString("idUsuario"),data.getString("nombres"), data.getString("apellidos"), data.getString("cedula"), data.getString("email"), data.getString("telefono"));
                                    MensajesToast.toastExito(jsonResponse.getString("mensaje"), Login.this, view);
                                } else {
                                    MensajesToast.toastInfo("La APP es únicamente para CLIENTES", Login.this, view);
                                }
                            } catch (JSONException | IOException e) {
                                throw new RuntimeException(e);
                            }
                        } else {
                            if(response.code() == 401){
                                MensajesToast.toastError("Las credenciales son incorrectas", Login.this, view);
                            } else {
                                MensajesToast.toastError("No existe la ruta ingresada", Login.this, view);
                            }
                        }
                    }
                });
            }
        });
    }

    private void saveUsuario(String id, String nombres, String apellidos, String cedula, String email, String telefono){
        SharedPreferences session = getSharedPreferences("datosUsuario", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = session.edit();
        editor.putString("idUsuario", id);
        editor.putString("nombres", nombres);
        editor.putString("apellidos", apellidos);
        editor.putString("cedula", cedula);
        editor.putString("email", email);
        editor.putString("telefono", telefono);
        editor.commit();
        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
        startActivity(intent);
        finish();
    }

    @Override
    public void onBackPressed() {}

}