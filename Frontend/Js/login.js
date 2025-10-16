document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      mostrarExito("Inicio de sesión exitoso");
      setTimeout(() => window.location.href = "mapa.html", 1000);
    } else {
      mostrarError(data.message || "Credenciales incorrectas");
    }
  } catch {
    mostrarError("Error de conexión con el servidor");
  }
});

function mostrarError(msg) {
  const div = document.getElementById("mensaje");
  div.textContent = msg;
  div.className = "mensaje error";
  div.style.display = "block";
}

function mostrarExito(msg) {
  const div = document.getElementById("mensaje");
  div.textContent = msg;
  div.className = "mensaje exito";
  div.style.display = "block";
}
