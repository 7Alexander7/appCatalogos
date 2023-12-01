modificarTitulo('Reporte / Dashboard')
fetch(ipServidor + 'api/reporte/rpVentasTiendaServicios', {
  headers: {
    'Content-type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({
    idEmpresa: varIdEmpresa,
  })
})
  .then(response => {
    return response.json()
  })
  .then(json => {
    const dataFromBackend = json.data
    const labels = []; // Nombres de las barras (campo "nombre")
    const datasets = []; // Datos agrupados por mes
    const colores = [];

    dataFromBackend.forEach(item => {
      const label = monthsMap[item.mes];
      const total = item.total;

      // Agregar el nombre de la barra a los labels
      if (!labels.includes(label)) {
        labels.push(label);
      }

      datasets.push(total);
      colores.push(getRandomColor())
    });


    // Dibujar el gráfico de barras
    const ctx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          backgroundColor: colores,
          data: datasets
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  })
  .catch(err => {
    console.log(err)
  });

fetch(ipServidor + 'api/reporte/rpVentasTiendaPieServicio', {
  headers: {
    'Content-type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({
    idEmpresa: varIdEmpresa,
  })
})
  .then(response => {
    return response.json()
  })
  .then(json => {
    const dataFromBackend = json.data
    const labels = []; // Nombres de las barras (campo "nombre")
    const datasets = []; // Datos agrupados por mes
    const colores = [];

    dataFromBackend.forEach(item => {
      const label = item.nombre;
      const total = item.cantidad;

      // Agregar el nombre de la barra a los labels
      if (!labels.includes(label)) {
        labels.push(label);
      }

      datasets.push(total);
      colores.push(getRandomColor())
    });

    const ctx = document.getElementById('pieServicios').getContext('2d');
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [{
          backgroundColor: colores,
          data: datasets
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
    });
  })
  .catch(err => {
    console.log(err)
  });
fetch(ipServidor + 'api/reporte/rpVentasTiendaPieDomicilio', {
  headers: {
    'Content-type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({
    idEmpresa: varIdEmpresa,
  })
})
  .then(response => {
    return response.json()
  })
  .then(json => {
    const dataFromBackend = json.data
    const labels = []; // Nombres de las barras (campo "nombre")
    const datasets = []; // Datos agrupados por mes
    const colores = [];

    dataFromBackend.forEach(item => {
      var label
      if (item.domicilio == "SI") {
        label = "A Domiclio"
      } else {
        label = "En Local"
      }
      const total = item.cantidad;

      // Agregar el nombre de la barra a los labels
      if (!labels.includes(label)) {
        labels.push(label);
      }

      datasets.push(total);
      colores.push(getRandomColor())
    });

    const ctx = document.getElementById('pieDomicilios').getContext('2d');
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          backgroundColor: colores,
          data: datasets
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
    });
  })
  .catch(err => {
    console.log(err)
  });




// Función para obtener colores aleatorios
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const monthsMap = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre',
};