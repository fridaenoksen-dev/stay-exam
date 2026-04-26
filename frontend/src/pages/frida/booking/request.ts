import type { Booking } from "./booking.types";

const API_URL = "http://localhost:3000/api";

// GET funksjon
export async function getBookings(): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/bookings`);

  if (!response.ok) {
    throw new Error("Klarte ikke hente bookinger");
  }

  return response.json();
}

// DELETE funksjon
export async function deleteBooking(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${import.meta.env.API_KEY}` },
  });

  if (!response.ok) {
    throw new Error("Klarte ikke slette bookingen");
  }
}
