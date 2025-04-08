import { APIKEY, BASE_URL } from "./config.js";
import { logout, getToken } from "./auth.js";

const perfil = document.getElementById("perfil");
const currentUserId = localStorage.getItem("user_id");

// OBTENER USUARIOS
async function getUsers() {
  const requestOptions = {
    method: "GET",
    headers: {
      apikey: APIKEY,
      "Content-Type": "application/json",
      Authorization: `Bearer${getToken()}`,
    },
  };

  const response = await fetch(`${BASE_URL}/rest/v1/Users`, requestOptions);
  if (!response.ok) {
    alert("Error en la petición");
    return false;
  }

  const result = await response.json();

  console.log(result);
  printUser(result);
}

// OBTENER INFO DEL USUARIO
async function getInfoUser(currentUserId) {
  if (!currentUserId) {
    console.error("El user_id no se ha encontrado en localStorage");
    return null;
  }

  console.log("currentUserId:", currentUserId);

  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/Users?user_id=eq.${currentUserId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: APIKEY,
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    return null;
  }
}

// PINTAR DATOS DE USUARIO
async function printUser() {
  if (!currentUserId) {
    console.error("No hay usuario logueado");
    return;
  }

  const userInfo = await getInfoUser(currentUserId);

  if (!userInfo) {
    console.error("No se pudo obtener la información del usuario");
    return;
  }

  perfil.innerHTML = `
  <h1>Mi perfil</h1>
  <p><strong>Nombre y apellidos:</strong>${userInfo.name || "Desconocido"}</p>
  <p><strong>Usuario:</strong>${userInfo.userName || "Desconocido"}</p>
  <p><strong>Correo electrónico:</strong>${
    userInfo.email || "Email no encontrado"
  }</p>
  <p><strong>Tu foto de perfil:</strong>${
    userInfo.image || "Formato de imagen no admitido"
  }</p>`;
}

getUsers();
