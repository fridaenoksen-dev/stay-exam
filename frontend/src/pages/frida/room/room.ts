import { getRoom, addReview, updateReview, deleteReview } from "./request";
import type { Room, Review } from "./types";

const params = new URLSearchParams(window.location.search);
const roomId = Number(params.get("id")) || 1; // Bruker 1 som standarden hvis det ikke er noen id

function renderStars(rating: number): string {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += `<i class="fa-solid fa-star"></i>`;
  }
  return stars;
}

function createReviewCard(review: Review): string {
  return `
    <article class="review-card">
      <div class="review-head">
        <strong>Bruker #${review.userId}</strong>
        <span class="stars" aria-label="${review.rating} av 5 stjerner">
        ${renderStars(review.rating)}
        </span>
      </div>
      <p>${review.comment}</p>
      <div class="meta">
        <div>Skrevet: ${new Date(review.created).toLocaleDateString("nb-NO")}</div>
      </div>
      <div class="review-actions">
        <button class="btn-edit" data-id="${review.id}">
        <i class="fa-regular fa-pen-to-square"></i> Rediger
        </button>
        <button class="btn-delete" data-id="${review.id}">
          <i class="fa-regular fa-trash-can"></i> Slett
        </button>
      </div>
    </article>
 `;
}

function renderReviews(reviews: Review[]): void {
  const reviewList = document.querySelector(".review-list");
  if (!reviewList) return;

  reviewList.innerHTML = "";

  reviews.forEach((review) => {
    reviewList.innerHTML += createReviewCard(review);
  });
}

function renderRoom(room: Room): void {
  // Romnavn
  const title = document.querySelector(".room-title");
  if (title) title.textContent = room.name;

  // Beskrivelse
  const description = document.getElementById("description");
  if (description) description.innerHTML = `<p>${room.description}</p>`;

  // Pris
  const price = document.getElementById("pricePrNight");
  if (price) price.textContent = `${room.pricePrNight} NOK`;

  // Features
  const features = document.getElementById("features");
  if (features) {
    features.innerHTML = room.features
      .map((f) => `<span class="feature">${f}</span>`)
      .join("");
  }

  // Anmeldelser
  renderReviews(room.reviews);
}

function setupReviewForm(): void {
  const btnNewReview = document.getElementById("btn-new-review");
  const overlay = document.getElementById("review-overlay");
  const reviewForm = document.getElementById("review-form");
  const btnCancel = document.getElementById("btn-review-cancel");

  if (!btnNewReview || !overlay || !reviewForm || !btnCancel) return;

  btnNewReview.addEventListener("click", () => {
    overlay.style.display = "flex";
  });

  btnCancel.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.style.display = "none";
    }
  });

  reviewForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const reviewId = (document.getElementById("review-id") as HTMLInputElement)
      .value;
    const rating = Number(
      (document.getElementById("review-rating") as HTMLInputElement).value,
    );
    const comment = (
      document.getElementById("review-comment") as HTMLTextAreaElement
    ).value;

    if (reviewId) {
      await updateReview(roomId, Number(reviewId), { rating, comment });
    } else {
      await addReview(roomId, { userId: 1, rating, comment });
    }

    overlay.style.display = "none";
    await init();
  });
}

function setupDeleteButtons(): void {
  const reviewList = document.getElementById("review-list");
  if (!reviewList) return;

  reviewList.addEventListener("click", async (event) => {
    const button = (event.target as HTMLElement).closest(".btn-delete");
    if (!button) return;

    const id = (button as HTMLElement).dataset.id;
    if (!id) return;

    const confirmed = confirm("Er du sikker på at du vil slette anmeldelsen?");
    if (!confirmed) return;

    await deleteReview(roomId, Number(id));
    await init();
  });
}

function setupEditButtons(): void {
  const reviewList = document.getElementById("review-list");
  const overlay = document.getElementById("review-overlay");

  if (!reviewList || !overlay) return;

  reviewList.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest(".btn-edit");
    if (!button) return;

    const id = (button as HTMLElement).dataset.id;
    const card = button.closest(".review-card");
    if (!id || !card) return;

    const comment = card.querySelector("p")?.textContent ?? "";

    (document.getElementById("review-id") as HTMLInputElement).value = id;
    (document.getElementById("review-comment") as HTMLTextAreaElement).value =
      comment;

    overlay.style.display = "flex";
  });
}

async function init() {
  const room = await getRoom(roomId);
  renderRoom(room);
}

init();
setupReviewForm();
setupDeleteButtons();
setupEditButtons();
