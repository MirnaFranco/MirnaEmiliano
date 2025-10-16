const reportForm = document.getElementById("reportForm");
const mensajeDiv = document.getElementById("mensaje");

reportForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario_id = localStorage.getItem("usuarioActivo") || null;
  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const latitud = parseFloat(document.getElementById("latitud").value);
  const longitud = parseFloat(document.getElementById("longitud").value);
  const tipo = document.getElementById("tipo").value;

  try {
    const res = await fetch("http://localhost:3000/incidentes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id, titulo, descripcion, latitud, longitud, tipo })
    });
    const data = await res.json();

    if(res.ok){
      mensajeDiv.textContent = data.message;
      mensajeDiv.className = "mensaje exito";
      mensajeDiv.style.display = "block";
      reportForm.reset();
    } else {
      mensajeDiv.textContent = data.message || "Error al reportar";
      mensajeDiv.className = "mensaje error";
      mensajeDiv.style.display = "block";
    }
  } catch {
    mensajeDiv.textContent = "Error de conexión con el servidor";
    mensajeDiv.className = "mensaje error";
    mensajeDiv.style.display = "block";
  }
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("usuarioActivo");
  location.href = "index.html";
});
