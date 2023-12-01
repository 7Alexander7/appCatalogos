package com.utpl.appcatalogos.fragments;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.utpl.appcatalogos.R;
public class HomeFragment extends Fragment {

    TextView usuario;
    String nombreUsuario;
    View myView;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        myView = inflater.inflate(R.layout.fragment_home, container, false);
        SharedPreferences session = this.getActivity().getSharedPreferences("datosUsuario", Context.MODE_PRIVATE);
        nombreUsuario = session.getString("nombres", "-") + " " + session.getString("apellidos", "-");
        usuario = myView.findViewById(R.id.txtUsuarioSesion);
        usuario.setText(nombreUsuario);

        return myView;
    }
}