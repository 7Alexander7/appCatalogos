package com.utpl.appcatalogos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
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
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class Registro extends AppCompatActivity {

    Button volver, registrarse;
    EditText nombres, apellidos, cedula, email, telefono, clave;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registro);

        volver = findViewById(R.id.txtVolverRegistro);
        registrarse = findViewById(R.id.btnRegistrarse);
        nombres = findViewById(R.id.txtNombreRegistro);
        apellidos = findViewById(R.id.txtApellidosRegistro);
        cedula = findViewById(R.id.txtCedulaRegistro);
        email = findViewById(R.id.txtEmailRegistro);
        telefono = findViewById(R.id.txtCelularRegistro);
        clave = findViewById(R.id.txtClaveRegistro);

        registrarse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(validar(nombres.getText().toString(), apellidos.getText().toString(), cedula.getText().toString(), email.getText().toString(), telefono.getText().toString(), clave.getText().toString())) {
                    nuevoRegistro(nombres.getText().toString(), apellidos.getText().toString(), cedula.getText().toString(), email.getText().toString(), telefono.getText().toString(), clave.getText().toString(), view);
                } else {
                    MensajesToast.toastInfo("Debe llenar todos los campos", Registro.this, view);
                }
            }
        });
        volver.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Registro.this, Login.class));
                finish();
            }
        });

    }

    private boolean validar(String nombres, String apellidos, String cedula, String email, String telefono, String clave){
        return !email.equals("") && !clave.equals("")&& !nombres.equals("")&& !apellidos.equals("")&& !cedula.equals("")&& !telefono.equals("");
    }

    private void nuevoRegistro(String nombres, String apellidos, String cedula, String email, String telefono, String clave, View view){
        OkHttpClient client = new OkHttpClient();
        String url = Api.API_RUTA + "usuarios/nuevoUsuario";
        RequestBody requestBody = new FormBody.Builder()
                .add("cedula", cedula)
                .add("nombre", nombres)
                .add("apellido", apellidos)
                .add("email", email)
                .add("clave", clave)
                .add("telefono", telefono)
                .add("rol", "CLIENTE")
                .add("idEmpresa", "")
                .build();
        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                MensajesToast.toastInfo("No hay comunicación con el BackEnd", Registro.this, view);
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Registro.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.isSuccessful()) {
                            String responseData = null;
                            try {
                                responseData = response.body().string();
                                JSONObject jsonResponse = new JSONObject(responseData);
                                MensajesToast.toastExito(jsonResponse.getString("mensaje"), Registro.this, view);
                                startActivity(new Intent(Registro.this, Login.class));
                                finish();
                            } catch (JSONException | IOException e) {
                                throw new RuntimeException(e);
                            }
                        } else {
                            MensajesToast.toastError("No existe la ruta ingresada", Registro.this, view);
                        }
                    }
                });
            }
        });
    }

}