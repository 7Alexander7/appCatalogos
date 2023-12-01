package com.utpl.appcatalogos;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.utpl.appcatalogos.databinding.ActivityMainBinding;
import com.utpl.appcatalogos.fragments.HistorialFragment;
import com.utpl.appcatalogos.fragments.HomeFragment;
import com.utpl.appcatalogos.fragments.PerfilFragment;
import com.utpl.appcatalogos.fragments.TiendasFragment;
import com.utpl.appcatalogos.utilizables.MensajesToast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    ActivityMainBinding binding;
    FloatingActionButton carrito;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        carrito = findViewById(R.id.fab);

        carrito.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SharedPreferences prefs = getSharedPreferences("Carrito", MODE_PRIVATE);
                String jsonCarrito = prefs.getString("carrito", "[]");
                if(jsonCarrito.equals("[]")){
                    MensajesToast.toastInfo("El carrito está vacio", MainActivity.this, getWindow().getDecorView());
                } else {
                    mostrarCarrito();
                }
            }
        });

        insertFragment(new HomeFragment());

        binding.bottomNavigationView.setOnItemSelectedListener(item -> {
            switch (item.getItemId()){
                case R.id.inicio:
                    insertFragment(new HomeFragment());
                    break;
                case R.id.perfil:
                    insertFragment(new PerfilFragment());
                    break;
                case R.id.tiendas:
                    insertFragment(new TiendasFragment());
                    break;
                case R.id.historial:
                    insertFragment(new HistorialFragment());
                    break;
                case R.id.salir:
                    AlertDialog.Builder builder1 = new AlertDialog.Builder(this);
                    builder1.setMessage("Está seguro que desea cerrar la sesión");
                    builder1.setCancelable(true);
                    builder1.setPositiveButton(
                            "Si",
                            new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int id) {
                                    Intent intent = new Intent(getApplicationContext(), Login.class);
                                    startActivity(intent);
                                }
                            });
                    builder1.setNegativeButton(
                            "No",
                            new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int id) {
                                    dialog.cancel();
                                }
                            });
                    AlertDialog alert11 = builder1.create();
                    alert11.show();
                    break;
            }
            return true;
        });
    }

    private void insertFragment(Fragment fragment){
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.frame_layout, fragment);
        fragmentTransaction.commit();
    }

    @Override
    public void onBackPressed() {
        AlertDialog.Builder builder1 = new AlertDialog.Builder(this);
        builder1.setMessage("Está seguro que desea cerrar la sesión");
        builder1.setCancelable(true);
        builder1.setPositiveButton(
                "Si",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        SharedPreferences.Editor editor = getSharedPreferences("sesion", MODE_PRIVATE).edit();
                        editor.clear().apply();
                        Intent intent = new Intent(getApplicationContext(), Login.class);
                        startActivity(intent);
                        finish();
                    }
                });
        builder1.setNegativeButton(
                "No",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                    }
                });
        AlertDialog alert11 = builder1.create();
        alert11.show();
    }

    private void mostrarCarrito() {
        SharedPreferences prefs = getSharedPreferences("Carrito", MODE_PRIVATE);
        String jsonCarrito = prefs.getString("carrito", "[]");
        StringBuilder carritoInfo = new StringBuilder();
        Log.i("Carrito", jsonCarrito);
        try {
            JSONArray carrito = new JSONArray(jsonCarrito);
            for (int i = 0; i < carrito.length(); i++) {
                JSONObject itemCarrito = carrito.getJSONObject(i);
                String idServicio = itemCarrito.getString("idServicio");
                String nombre = itemCarrito.getString("nombre");
                String cantidad = itemCarrito.getString("cantidad");
                String costo = itemCarrito.getString("costo");
                carritoInfo.append("ID: ").append(idServicio)
                        .append(" - Item: ").append(nombre)
                        .append(" - Cantidad: ").append(cantidad)
                        .append(" - Costo: ").append(costo).append("\n\n");
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Carrito de compras");
        builder.setMessage(carritoInfo.toString());
        builder.setPositiveButton("Vaciar Carrito", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                vaciarCarrito();
                MensajesToast.toastInfo("El carrito ha sido vaciado con éxito", MainActivity.this, getWindow().getDecorView());
            }
        });
        builder.setNegativeButton("Solicitar", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                Intent intent = new Intent(getApplicationContext(), FinalizarPedido.class);
                startActivity(intent);
            }
        });
        builder.create().show();
    }

    private void vaciarCarrito() {
        SharedPreferences prefs = getSharedPreferences("Carrito", MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.remove("carrito");
        editor.apply();
    }

}