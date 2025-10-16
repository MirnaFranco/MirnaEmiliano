async function cargarEstadisticas() {
  const res = await fetch("http://localhost:3000/estadisticas");
  const data = await res.json();

  const ctx = document.getElementById('graficoTipos').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.tipo),
      datasets: [{
        label: 'Cantidad de incidentes',
        data: data.map(d => d.total),
        backgroundColor: 'rgba(15,81,50,0.7)'
      }]
    },
    options: { responsive: true }
  });
}
cargarEstadisticas();

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("usuarioActivo");
  location.href = "index.html";
});
