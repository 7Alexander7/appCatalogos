modificarTitulo('Servicios / Nuevo Servicio')
var imagen = null
var nombreImagen = ""
var tmp = JSON.parse(sessionStorage.getItem('datos'))
document.getElementById('idEmpresa').value = tmp.idEmpresa


document.getElementById('imageUpload').addEventListener('change', function (event) {
  imagen = event.target.files[0];
  var imageType = /image.*/;

  if (imagen && imagen.type.match(imageType)) {
    var reader = new FileReader();

    reader.onload = function () {
      var img = document.getElementById('previewImage');
      img.src = reader.result;
      document.getElementsByClassName('dropdown__preview')[0].style.display = 'block';
      document.getElementById('uploadButton').style.display = 'block';
    }

    reader.readAsDataURL(imagen);
  }
});

document.getElementById('uploadButton').addEventListener('click', function () {

  const formData = new FormData();
  formData.append('image', imagen);

  fetch(ipServidor + 'api/subirImagen', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      return response.json()
    })
    .then(json => {
      if (json.success == true) {
        nombreImagen = json.nombre
        console.log('nombre imagen: ' + nombreImagen)
        document.getElementById('uploadButton').style.display = 'none';
        document.getElementById('labelImageUpload').style.display = 'none';
        notificaciones("SERVICIOS", "se ha guardado la imagen exitosamente", "bien")
      } else {
        notificaciones("SERVICIOS", "ha existido un error vuelva a intentarlo", "mal")
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});




// Obtener los datos de los inputs y almacenarlos en un objeto
function guardar(e) {
  e.preventDefault();
  var datos = {};

  // Obtener los valores de los inputs
  var nombre = document.getElementById('nombre').value;
  var descripcion = document.getElementById('descripcion').value;
  var costo = document.getElementById('costo').value;
  var domicilio = document.getElementById('domicilio').value;
  var idEmpresa = document.getElementById('idEmpresa').value

  // Almacenar los valores en el objeto datos
  datos.nombre = nombre;
  datos.descripcion = descripcion;
  datos.costo = costo;
  datos.domicilio = domicilio;
  datos.idEmpresa = idEmpresa;

  if (idEmpresa != undefined && idEmpresa != null && idEmpresa != "") {
    if (nombreImagen != "" && imagen != null) {
      datos.nombreImagen = nombreImagen
      fetch(ipServidor + 'api/servicios/nuevo', {
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(datos)
      })
        .then(response => {
          return response.json()
        })
        .then(json => {
          if (json.success == true) {
            notificaciones("SERVICIOS", "los datos se han almacenado correctamente", "bien")
          } else {
            notificaciones("SERVICIOS", "ha existido un error vuelva a intentarlo", "mal")
          }
          limpiarInputs()
        })
        .catch(err => {
          console.log(err)
        });
    } else {
      notificaciones("SERVICIOS", "debe subir primero una imagen del servicio", "mal")
    }
  } else {
    notificaciones("SERVICIOS", "ha ocurrido un error", "mal")
  }
}

// Limpiar todos los inputs
function limpiarInputs() {
  document.getElementById('nombre').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('costo').value = '';
  document.getElementById('domicilio').value = '';
}