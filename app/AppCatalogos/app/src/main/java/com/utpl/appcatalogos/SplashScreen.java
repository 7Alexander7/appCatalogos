package com.utpl.appcatalogos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.widget.ProgressBar;

import java.util.Timer;
import java.util.TimerTask;

public class SplashScreen extends AppCompatActivity {

    ProgressBar pb;
    int i = 1;
    Timer timer = new Timer();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);
        pb = findViewById(R.id.progressBar);
        pb.setMax(3);
        llenar();
        new Handler().postDelayed(new Runnable(){
            public void run(){
                if(cargarSesion()) {
                    startActivity(new Intent(SplashScreen.this, MainActivity.class));
                    finish();
                } else {
                    startActivity(new Intent(SplashScreen.this, Login.class));
                    finish();
                }
            };
        }, 3000);

    }

    private boolean cargarSesion(){
        SharedPreferences session = getSharedPreferences("datosUsuario", Context.MODE_PRIVATE);
        String usuario = session.getString("idUsuario", "nada");
        if(usuario.equals("nada")){
            return false;
        }else{
            return true;
        }
    }

    public void llenar(){
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                AsyncTask mytask = new AsyncTask() {
                    @Override
                    protected Object doInBackground(Object[] objects) {
                        new Handler(Looper.getMainLooper()).post(new Runnable() {
                            @Override
                            public void run() {
                                pb.setProgress(i);
                                i++;
                            }
                        });
                        return null;
                    }
                };
                mytask.execute();
            }
        };
        timer.schedule(task,0,1000);
    }

    @Override
    public void onBackPressed() {}

}