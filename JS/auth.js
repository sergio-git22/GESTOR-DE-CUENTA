import { APIKEY, BASE_URL } from "./config.js";

const name = document.getElementById("name");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const image = document.getElementById("image");
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      password2: password2.value,
      optins: {
        data: {
          name: name.value,
          userName: userName.value,
          image: image.value,
        },
      },
    }),
  };

  const response = await fetch(`${BASE_URL}/auth/v1/signup`, requestOptions);
  if (!response.ok) {
    alert("Error en el registro");
  }

  const result = await response.json();

  localStorage.setItem("token", result.access_token);
  localStorage.setItem("user_id", result.user_id);

  saveUsers();

  window.location.href = "/dashboard.html";
}

// LOGIN
const btnLogin = document.getElementById("btnInicio");
if (btnLogin) {
  btnLogin.addEventListener("click", login);
}

async function login() {
  const requestOptions = {
    method: "POST",
    headers: {
      apikey: APIKEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  };

  const response = await fetch(
    `${BASE_URL}/auth/v1/token?grant_type=password`,
    requestOptions
  );
  if (!response.ok) {
    alert("Error al iniciar sesión");
    return;
  }

  const result = await response.json();

  localStorage.setItem("token", result.access_token);
  localStorage.setItem("user_id", result.user_id);

  window.location.href = "/dashboard.html";
}

// CERRAR SESIÓN
const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
  btnLogout.addEventListener("click", logout);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");

  window.location.href = "/index.html";
}

// COMPROBAR SI EL USUARIO ESTÁ REGISTRADO
export async function isUserLogged(access_token, user_id) {
  const requestOptions = {
    method: "GET",
    headers: {
      apikey: APIKEY,
      "Content-Type": "application.json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await fetch(`${BASE_URL}/auth/v1/user`, requestOptions);
  if (!response.ok) {
    alert("Error en la comprobación");
    return false;
  }

  const result = await response.json();

  if (result.id == user_id) {
    return true;
  }

  return false;
}

// OBTENER EL TOKEN DE ACCESO
export function getToken() {
  return localStorage.getItem("token");
}

// GUARDAR USUARIOS EN SUPABASE
async function saveUsers() {
  const requestOptions = {
    method: "POST",
    headers: {
      apikey: APIKEY,
      Authorization: `Bearer${result.access_token}`,
      "Content-Type": "application/json",
    },
  };
  await fetch(`${BASE_URL}/rest/v1/Users`, requestOptions);

  body: JSON.stringify({
    user_id: result.user.id,
    name: name.value,
    userName: userName.value,
    email: email.value,
    password: password.value,
    password2: password2.value,
    image: image.value,
  });
}
