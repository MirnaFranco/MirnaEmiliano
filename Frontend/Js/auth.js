function verificarSesion() {
  const token = localStorage.getItem("token");
  const anon = localStorage.getItem("modoAnonimo");

  if (!token && !anon) {
    alert("Debes iniciar sesión o ingresar en modo anónimo para acceder al mapa");
    window.location.href = "login.html";
  }
}

function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("modoAnonimo");
  alert("Sesión cerrada correctamente");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("logoutBtn");
  if (btn) btn.addEventListener("click", cerrarSesion);
});
