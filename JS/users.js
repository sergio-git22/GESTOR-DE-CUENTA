import { APIKEY, BASE_URL } from "./config.js";
import { logout, getToken } from "./auth.js";

const perfil = document.getElementById("perfil");
// const currentUserId = localStorage.getItem("user_id");

// OBTENER INFO DEL USUARIO
async function getInfoUser(user_id) {
  const requestOptions = {
    method: "GET",
    headers: {
      apikey: APIKEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };
  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/Users?user_id=eq.${user_id}`,
      requestOptions
    );

    if (!response.ok) {
      alert("No se pudo obtener la información del usuario");
      return;
    }

    const userData = await response.json();

    window.location.href = "/dashboard.html";
  } catch (error) {
    console.error("No se pudo obtener información del usuario", error);
    return null;
  }
}

// MOSTRAR INFO DEL USUARIO
async function showInfoUser() {
  const user = JSON.parse(localStorage.getItem("usuarioRegistrado"));

  if (user) {
    const perfilDiv = document.getElementById("perfil");

    perfilDiv.innerHTML = `
    <h3 class="m-auto font-bold text-2xl mb-3 underline">MI PERFIL</h3>
    <p><span class="font-bold">Nombre y apellidos:</span> ${user.name}</p>
    <p><span class="font-bold">Usuario:</span> ${user.userName}</p>
    <p><span class="font-bold">Correo electrónico:</span> ${user.email}</p>
    <p><span class="font-bold">Tu foto de perfil:</span></p>
    <img src="${user.image}" alt="Foto de perfil" class="w-32 h-32 rounded-full border-2 border-pink-500 mt-2" />
  `;
  } else {
    alert("Error al mostrar la información del usuario");
  }
}

// CERRAR SESIÓN
const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
  btnLogout.addEventListener("click", logout);
}

getInfoUser();
showInfoUser();
