"use strict";

const MusicController = {
  init() {
    this.party = document.getElementById("partyMusic");
    this.toggleBtn = document.getElementById("musicToggle");
    this.prompt = document.getElementById("musicPrompt");
    this.startBtn = document.getElementById("startMusicBtn");
    this.isMuted = false;

    if (this.party) {
      this.party.volume = 0.45;
      this.party.loop = true;
      this.party.muted = false;
    }

    if (this.startBtn) {
      this.startBtn.addEventListener("click", () => {
        this.playParty();
        this.hidePrompt();
      });
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => {
        this.toggleMute();
      });
    }
  },

  playParty() {
    if (!this.party || this.isMuted) return;
    this.party.play().catch(() => {});
  },

  hidePrompt() {
    if (this.prompt) {
      this.prompt.classList.add("hidden");
    }
  },

  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.party) {
      this.party.muted = this.isMuted;

      if (!this.isMuted) {
        this.party.play().catch(() => {});
      }
    }

    if (this.toggleBtn) {
      this.toggleBtn.classList.toggle("muted", this.isMuted);
      this.toggleBtn.innerHTML = this.isMuted
        ? '<i class="fa-solid fa-volume-xmark"></i>'
        : '<i class="fa-solid fa-volume-high"></i>';
    }
  },
};
