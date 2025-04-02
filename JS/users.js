import { APIKEY, BASE_URL } from "config.js";
import { logout, getToken } from "auth.js";

const datos = document.getElementById("perfil");

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
}

getUsers();
