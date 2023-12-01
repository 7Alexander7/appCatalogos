package com.utpl.appcatalogos.utilizables;

import android.content.Context;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.utpl.appcatalogos.R;

import cn.pedant.SweetAlert.SweetAlertDialog;

public class MensajesToast {
    //Toast para exito
    public static void toastExito(String mensaje, Context context, View v){
        LayoutInflater layoutInflater = LayoutInflater.from(context);
        View view = layoutInflater.inflate(R.layout.custom_toast, (ViewGroup) v.findViewById(R.id.llCustomToastOk));
        TextView txtMensaje = view.findViewById(R.id.txtMensajeToast);
        txtMensaje.setText(mensaje);
        Toast toast = new Toast(context);
        toast.setGravity(Gravity.CENTER_VERTICAL | Gravity.BOTTOM, 0, 125);
        toast.setDuration(Toast.LENGTH_LONG);
        toast.setView(view);
        toast.show();
    }
    //Toast para error
    public static void toastError(String mensaje, Context context, View v){
        LayoutInflater layoutInflater = LayoutInflater.from(context);
        View view = layoutInflater.inflate(R.layout.custom_toast_error, (ViewGroup) v.findViewById(R.id.llCustomToastError));
        TextView txtMensaje = view.findViewById(R.id.txtMensajeToastError);
        txtMensaje.setText(mensaje);
        Toast toast = new Toast(context);
        toast.setGravity(Gravity.CENTER_VERTICAL | Gravity.BOTTOM, 0, 125);
        toast.setDuration(Toast.LENGTH_LONG);
        toast.setView(view);
        toast.show();
    }
    //Toast para advertencia
    public static void toastInfo(String mensaje, Context context, View v){
        LayoutInflater layoutInflater = LayoutInflater.from(context);
        View view = layoutInflater.inflate(R.layout.custom_toast_info, (ViewGroup) v.findViewById(R.id.llCustomToastInfo));
        TextView txtMensaje = view.findViewById(R.id.txtMensajeToastInfo);
        txtMensaje.setText(mensaje);
        Toast toast = new Toast(context);
        toast.setGravity(Gravity.CENTER_VERTICAL | Gravity.BOTTOM, 0, 125);
        toast.setDuration(Toast.LENGTH_LONG);
        toast.setView(view);
        toast.show();
    }

}
