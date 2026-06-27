"use strict";

const LoaderScreen = {
  init() {
    this.openBtn = document.getElementById("openInvitationBtn");
    this.continueBtn = document.getElementById("continueToEnvelopeBtn");

    this.openBtn.addEventListener("click", () => this.openInvitation());
    this.continueBtn.addEventListener("click", () => this.goEnvelope());

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
    MusicController.playCinematic();
    Effects.screenFlash();

    if (window.gsap) {
      gsap.to("#loaderScreen .loader-content", {
        scale: 1.18,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          App.showScreen("welcome");
          TypingEffect.typeWelcome();
        },
      });
    } else {
      App.showScreen("welcome");
      TypingEffect.typeWelcome();
    }
  },

  goEnvelope() {
    Effects.screenFlash();
    App.showScreen("envelope");

    setTimeout(() => {
      EnvelopeController.openEnvelope();
    }, 700);
  },
};
