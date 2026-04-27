import type { Booking, Room } from "./booking.types";

const API_URL = "http://localhost:3000/api";

// GET booking funksjon
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

// GET room funksjon
export async function getRoom(id: number): Promise<Room> {
  const response = await fetch(`${API_URL}/rooms/${id}`);

  if (!response.ok) {
    throw new Error("Klarte ikke å hente rommet");
  }

  return response.json();
}
