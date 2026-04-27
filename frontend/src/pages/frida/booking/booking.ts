import { getBookings, deleteBooking, getRoom } from "./request";
import type { Booking, Room } from "./booking.types";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function calculateTotalPrice(
  fromDate: string,
  toDate: string,
  pricePrNight: number,
): number {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const nights = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
  return nights * pricePrNight;
}

function createBookingCard(booking: Booking, room: Room): string {
  return `
<li class="booking-card">
    <img
      class="room-image"
      src="/src/assets/images/rom1/dobbeltromSjoutsikt.png"
      alt="${room.name}"
    />
    <div class="booking-content">
        <div class="booking-top">
            <h3 class="room-name">${room.name}</h3>
            <span class="status-confirmed">${booking.status}</span>
        </div>

        <div class="dates">
            <div class="date-item">
              <div class="date-label">Innsjekk</div>
              <div class="date-value">
                  <i class="fa-regular fa-calendar"></i>${formatDate(booking.fromDate)}
              </div>
        </div>
        <div class="date-item">
            <div class="date-label">Utsjekk</div>
            <div class="date-value">
                <i class="fa-regular fa-calendar"></i>${formatDate(booking.toDate)}
            </div>
        </div>
      </div>

      <hr class="divider" />

      <div class="features">
        ${room.features.map((feature) => `<span class="feature">${feature}</span>`).join("")}
      </div>

      <div class="booking-bottom">
        <div class="price">
          <div class="price-label">Totalt</div>
          <div class="price-value">${calculateTotalPrice(booking.fromDate, booking.toDate, room.pricePrNight)} NOK</div>
          <div class="meta">
            <div>Opprettet: ${formatDate(booking.created)}</div>
            <div>Sist oppdatert: ${formatDate(booking.updated)}</div>
          </div>
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

async function renderBookings(bookings: Booking[]): Promise<void> {
  const cardList = document.getElementById("card-list");

  if (!cardList) {
    console.error("Fant ikke listen med kort!");
    return;
  }

  cardList.innerHTML = "";

  for (const booking of bookings) {
    const room = await getRoom(booking.roomId);
    cardList.innerHTML += createBookingCard(booking, room);
  }
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
