import { isUserLogged, logout } from "./auth.js";

const token = localStorage.getItem("token");
const user_id = localStorage.getItem("user_id");

// Si el token no coincide con el user_id, no se abre sesión
if (!token || !user_id) {
  logout();
}

async function checkUser() {
  console.log(token);
  const isLogged = await isUserLogged(token, user_id);

  if (!isLogged) {
    logout();
    window.location.href = "index.html";
  }
}

checkUser();
