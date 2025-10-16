document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validación contraseña segura
  const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!regexPassword.test(password)) {
    mostrarError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      mostrarExito("Usuario registrado correctamente. Iniciá sesión.");
      setTimeout(() => window.location.href = "login.html", 2000);
    } else {
      mostrarError(data.message || "Error al registrarse");
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
