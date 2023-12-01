package com.utpl.appcatalogos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Switch;
import android.widget.TextView;

import com.utpl.appcatalogos.api.Api;
import com.utpl.appcatalogos.utilizables.MensajesToast;

import org.json.JSONArray;
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

public class FinalizarPedido extends AppCompatActivity {

    Button volver, enviar;
    double totalFinal, subtotal, iva;
    String domicilioFinal, idEmpresaFinal;
    double latDestino = 0, lngDestino = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_finalizar_pedido);

        // Recuperar datos del usuario
        SharedPreferences session = getSharedPreferences("datosUsuario", Context.MODE_PRIVATE);
        String nombres = session.getString("nombres", "");
        String apellidos = session.getString("apellidos", "");
        String cedula = session.getString("cedula", "");
        String email = session.getString("email", "");
        String telefono = session.getString("telefono", "");
        String idUsuario = session.getString("idUsuario", "");

        EditText editNombres = findViewById(R.id.editNombres);
        EditText editApellidos = findViewById(R.id.editApellidos);
        EditText editCedula = findViewById(R.id.editCedula);
        EditText editEmail = findViewById(R.id.editEmail);
        EditText editTelefono = findViewById(R.id.editTelefono);

        Switch switchDomicilio = findViewById(R.id.switchDomicilio);
        EditText editDireccion = findViewById(R.id.editDireccion);
        EditText editReferencia = findViewById(R.id.editReferencia);
        Button btnUbicacion = findViewById(R.id.btnUbicacion);

        btnUbicacion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), MapsActivity.class);
                startActivity(intent);
            }
        });

        // Al iniciar, hazlos invisibles si el switch está desactivado
        if (!switchDomicilio.isChecked()) {
            editDireccion.setVisibility(View.GONE);
            editReferencia.setVisibility(View.GONE);
            btnUbicacion.setVisibility(View.GONE);
        }

        // Establecer el listener para el switch
        switchDomicilio.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked) {
                    // Si el switch está activado, hazlos visibles
                    editDireccion.setVisibility(View.VISIBLE);
                    editReferencia.setVisibility(View.VISIBLE);
                    btnUbicacion.setVisibility(View.VISIBLE);
                } else {
                    // Si el switch está desactivado, hazlos invisibles
                    editDireccion.setVisibility(View.GONE);
                    editReferencia.setVisibility(View.GONE);
                    btnUbicacion.setVisibility(View.GONE);
                }
            }
        });

        volver = findViewById(R.id.btnVolverPedido);
        volver.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(intent);
                finish();
            }
        });

        editNombres.setText(nombres);
        editApellidos.setText(apellidos);
        editCedula.setText(cedula);
        editEmail.setText(email);
        editTelefono.setText(telefono);

        // Recuperar datos del carrito
        SharedPreferences prefs = getSharedPreferences("Carrito", MODE_PRIVATE);
        String jsonCarrito = prefs.getString("carrito", "[]");
        TextView tvTotal = findViewById(R.id.tvTotal);
        try {
            JSONArray carrito = new JSONArray(jsonCarrito);
            double total = 0.0;

            LinearLayout contenedorPedido = findViewById(R.id.contenedorPedido);

            for (int i = 0; i < carrito.length(); i++) {
                JSONObject item = carrito.getJSONObject(i);

                TextView tvItem = new TextView(this);
                idEmpresaFinal = item.getString("idEmpresa");
                String textoItem = "ID: " + item.getString("idServicio") +
                        ", Nombre: " + item.getString("nombre") +
                        ", Cantidad: " + item.getString("cantidad") + ", " +
                        item.getString("costo");
                tvItem.setText(textoItem);

                double costo = Double.parseDouble(item.getString("costo").replace("Precio: $", "").trim());
                total += costo * item.getInt("cantidad");
                totalFinal = total;
                subtotal = total / (1 + 0.12);
                iva = total - subtotal;
                contenedorPedido.addView(tvItem);
            }
            // Mostrar total

            tvTotal.setText("Total: $" + total);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        enviar = findViewById(R.id.btnEnviarPedido);
        enviar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!switchDomicilio.isChecked()) {
                    domicilioFinal = "NO";
                    enviarPedido(idUsuario, tvTotal.getText().toString(), editDireccion.getText().toString(), editReferencia.getText().toString(), v);
                } else {
                    domicilioFinal = "SI";
                    if(editDireccion.getText().toString().equals("") || editReferencia.getText().toString().equals("")) {
                        MensajesToast.toastInfo("Debe llenar los campos de dirección y referencia para continuar", FinalizarPedido.this, v);
                    } else {
                        enviarPedido(idUsuario, tvTotal.getText().toString(), editDireccion.getText().toString(), editReferencia.getText().toString(), v);
                    }
                }
            }
        });

    }

    private void enviarPedido(String idUsuario, String total, String direccion, String referencia, View view){
        OkHttpClient client = new OkHttpClient();
        String url = Api.API_RUTA + "pedido/nuevoPedido";
        SharedPreferences prefs = getSharedPreferences("Carrito", MODE_PRIVATE);
        String jsonCarrito = prefs.getString("carrito", "[]");

        SharedPreferences prefsUbicacion = getSharedPreferences("MyPrefs", MODE_PRIVATE);
        // 2. Recupera la latitud y longitud
        float latitud = prefsUbicacion.getFloat("latitude_key", 0);
        float longitud = prefsUbicacion.getFloat("longitude_key", 0);
        Log.i("Ubicaciones", String.valueOf(latitud));
        if(domicilioFinal.equals("SI")) {
            if(latitud == 0 || longitud == 0) {
                MensajesToast.toastInfo("Debe seleccionar la ubicación en el mapa para continuar", FinalizarPedido.this, view);
                return;
            }
        }

        RequestBody requestBody = new FormBody.Builder()
                .add("idUsuario", idUsuario)
                .add("subtotal", String.valueOf(subtotal))
                .add("iva", String.valueOf(iva))
                .add("total", String.valueOf(totalFinal))
                .add("domicilio", domicilioFinal)
                .add("detalle", jsonCarrito)
                .add("idEmpresa", idEmpresaFinal)
                .add("referencia", direccion + ", Referencia: " + referencia)
                .add("estado", "GENERADO")
                .add("latDestino", String.valueOf(latitud))
                .add("lngDestino", String.valueOf(longitud))
                .build();
        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                FinalizarPedido.this.runOnUiThread(new Runnable() {
                    public void run() {
                        e.printStackTrace();
                        MensajesToast.toastInfo("No hay comunicación con el BackEnd", FinalizarPedido.this, view);
                    }
                });
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                FinalizarPedido.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.isSuccessful()) {
                            String responseData = null;
                            try {
                                responseData = response.body().string();
                                JSONObject jsonResponse = new JSONObject(responseData);
                                if(jsonResponse.getString("success").equals("true")) {
                                    vaciarCarrito();
                                    vaciarUbicacion();
                                    MensajesToast.toastExito("Pedido enviado exitosamente", FinalizarPedido.this, view);
                                    finish();
                                }
                            } catch (JSONException | IOException e) {
                                throw new RuntimeException(e);
                            }
                        } else {
                            if(response.code() == 401){
                                MensajesToast.toastError("El Pedido no fue guardado", FinalizarPedido.this, view);
                            } else {
                                MensajesToast.toastError("Error en la consulta", FinalizarPedido.this, view);
                            }
                        }
                    }
                });
            }
        });
    }

    private void vaciarCarrito() {
        SharedPreferences prefs = getSharedPreferences("Carrito", MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.remove("carrito");
        editor.apply();
    }

    private void vaciarUbicacion() {
        SharedPreferences prefs = getSharedPreferences("MyPrefs", MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.remove("latitude_key");
        editor.remove("longitude_key");
        editor.apply();
    }

}