import type { User } from "./types";

const API_URL = "http://localhost:3000/api";

// GET Hent en bruker
export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) throw new Error("Klarte ikke hente bruker");
  return response.json();
}

// POST Opprett bruker
export async function createUser(
  user: Omit<User, "id" | "created" | "updated">,
): Promise<User> {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
     },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Klarte ikke opprette bruker");
  return response.json();
}

// PATCH Oppdater bruker
export async function updateUser(
  id: number,
  user: Partial<Omit<User, "id" | "created" | "updated">>,
): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Klarte ikke oppdatere bruker");
  return response.json();
}

// DELETE Slett bruker
export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  });
  if (!response.ok) throw new Error("Klarte ikke slette bruker");
}
