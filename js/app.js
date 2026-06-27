"use strict";

window.App = {
  screens: {},

  init() {
    this.cacheScreens();

    if (window.CursorEffect) CursorEffect.init();
    if (window.MusicController) MusicController.init();
    if (window.ParticlesBackground) ParticlesBackground.init();
    if (window.LoaderScreen) LoaderScreen.init();
    if (window.EnvelopeController) EnvelopeController.init();
    if (window.QuestionButtons) QuestionButtons.init();
    if (window.CountdownTimer) CountdownTimer.init();
    if (window.MapController) MapController.init();
    if (window.Effects) Effects.init();

    initGuestName();
    initCalendarButton();
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
      if (screen) screen.classList.remove("active");
    });

    if (this.screens[name]) {
      this.screens[name].classList.add("active");
    }
  },
};

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
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Adil Birthday Invitation//RU",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:adil-birthday-20260705@birthday-invitation",
      "DTSTAMP:20260705T120000Z",
      "DTSTART:20260705T120000Z",
      "DTEND:20260705T170000Z",
      "SUMMARY:День рождения Адиля",
      "DESCRIPTION:Приглашение на день рождения. Дресс-код приветствуется.",
      "LOCATION:Secret Music Hall, Бишкек, ул. Ауэзова 24/3",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "adil-birthday.ics";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  window.App.init();
});
