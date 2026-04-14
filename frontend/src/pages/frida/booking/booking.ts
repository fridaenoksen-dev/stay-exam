import { getBookings } from "./request";
import type { Booking } from "./booking.types";

function createBookingCard(booking: Booking): string {
  return `
<li class="booking-card">
    <div class="booking-content">
        <div class="booking-top"
            <h3 class="room-name"Booking #${booking.id}</h3>
            <span class="status-confirmed">${booking.status}</span>
        </div>

        <div class="dates">
            <div class="date-item">
            <div class="date-value">${booking.fromDate}</div>
        </div>
        <div class="date-item">
            <div class="date-label">Utsjekk</div>
            <div class="date-value">${booking.toDate}</div>
        </div>
        </div>

            <div class="actions">
                <button class="btn-secondary" data-id="${booking.id}">Endre booking</button>
                <button class="btn-delete" data-id="${booking.id}">Kanseller booking</button>
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

async function init() {
  const bookings = await getBookings();
  renderBookings(bookings);
}

init();
