package com.utpl.appcatalogos;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.utpl.appcatalogos.utilizables.MensajesToast;

public class MapsFragment extends Fragment implements OnMapReadyCallback {

    private GoogleMap mMap;
    private Marker marker;

    SharedPreferences sharedPreferences;
    public static final String PREFS_NAME = "MyPrefs";
    public static final String LATITUDE_KEY = "latitude_key";
    public static final String LONGITUDE_KEY = "longitude_key";

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_maps, container, false);  // Cambia esto si el nombre de tu XML es diferente

        SupportMapFragment mapFragment = (SupportMapFragment) getChildFragmentManager().findFragmentById(R.id.map);
        if (mapFragment != null) {
            mapFragment.getMapAsync(this);
        }



        ImageView confirmLocationButton = rootView.findViewById(R.id.confirmLocationButton);
        confirmLocationButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Aquí puedes realizar acciones al confirmar la ubicación
                if (marker != null) {
                    LatLng position = marker.getPosition();
                    sharedPreferences = getActivity().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
                    SharedPreferences.Editor editor = sharedPreferences.edit();
                    editor.putFloat(LATITUDE_KEY, (float) position.latitude);
                    editor.putFloat(LONGITUDE_KEY, (float) position.longitude);
                    editor.apply();
                    MensajesToast.toastExito("Ubicación guardada exitosamente", getContext(), v);
                    getActivity().finish();
                }
            }
        });

        return rootView;
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        LatLng initialPosition = new LatLng(-3.692642, -79.610768);  // Puedes cambiar esto a una posición inicial que prefieras
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(initialPosition, 14));

        marker = mMap.addMarker(new MarkerOptions().position(initialPosition).draggable(true));

        mMap.setOnMarkerDragListener(new GoogleMap.OnMarkerDragListener() {
            @Override
            public void onMarkerDragStart(Marker arg0) {
                // Aquí puedes realizar acciones al comenzar a arrastrar el marcador
            }

            @Override
            public void onMarkerDragEnd(Marker arg0) {
                LatLng position = arg0.getPosition();
                // position.latitude y position.longitude tienen la latitud y longitud actualizadas
            }

            @Override
            public void onMarkerDrag(Marker arg0) {
                // Aquí puedes realizar acciones mientras el marcador está siendo arrastrado
            }
        });
    }
}