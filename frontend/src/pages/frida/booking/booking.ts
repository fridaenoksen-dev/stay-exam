import { getBookings, deleteBooking, getRoom, createBooking } from "./request";
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
            <span class="${booking.status === "confirmed" ? "status-confirmed" : "status-pending"}">${booking.status}</span>
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

function setupBookingForm(): void {
  const btnNewBooking = document.getElementById("btn-new-booking");
  const overlay = document.getElementById("booking-overlay");
  const bookingForm = document.getElementById("booking-form");
  const btnCancel = document.getElementById("btn-cancel");

  if (!btnNewBooking || !overlay || !bookingForm || !btnCancel) return;

  btnNewBooking.addEventListener("click", () => {
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

  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // VIKTIG Hindrer siden i å laste på nytt
    console.log("Test");

    const fromDate = (document.getElementById("fromDate") as HTMLInputElement)
      .value;
    const toDate = (document.getElementById("toDate") as HTMLInputElement)
      .value;
    const message = (document.getElementById("message") as HTMLTextAreaElement)
      .value;

    await createBooking({
      userId: 1,
      roomId: 1,
      fromDate,
      toDate,
      status: "pending",
      message,
    });

    overlay.style.display = "none";

    showToast("✅ Bookingen din er sendt, se oppdatert status på dine sider.");

    function showToast(message: string): void {
      const toast = document.getElementById("toast");
      if (!toast) return;

      toast.textContent = message;
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 5000);
    }

    await init();
  });
}

async function init() {
  const bookings = await getBookings();
  await renderBookings(bookings);
  setupDeleteButtons();
}

setupBookingForm();

init();
