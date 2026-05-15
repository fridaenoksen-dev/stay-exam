// Iben Ravn

import { createUser } from "../request";
import type { User } from "../types";

// Faner
const tabLogin = document.getElementById("tab-login") as HTMLButtonElement;
const tabRegister = document.getElementById(
  "tab-register",
) as HTMLButtonElement;
const panelLogin = document.getElementById("panel-login") as HTMLDivElement;
const panelRegister = document.getElementById(
  "panel-register",
) as HTMLDivElement;

function switchTab(active: "login" | "register"): void {
  const isLogin = active === "login";

  tabLogin.classList.toggle("active", isLogin);
  tabRegister.classList.toggle("active", !isLogin);
  panelLogin.classList.toggle("active", isLogin);
  panelRegister.classList.toggle("active", !isLogin);

  tabLogin.setAttribute("aria-selected", String(isLogin));
  tabRegister.setAttribute("aria-selected", String(!isLogin));
}

tabLogin.addEventListener("click", () => switchTab("login"));
tabRegister.addEventListener("click", () => switchTab("register"));

document.getElementById("link-to-register")?.addEventListener("click", (e) => {
  e.preventDefault();
  switchTab("register");
});

document.getElementById("link-to-login")?.addEventListener("click", (e) => {
  e.preventDefault();
  switchTab("login");
});

// Logg inn
const formLogin = document.getElementById("form-login") as HTMLFormElement;

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = (document.getElementById("login-email") as HTMLInputElement).value;
  const password = (document.getElementById("login-password") as HTMLInputElement).value;

  try {
    const response = await fetch("http://localhost:3000/api/users");
    if (!response.ok) throw new Error("Klarte ikke hente brukere");

    const users: User[] = await response.json();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      alert("Feil e-post eller passord");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/userProfile.html";

  } catch (error) {
    console.error(error);
    alert("Noe gikk galt. Prøv igjen.");
  }
});

// Registrer
const formRegister = document.getElementById("form-register") as HTMLFormElement;

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = (document.getElementById("reg-name") as HTMLInputElement).value;
  const email = (document.getElementById("reg-email") as HTMLInputElement).value;
  const password = (document.getElementById("reg-password") as HTMLInputElement).value;
  const confirm = (document.getElementById("reg-password-confirm") as HTMLInputElement).value;

  if (password !== confirm) {
    alert("Passordene stemmer ikke overens");
    return;
  }

  if (password.length < 8) {
    alert("Passordet må være minst 8 tegn");
    return;
  }

  try {
    const newUser = await createUser({
      userName: name,
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(newUser));
    window.location.href = "/userProfile.html";

  } catch (error) {
    console.error(error);
    alert("Klarte ikke opprette bruker. Prøv igjen.");
  }
});

