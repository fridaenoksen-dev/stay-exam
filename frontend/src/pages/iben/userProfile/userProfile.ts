// Iben Ravn

import { getUser, updateUser, deleteUser } from "../request";
import type { User } from "../types";

// Hent innlogget bruker fra localStorage
const stored = localStorage.getItem("user");
if (!stored) {
  window.location.href = "/login.html";
}
const currentUser: User = JSON.parse(stored!);

// Fyll inn brukerdata 
function populateProfile(user: User): void {
  // Sidebar
  const nameEl = document.querySelector(".profile-name");
  const emailEl = document.querySelector(".profile-email");
  if (nameEl) nameEl.textContent = user.userName;
  if (emailEl) emailEl.textContent = user.email;

  // Skjema Personlig info
  const nameParts = user.userName.split(" ");
  (document.getElementById("first-name") as HTMLInputElement).value = nameParts[0] ?? "";
  (document.getElementById("last-name") as HTMLInputElement).value = nameParts.slice(1).join(" ") ?? "";
  (document.getElementById("email") as HTMLInputElement).value = user.email;
}


// Rediger-knapp
function setupEditSection(
  btnEditId: string,
  btnCancelId: string,
  actionsId: string,
  formId: string
): void {
  const btnEdit = document.getElementById(btnEditId);
  const btnCancel = document.getElementById(btnCancelId);
  const actions = document.getElementById(actionsId);
  const inputs = document.getElementById(formId)?.querySelectorAll("input");

  btnEdit?.addEventListener("click", () => {
    inputs?.forEach((input) => input.removeAttribute("disabled"));
    actions?.classList.add("visible");
    btnEdit.style.display = "none";
  });

  btnCancel?.addEventListener("click", () => {
    inputs?.forEach((input) => input.setAttribute("disabled", "true"));
    actions?.classList.remove("visible");
    btnEdit!.style.display = "";
    populateProfile(currentUser);
  });
}


// Lagre personlig info
const formPersonal = document.getElementById("form-personal") as HTMLFormElement;
formPersonal?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = (document.getElementById("first-name") as HTMLInputElement).value;
  const lastName = (document.getElementById("last-name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;

  try {
    const updated = await updateUser(currentUser.id, {
      userName: `${firstName} ${lastName}`.trim(),
      email,
    });

    localStorage.setItem("user", JSON.stringify(updated));
    populateProfile(updated);

    formPersonal.querySelectorAll("input").forEach((i) => i.setAttribute("disabled", "true"));
    document.getElementById("actions-personal")?.classList.remove("visible");
    document.getElementById("btn-edit-personal")!.style.display = "";

    alert("Profil oppdatert!");
  } catch (error) {
    console.error(error);
    alert("Klarte ikke oppdatere profilen.");
  }
});

// Endre passord
const formPassword = document.getElementById("form-password") as HTMLFormElement;
formPassword?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const current = (document.getElementById("current-password") as HTMLInputElement).value;
  const newPass = (document.getElementById("new-password") as HTMLInputElement).value;
  const confirm = (document.getElementById("confirm-password") as HTMLInputElement).value;

  if (current !== currentUser.password) {
    alert("Nåværende passord er feil");
    return;
  }

  if (newPass.length < 8) {
    alert("Nytt passord må være minst 8 tegn");
    return;
  }

  if (newPass !== confirm) {
    alert("Passordene stemmer ikke overens");
    return;
  }

  try {
    const updated = await updateUser(currentUser.id, { password: newPass });
    localStorage.setItem("user", JSON.stringify(updated));
    formPassword.reset();
    alert("Passord oppdatert!");
  } catch (error) {
    console.error(error);
    alert("Klarte ikke oppdatere passord.");
  }
});

// Slett konto
document.getElementById("btn-delete-account")?.addEventListener("click", async () => {
  const confirmed = confirm("Er du sikker? Dette kan ikke angres.");
  if (!confirmed) return;

  try {
    await deleteUser(currentUser.id);
    localStorage.removeItem("user");
    window.location.href = "/login.html";
  } catch (error) {
    console.error(error);
    alert("Klarte ikke slette kontoen.");
  }
});

// Logg ut
document.querySelector(".btn-logout")?.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/login.html";
});

// Setup
setupEditSection("btn-edit-personal", "btn-cancel-personal", "actions-personal", "form-personal");
setupEditSection("btn-edit-address", "btn-cancel-address", "actions-address", "form-address");

async function init(): Promise<void> {
  const freshUser = await getUser(currentUser.id);
  localStorage.setItem("user", JSON.stringify(freshUser));
  populateProfile(freshUser);
}

init();