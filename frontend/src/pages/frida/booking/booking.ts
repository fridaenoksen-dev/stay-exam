import {
  getBookings,
  deleteBooking,
  getRoom,
  createBooking,
  updateBooking,
} from "./request";
import type { Booking, Room } from "./booking.types";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function showToast(message: string): void {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
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
      <h3 class="room-name"><a href="/src/pages/frida/room/room.html">${room.name}</a></h3>            
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

      ${
        booking.message
          ? `
        <div class="booking-message">
          <div class="date-label">Melding til verten</div>
          <p>${booking.message}</p>
        </div>
        `
          : ""
      }

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
          <button class="btn-secondary btn-edit" 
            data-id="${booking.id}" 
            data-from="${booking.fromDate}"
            data-to="${booking.toDate}"
            data-message="${booking.message}">
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

    await init();
  });
}

function setupEditButtons(): void {
  const cardList = document.getElementById("card-list");
  const editOverlay = document.getElementById("edit-overlay");
  const editForm = document.getElementById("edit-form");
  const btnEditCancel = document.getElementById("btn-edit-cancel");

  if (!cardList || !editOverlay || !editForm || !btnEditCancel) return;

  // Setter opp en event deligering istedenfor hver hver enkelt knapp
  cardList.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest(".btn-edit");
    if (!button) return;

    const id = (button as HTMLElement).dataset.id;
    const fromDate = (button as HTMLElement).dataset.from ?? "";
    const toDate = (button as HTMLElement).dataset.to ?? "";
    const message = (button as HTMLElement).dataset.message ?? "";

    if (!id) return;

    (document.getElementById("edit-booking-id") as HTMLInputElement).value = id;
    (document.getElementById("edit-fromDate") as HTMLInputElement).value =
      fromDate;
    (document.getElementById("edit-toDate") as HTMLInputElement).value = toDate;
    (document.getElementById("edit-message") as HTMLTextAreaElement).value =
      message;

    editOverlay.style.display = "flex";
  });

  btnEditCancel.addEventListener("click", () => {
    editOverlay.style.display = "none";
  });

  editOverlay.addEventListener("click", (event) => {
    if (event.target === editOverlay) {
      editOverlay.style.display = "none";
    }
  });

  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = (document.getElementById("edit-booking-id") as HTMLInputElement)
      .value;
    const fromDate = (
      document.getElementById("edit-fromDate") as HTMLInputElement
    ).value;
    const toDate = (document.getElementById("edit-toDate") as HTMLInputElement)
      .value;
    const message = (
      document.getElementById("edit-message") as HTMLTextAreaElement
    ).value;

    await updateBooking(Number(id), {
      fromDate,
      toDate,
      message,
    });

    editOverlay.style.display = "none";
    showToast("✅ Bookingen din er oppdatert");
    await init();
  });
}

async function init() {
  const bookings = await getBookings();
  await renderBookings(bookings);
  setupDeleteButtons();
}

setupBookingForm();
setupEditButtons();

init();

// Konami easter egg
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
];

let konamiIndex = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      console.log("Konami kode aktivert");
      startEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function startEasterEgg(): void {
  const emojies = ["✈️", "🚗", "🧳", "🗺️", "🌏", "🎒"];

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const emoji = document.createElement("div");
      emoji.textContent = emojies[Math.floor(Math.random() * emojies.length)];
      emoji.style.cssText = `
      position: fixed;
      font-size: ${Math.random() * 30 + 20}px;
      left: ${Math.random() * 100}vw;
      top: -60px;
      z-index: 9999;
      transition: top ${Math.random() * 2 + 2}s linear;
      pointer-events: none;
      `;

      document.body.appendChild(emoji);

      setTimeout(() => {
        emoji.style.top = "110vh";
      }, 100);

      setTimeout(() => {
        document.body.removeChild(emoji);
      }, 4000);
    }, i * 150);
  }
}
