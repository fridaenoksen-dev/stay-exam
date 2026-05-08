import type { Room, Review } from "./types";

const API_URL = "http://localhost:3000/api";

// GET: Hente opp rommet
export async function getRoom(id: number): Promise<Room> {
  const response = await fetch(`${API_URL}/rooms/${id}`);

  if (!response.ok) {
    throw new Error("Klarte ikke å vise rommet");
  }

  return response.json();
}

// POST: legge til en ny anmeldelse
export async function addReview(
  roomId: number,
  review: Omit<Review, "id" | "created" | "updated">,
): Promise<Room> {
  const room = await getRoom(roomId);

  const newReview = {
    ...review,
    id: Date.now(),
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  };

  const updatedReviews = [...room.reviews, newReview];

  const response = await fetch(`${API_URL}/rooms/${roomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify({ reviews: updatedReviews }),
  });

  if (!response.ok) {
    throw new Error("Klarte ikke å legge til anmeldelsen");
  }

  return response.json();
}

// PATCH: redigere anmeldelse
export async function updateReview(
  roomId: number,
  reviewId: number,
  updated: Partial<Review>,
): Promise<Room> {
  const room = await getRoom(roomId);

  const updatedReviews = room.reviews.map((review) =>
    review.id === reviewId
      ? { ...review, ...updated, updated: new Date().toISOString() }
      : review,
  );

  const response = await fetch(`${API_URL}/rooms/${roomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify({ reviews: updatedReviews }),
  });

  if (!response.ok) {
    throw new Error("Klarte ikke å oppdatere anmeldelsen");
  }

  return response.json();
}

// DELETE: slette anmeldelsen
export async function deleteReview(
  roomId: number,
  reviewId: number,
): Promise<Room> {
  const room = await getRoom(roomId);

  const updatedReviews = room.reviews.filter(
    (review) => review.id !== reviewId,
  );

  const response = await fetch(`${API_URL}/rooms/${roomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify({ reviews: updatedReviews }),
  });

  if (!response.ok) {
    throw new Error("Klarte ikke å slette anmeldelsen");
  }

  return response.json();
}
