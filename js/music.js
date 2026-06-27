"use strict";

const MusicController = {
  init() {
    this.intro = document.getElementById("introMusic");
    this.letter = document.getElementById("letterMusic");
    this.party = document.getElementById("partyMusic");
    this.fireworks = document.getElementById("fireworksSound");
    this.click = document.getElementById("clickSound");
    this.toggleBtn = document.getElementById("musicToggle");

    this.tracks = [this.intro, this.letter, this.party].filter(Boolean);
    this.effects = [this.fireworks, this.click].filter(Boolean);

    this.currentTrack = null;
    this.isMuted = false;

    this.tracks.forEach((track) => {
      track.volume = 0;
      track.loop = true;
      track.muted = false;
    });

    this.effects.forEach((effect) => {
      effect.volume = 0.5;
      effect.muted = false;
    });

    this.bindToggleButton();
  },

  bindToggleButton() {
    if (!this.toggleBtn) return;

    this.toggleBtn.addEventListener("click", () => {
      this.toggleMute();
    });
  },

  toggleMute() {
    this.isMuted = !this.isMuted;

    [...this.tracks, ...this.effects].forEach((audio) => {
      if (audio) {
        audio.muted = this.isMuted;
      }
    });

    this.toggleBtn.classList.toggle("muted", this.isMuted);

    this.toggleBtn.innerHTML = this.isMuted
      ? '<i class="fa-solid fa-volume-xmark"></i>'
      : '<i class="fa-solid fa-volume-high"></i>';
  },

  playCinematic() {
    this.playIntro();
  },

  playIntro() {
    this.crossfadeTo(this.intro, 0.35);
  },

  playLetter() {
    this.crossfadeTo(this.letter, 0.35);
  },

  playParty() {
    this.crossfadeTo(this.party, 0.65);
    this.playFireworks();
  },

  playClick() {
    this.playEffect(this.click, 0.4);
  },

  playFireworks() {
    this.playEffect(this.fireworks, 0.55);
  },

  playEffect(effect, volume = 0.5) {
    if (!effect || this.isMuted) return;

    effect.pause();
    effect.currentTime = 0;
    effect.volume = volume;
    effect.play().catch(() => {});
  },

  crossfadeTo(target, targetVolume = 0.4) {
    if (!target) return;

    this.currentTrack = target;

    this.tracks.forEach((track) => {
      if (track === target) {
        track.play().catch(() => {});
        this.fade(track, targetVolume, 1200);
      } else {
        this.fade(track, 0, 1000, true);
      }
    });
  },

  fade(audio, toVolume, duration = 1000, pauseAfter = false) {
    if (!audio) return;

    const fromVolume = audio.volume;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      audio.volume = fromVolume + (toVolume - fromVolume) * progress;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        audio.volume = toVolume;

        if (pauseAfter && toVolume === 0) {
          audio.pause();
        }
      }
    };

    requestAnimationFrame(step);
  },
};
