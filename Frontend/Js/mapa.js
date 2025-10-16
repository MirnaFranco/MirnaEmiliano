

const mapa = L.map('mapa-formosa').setView([-26.17, -58.17], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(mapa);

const alertaDiv = document.getElementById("alerta");
let incidentesPrevios = [];

function mostrarAlerta(texto) {
  alertaDiv.textContent = texto;
  alertaDiv.style.display = "block";
  setTimeout(() => { alertaDiv.style.display = "none"; }, 5000);
}

async function cargarIncidentes() {
  const res = await fetch("http://localhost:3000/incidentes");
  const incidentes = await res.json();

  // Limpiar marcadores
  mapa.eachLayer(layer => {
    if(layer instanceof L.CircleMarker) mapa.removeLayer(layer);
  });

  const latUser = parseFloat(localStorage.getItem("latitudUsuario") || -26.17);
  const lonUser = parseFloat(localStorage.getItem("longitudUsuario") || -58.17);

  incidentes.forEach(i => {
    const color = i.tipo === "Robo" ? "red" : i.tipo === "Violencia" ? "orange" : "blue";
    const marker = L.circleMarker([i.latitud, i.longitud], {
      radius: 8,
      color: color,
      fillOpacity: 0.7
    }).addTo(mapa)
      .bindPopup(`<b>${i.titulo}</b><br>${i.descripcion}<br>Tipo: ${i.tipo}`);

    // ALERTAS CERCANAS (menos de 1km)
    const distancia = getDistanceFromLatLonInKm(latUser, lonUser, i.latitud, i.longitud);
    if(distancia < 1 && !incidentesPrevios.includes(i.id)){
      mostrarAlerta(`Alerta: ${i.tipo} cerca de tu ubicación!`);
      incidentesPrevios.push(i.id);
    }
  });
}

cargarIncidentes();
setInterval(cargarIncidentes, 15000); // refresco cada 15s

// Función Haversine para distancia entre coordenadas
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2){
  const R = 6371;
  const dLat = deg2rad(lat2-lat1);
  const dLon = deg2rad(lon2-lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R*c;
}
function deg2rad(deg){ return deg * (Math.PI/180); }

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("usuarioActivo");
  location.href = "index.html";
});
