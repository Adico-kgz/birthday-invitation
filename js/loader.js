"use strict";

const LoaderScreen = {
  init() {
    this.openBtn = document.getElementById("openInvitationBtn");
    this.continueBtn = document.getElementById("continueToEnvelopeBtn");

    if (this.openBtn) {
      this.openBtn.addEventListener("click", () => this.openInvitation());
      this.openBtn.addEventListener("touchend", (event) => {
        event.preventDefault();
        this.openInvitation();
      });
    }

    if (this.continueBtn) {
      this.continueBtn.addEventListener("click", () => this.goEnvelope());
      this.continueBtn.addEventListener("touchend", (event) => {
        event.preventDefault();
        this.goEnvelope();
      });
    }

    this.animateLoader();
  },

  animateLoader() {
    if (!window.gsap) return;

    gsap.from(".small-label", {
      opacity: 0,
      y: 18,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".loader-title", {
      opacity: 0,
      y: 34,
      duration: 1.2,
      delay: 0.35,
      ease: "power3.out",
    });

    gsap.from("#openInvitationBtn", {
      opacity: 0,
      y: 26,
      duration: 1,
      delay: 0.9,
      ease: "back.out(1.7)",
    });
  },

  openInvitation() {
    if (typeof MusicController !== "undefined") {
      MusicController.playIntro();
    }

    if (typeof Effects !== "undefined") {
      Effects.screenFlash();
    }

    App.showScreen("welcome");

    if (typeof TypingEffect !== "undefined") {
      TypingEffect.typeWelcome();
    }
  },

  goEnvelope() {
    if (typeof MusicController !== "undefined") {
      MusicController.playLetter();
    }

    if (typeof Effects !== "undefined") {
      Effects.screenFlash();
    }

    App.showScreen("envelope");

    setTimeout(() => {
      if (typeof EnvelopeController !== "undefined") {
        EnvelopeController.openEnvelope();
      }
    }, 500);
  },
};
