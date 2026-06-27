"use strict";

const App = {
  screens: {},

  init() {
    this.cacheScreens();
    CursorEffect.init();
    MusicController.init();
    ParticlesBackground.init();
    LoaderScreen.init();
    EnvelopeController.init();
    QuestionButtons.init();
    CountdownTimer.init();
    MapController.init();
    Effects.init();
  },

  cacheScreens() {
    this.screens.loader = document.getElementById("loaderScreen");
    this.screens.welcome = document.getElementById("welcomeScreen");
    this.screens.envelope = document.getElementById("envelopeScreen");
    this.screens.question = document.getElementById("questionScreen");
    this.screens.main = document.getElementById("mainInvitationScreen");
    this.screens.final = document.getElementById("finalScreen");
  },

  showScreen(name) {
    Object.values(this.screens).forEach((screen) => {
      screen.classList.remove("active");
    });

    this.screens[name].classList.add("active");

    if (window.gsap) {
      gsap.fromTo(
        this.screens[name],
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" },
      );
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
function initGuestName() {
  const guestName = document.getElementById("guestName");
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  if (guestName && name) {
    guestName.textContent = `Дорогой ${decodeURIComponent(name)} ❤️`;
  }
}

function initCalendarButton() {
  const calendarBtn = document.getElementById("calendarBtn");

  if (!calendarBtn) return;

  calendarBtn.addEventListener("click", () => {
    const title = encodeURIComponent("День рождения Адиля");
    const details = encodeURIComponent(
      "Приглашение на день рождения. Дресс-код приветствуется.",
    );
    const location = encodeURIComponent(
      "Secret Music Hall, Бишкек, ул. Ауэзова 24/3",
    );

    const start = "20260705T180000";
    const end = "20260705T230000";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

    window.open(url, "_blank");
  });
}

function initMusicToggle() {
  const btn = document.getElementById("musicToggle");
  const cinematic = document.getElementById("cinematicMusic");
  const party = document.getElementById("partyMusic");

  if (!btn || !cinematic || !party) return;

  btn.addEventListener("click", () => {
    const isMuted = cinematic.muted || party.muted;

    cinematic.muted = !isMuted;
    party.muted = !isMuted;

    btn.classList.toggle("muted", !isMuted);

    btn.innerHTML = !isMuted
      ? '<i class="fa-solid fa-volume-xmark"></i>'
      : '<i class="fa-solid fa-volume-high"></i>';
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initGuestName();
  initCalendarButton();
  initMusicToggle();
});
