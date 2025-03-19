import { APIKEY, BASE_URL } from "./config.js";

const name = document.getElementById("name");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const alertPass = document.getElementById("passwordNot");

// REGISTRARSE
const btnRegistro = document.getElementById("btnRegistro");
if (btnRegistro) {
  btnRegistro.addEventListener("click", register);
}

async function register() {
  // Validar si las contraseñas coinciden
  if (password.value !== password2.value) {
    alertPass.classList.remove("hidden");
    return;
  }

  const requestOptions = {
    method: "POST",
    headers: {
      apikey: APIKEY,
      "Content-Type": "application.json",
    },
    body: JSON.stringify({
      name: name.value,
      userName: userName.value,
      email: email.value,
      password: password.value,
    }),
  };

  const response = await fetch(`${BASE_URL}/auth/v1/signup`, requestOptions);
  if (!response.ok) {
    alert("Error en el registro");
  }

  const result = await response.json();

  localStorage.setItem("token", result.access_token);
  localStorage.setItem("user_id", result.user.id);

  window.location.href = "/dashboard.html";
}
