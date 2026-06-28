"use strict";

window.App = {
  screens: {},

  init() {
    this.cacheScreens();
    this.showScreen("question");

    if (typeof CursorEffect !== "undefined") CursorEffect.init();
    if (typeof MusicController !== "undefined") MusicController.init();
    if (typeof ParticlesBackground !== "undefined") ParticlesBackground.init();
    if (typeof QuestionButtons !== "undefined") QuestionButtons.init();
    if (typeof CountdownTimer !== "undefined") CountdownTimer.init();
    if (typeof MapController !== "undefined") MapController.init();
    if (typeof Effects !== "undefined") Effects.init();
  },

  cacheScreens() {
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
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.App.init();
});