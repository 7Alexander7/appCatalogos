package com.utpl.appcatalogos;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.RadioGroup;
import android.widget.Spinner;

import com.utpl.appcatalogos.adaptadores.AdaptadorProductos;
import com.utpl.appcatalogos.adaptadores.AdaptadorServicios;
import com.utpl.appcatalogos.adaptadores.AdaptadorTiendas;
import com.utpl.appcatalogos.api.Api;
import com.utpl.appcatalogos.modelos.Producto;
import com.utpl.appcatalogos.modelos.Servicio;
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
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ServiciosTienda extends AppCompatActivity {

    RecyclerView recyclerServicios;
    RecyclerView recyclerProductos;

    ArrayList<Servicio> listaServicios;
    ArrayList<Producto> listaProductos;
    ProgressDialog dialog;
    ProgressDialog dialogProductos;
    String idEmpresaFinal;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_servicios_tienda);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        String idEmpresa = getIntent().getExtras().getString("idEmpresa");

        listaServicios = new ArrayList<>();
        listaProductos = new ArrayList<>();

        RadioGroup selectorGroup = findViewById(R.id.selectorGroup);
        recyclerServicios = findViewById(R.id.recyclerServicios);
        recyclerProductos = findViewById(R.id.recyclerProductos);

        selectorGroup.setOnCheckedChangeListener((group, checkedId) -> {
            if(checkedId == R.id.radioServicios) {
                recyclerServicios.setVisibility(View.VISIBLE);
                recyclerProductos.setVisibility(View.GONE);
            } else if(checkedId == R.id.radioProductos) {
                recyclerServicios.setVisibility(View.GONE);
                recyclerProductos.setVisibility(View.VISIBLE);
            }
        });

        recyclerServicios.setLayoutManager(new LinearLayoutManager(this));
        recyclerServicios.setHasFixedSize(true);
        if(idEmpresa != null) {
            cargarServicios(idEmpresa, getWindow().getDecorView());
            idEmpresaFinal = idEmpresa;
        } else {
            MensajesToast.toastError("No llego ningun idEmpresa", ServiciosTienda.this, getWindow().getDecorView());
        }
        recyclerProductos.setLayoutManager(new LinearLayoutManager(this));
        recyclerProductos.setHasFixedSize(true);
        if(idEmpresa != null) {
            cargarProductos(idEmpresa, getWindow().getDecorView());
            idEmpresaFinal = idEmpresa;
        } else {
            MensajesToast.toastError("No llego ningun idEmpresa", ServiciosTienda.this, getWindow().getDecorView());
        }
    }

    private void cargarServicios(String idEmpresa, View view) {
        dialog = new ProgressDialog(this);
        dialog.setMessage("Cargando Servicios");
        dialog.show();
        OkHttpClient client = new OkHttpClient();
        String url = Api.API_RUTA + "servicios/lsServicios";
        RequestBody requestBody = new FormBody.Builder()
                .add("idEmpresa", idEmpresa)
                .add("estado", "ACTIVO")
                .build();
        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                Log.e("Error API", "No hay comunicacion con el backend");
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                ServiciosTienda.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.isSuccessful()) {
                            String responseData = null;
                            Servicio servicio = null;
                            try {
                                responseData = response.body().string();
                                JSONObject data = new JSONObject(responseData);
                                JSONArray json = data.optJSONArray("data");
                                if(json.length() == 0) {
                                    dialog.hide();
                                    MensajesToast.toastInfo("No hay servicios disponibles", ServiciosTienda.this, view);
                                } else {
                                    for(int x=0; x<json.length();x++){
                                        servicio = new Servicio();
                                        JSONObject jsonObject = null;
                                        jsonObject = json.getJSONObject(x);
                                        servicio.setId(jsonObject.optString("id"));
                                        servicio.setNombre(jsonObject.optString("nombre"));
                                        servicio.setDescripcion(jsonObject.optString("descripcion"));
                                        // Comprueba si hay descuento para este servicio
                                        if (!jsonObject.isNull("descuento")) {
                                            servicio.setDescuento(String.valueOf(jsonObject.optInt("descuento")));
                                            // Usa el precio con descuento si hay un descuento
                                            servicio.setCostoConDescuento(String.valueOf(jsonObject.optDouble("costoConDescuento")));
                                            servicio.setCosto("Precio: $" + jsonObject.optString("costoConDescuento"));
                                        } else {
                                            // Usa el precio regular si no hay descuento
                                            servicio.setCosto("Precio: $" + jsonObject.optString("costo"));
                                        }
                                        servicio.setDomicilio("Precio a domicilio: $" + jsonObject.optString("domicilio"));
                                        servicio.setImagen(Api.API_RUTA_IMG + jsonObject.optString("imagen"));
                                        listaServicios.add(servicio);
                                    }
                                    AdaptadorServicios adaptadorServicios = new AdaptadorServicios(listaServicios, ServiciosTienda.this);
                                    adaptadorServicios.setOnClickListener(new View.OnClickListener() {
                                        @Override
                                        public void onClick(View view) {
                                            mostrarDialogoAgregarCarrito(listaServicios.get(recyclerServicios.getChildAdapterPosition(view)));
                                        }
                                    });
                                    recyclerServicios.setAdapter(adaptadorServicios);
                                    dialog.hide();
                                }
                            } catch (JSONException | IOException e) {
                                throw new RuntimeException(e);
                            }
                        } else {
                            dialog.hide();
                            MensajesToast.toastError("No existe la ruta ingresada", ServiciosTienda.this, view);
                        }
                    }
                });
            }
        });
    }

    private void cargarProductos(String idEmpresa, View view) {
        dialogProductos = new ProgressDialog(this);
        dialogProductos.setMessage("Cargando Productos");
        dialogProductos.show();
        OkHttpClient client = new OkHttpClient();
        String url = Api.API_RUTA + "productos/lsProductos";
        RequestBody requestBody = new FormBody.Builder()
                .add("idEmpresa", idEmpresa)
                .add("estado", "ACTIVO")
                .build();
        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                Log.e("Error API", "No hay comunicacion con el backend");
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                ServiciosTienda.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.isSuccessful()) {
                            String responseData = null;
                            Producto producto = null;
                            try {
                                responseData = response.body().string();
                                JSONObject data = new JSONObject(responseData);
                                JSONArray json = data.optJSONArray("data");
                                if(json.length() == 0) {
                                    dialogProductos.hide();
                                    MensajesToast.toastInfo("No hay productos disponibles", ServiciosTienda.this, view);
                                } else {
                                    for(int x=0; x<json.length();x++){
                                        producto = new Producto();
                                        JSONObject jsonObject = null;
                                        jsonObject = json.getJSONObject(x);
                                        producto.setId(jsonObject.optString("id"));
                                        producto.setNombre(jsonObject.optString("nombre"));
                                        producto.setDescripcion(jsonObject.optString("descripcion"));
                                        producto.setCosto("Precio: $" + jsonObject.optString("costo"));
                                        producto.setDomicilio("Precio a domicilio: $" + jsonObject.optString("domicilio"));
                                        producto.setImagen(Api.API_RUTA_IMG + jsonObject.optString("imagen"));
                                        listaProductos.add(producto);
                                    }
                                    AdaptadorProductos adaptadorProductos = new AdaptadorProductos(listaProductos, ServiciosTienda.this);
                                    adaptadorProductos.setOnClickListener(new View.OnClickListener() {
                                        @Override
                                        public void onClick(View view) {
                                            mostrarDialogoAgregarCarritoProductos(listaProductos.get(recyclerProductos.getChildAdapterPosition(view)));
                                        }
                                    });
                                    recyclerProductos.setAdapter(adaptadorProductos);
                                    dialogProductos.hide();
                                }
                            } catch (JSONException | IOException e) {
                                throw new RuntimeException(e);
                            }
                        } else {
                            dialogProductos.hide();
                            MensajesToast.toastError("No existe la ruta ingresada", ServiciosTienda.this, view);
                        }
                    }
                });
            }
        });
    }

    private void mostrarDialogoAgregarCarrito(Servicio servicio) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Añadir al carrito");

        View view = LayoutInflater.from(this).inflate(R.layout.dialogo_carrito, null);
        Spinner spinnerCantidad = view.findViewById(R.id.spinnerCantidad);

        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.cantidades, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerCantidad.setAdapter(adapter);

        builder.setView(view);

        builder.setPositiveButton("Sí", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String cantidadSeleccionada = spinnerCantidad.getSelectedItem().toString();
                guardarEnCarrito(servicio.getId(), cantidadSeleccionada, servicio.getNombre(), servicio.getCosto(), servicio.getDomicilio());
            }
        });

        builder.setNegativeButton("No", null);
        builder.show();
    }

    private void mostrarDialogoAgregarCarritoProductos(Producto producto) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Añadir al carrito");

        View view = LayoutInflater.from(this).inflate(R.layout.dialogo_carrito, null);
        Spinner spinnerCantidad = view.findViewById(R.id.spinnerCantidad);

        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.cantidades, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerCantidad.setAdapter(adapter);

        builder.setView(view);

        builder.setPositiveButton("Sí", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String cantidadSeleccionada = spinnerCantidad.getSelectedItem().toString();
                guardarEnCarrito(producto.getId(), cantidadSeleccionada, producto.getNombre(), producto.getCosto(), producto.getDomicilio());
            }
        });

        builder.setNegativeButton("No", null);
        builder.show();
    }

    private void guardarEnCarrito(String idServicio, String cantidad, String nombreServicio, String costo, String domicilio) {
        SharedPreferences prefs = getSharedPreferences("Carrito", MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        // Obteniendo el carrito actual de SharedPreferences
        String jsonCarrito = prefs.getString("carrito", "[]");
        try {
            JSONArray carrito = new JSONArray(jsonCarrito);
            // Crear un nuevo objeto JSONObject para el servicio seleccionado
            JSONObject itemCarrito = new JSONObject();
            itemCarrito.put("idServicio", idServicio);
            itemCarrito.put("cantidad", cantidad);
            itemCarrito.put("nombre", nombreServicio);
            itemCarrito.put("costo", costo);
            itemCarrito.put("domicilio", domicilio);
            itemCarrito.put("idEmpresa", idEmpresaFinal);
            // Comprobar si el servicio ya está en el carrito
            boolean servicioExiste = false;
            for (int i = 0; i < carrito.length(); i++) {
                JSONObject itemExistente = carrito.getJSONObject(i);
                if (itemExistente.getString("idServicio").equals(idServicio)) {
                    // Actualizar la cantidad si el servicio ya existe
                    itemExistente.put("cantidad", cantidad);
                    servicioExiste = true;
                    break;
                }
            }
            // Si el servicio no está en el carrito, añadirlo
            if (!servicioExiste) {
                carrito.put(itemCarrito);
            }
            // Guardar el carrito actualizado en SharedPreferences
            editor.putString("carrito", carrito.toString());
            editor.apply();
            MensajesToast.toastExito("Item añadido al carrito con éxito", ServiciosTienda.this, getWindow().getDecorView());
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


}