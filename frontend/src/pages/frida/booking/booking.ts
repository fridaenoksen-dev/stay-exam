import { getBookings, deleteBooking } from "./request";
import type { Booking } from "./booking.types";

function createBookingCard(booking: Booking): string {
  return `
<li class="booking-card">
  <img
    class="room-image"
    src="/src/assets/images/rom1/dobbeltromSjoutsikt.png"
    alt="Rombilde"
  />
    <div class="booking-content">
        <div class="booking-top">
            <h3 class="room-name">Booking #${booking.id}</h3>
            <span class="status-confirmed">${booking.status}</span>
        </div>

        <div class="dates">
            <div class="date-item">
              <div class="date-label">Innsjekk</div>
              <div class="date-value">
                <i class="fa-regular fa-calendar"></i>${booking.fromDate}
              </div>
            </div>
        </div>
        <div class="date-item">
            <div class="date-label">Utsjekk</div>
            <div class="date-value">
              <i class="fa-regular fa-calendar"></i>${booking.toDate}
            </div>
        </div>
    </div>

    <hr class="divider" />

    <div class="features" id="features">
      <span class="feature">Dobbeltseng</span>
      <span class="feature">Eget bad</span>
      <span class="feature">Frokost inkludert</span>
    </div>

    <div class="booking-bottom">
      <div class="price">
        <div class="price-label">Totalt</div>
        <div class="price-value">2 400 NOK</div>
      <div class="meta">
        <div>Opprettet: ${booking.created}</div>
        <div>Sist oppdatert: ${booking.updated}</div>
      </div>

      <div class="actions">
          <button class="btn-secondary" data-id="${booking.id}">
            <i class="fa-regular fa-pen-to-square"></i>Endre booking
          </button>
          <button class="btn-delete" data-id="${booking.id}">
            <i class="fa-regular fa-trash-can"></i>Kanseller booking
          </button>
      </div>
    </div>
  </div>
</li>
`;
}

function renderBookings(bookings: Booking[]): void {
  const cardList = document.getElementById("card-list");

  if (!cardList) {
    console.error("Fant ikke listen med kort!");
    return;
  }

  cardList.innerHTML = "";

  bookings.forEach((booking) => {
    cardList.innerHTML += createBookingCard(booking);
  });
}

function setupDeleteButtons(): void {
  const deleteButtons = document.querySelectorAll(".btn-delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const id = (event.currentTarget as HTMLElement).dataset.id;

      if (!id) return;

      const confirmed = confirm(
        "Er du sikker på at du vil kansellere bookingen?",
      );
      if (!confirmed) return;

      await deleteBooking(Number(id));
      await init();
    });
  });
}

async function init() {
  const bookings = await getBookings();
  renderBookings(bookings);
  setupDeleteButtons();
}

init();
