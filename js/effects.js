"use strict";

const Effects = {
  init() {
    this.bindParallax();
    this.bindCardTilt();
    this.bindFinish();
  },

  bindParallax() {
    document.addEventListener("mousemove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      document.querySelectorAll(".parallax-layer").forEach((layer, index) => {
        const power = index === 0 ? 26 : -34;
        layer.style.transform = `translate(${x * power}px, ${y * power}px)`;
      });
    });
  },

  bindCardTilt() {
    const card = document.getElementById("invitationCard");

    document.addEventListener("mousemove", (event) => {
      if (!card || !card.closest(".active")) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = (x / rect.width - 0.5) * 12;
      const rotateX = -(y / rect.height - 0.5) * 12;

      card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    document.addEventListener("mouseleave", () => {
      if (!card) return;
      card.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    });
  },

  bindFinish() {
    const finishBtn = document.getElementById("finishBtn");

    if (!finishBtn) return;

    finishBtn.addEventListener("click", () => {
      App.showScreen("final");
    });
  },

  animateInvitationCard() {
    if (!window.gsap) return;

    gsap.from(".invitation-card", {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".countdown-wrap", {
      opacity: 0,
      y: 35,
      duration: 0.7,
      delay: 0.15,
      ease: "power3.out",
    });

    gsap.from(".map-card", {
      opacity: 0,
      y: 35,
      duration: 0.7,
      delay: 0.25,
      ease: "power3.out",
    });
  },
};
