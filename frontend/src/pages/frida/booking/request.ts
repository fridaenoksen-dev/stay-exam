import type { Booking, Room } from "./booking.types";

const API_URL = "http://localhost:3000/api";

export async function getBookings(): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/bookings?userId=1`);

  if (!response.ok) {
    throw new Error("Klarte ikke hente bookinger");
  }

  return response.json();
}

export async function deleteBooking(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` },
  });

  if (!response.ok) {
    throw new Error("Klarte ikke slette bookingen");
  }
}

export async function createBooking(
  booking: Omit<Booking, "id" | "created" | "updated">,
): Promise<Booking> {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    throw new Error("Klarte ikke å opprette bookingen");
  }

  return response.json();
}

export async function getRoom(id: number): Promise<Room> {
  const response = await fetch(`${API_URL}/rooms/${id}`);

  if (!response.ok) {
    throw new Error("Klarte ikke å hente rommet");
  }

  return response.json();
}

// EDIT booking funksjon
export async function updateBooking(
  id: number,
  booking: Partial<Omit<Booking, "id" | "created" | "updated">>,
): Promise<Booking> {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    throw new Error("Klarte ikke å endre bookingen");
  }

  return response.json();
}
