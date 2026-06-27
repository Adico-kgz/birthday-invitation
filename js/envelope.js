"use strict";

const EnvelopeController = {
  init() {
    this.envelope = document.getElementById("envelope");
    this.toQuestionBtn = document.getElementById("toQuestionBtn");

    this.toQuestionBtn.addEventListener("click", () => {
      App.showScreen("question");
    });
  },

  openEnvelope() {
    const flap = this.envelope.querySelector(".envelope-flap");
    const letter = this.envelope.querySelector(".envelope-letter");
    const front = this.envelope.querySelector(".envelope-front");
    const back = this.envelope.querySelector(".envelope-back");

    this.envelope.classList.remove("opened");
    this.toQuestionBtn.classList.remove("visible");

    gsap.set(this.envelope, {
      opacity: 1,
      y: 70,
      scale: 0.9,
      rotateX: 8,
    });

    gsap.set(back, {
      zIndex: 1,
      opacity: 1,
    });

    gsap.set(letter, {
      y: 190,
      zIndex: 3,
      opacity: 1,
    });

    gsap.set(front, {
      zIndex: 6,
      opacity: 1,
    });

    gsap.set(flap, {
      rotateX: 0,
      zIndex: 7,
      opacity: 1,
      transformOrigin: "top center",
    });

    const tl = gsap.timeline();

    tl.to(this.envelope, {
      y: 0,
      scale: 1,
      rotateX: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
    });

    tl.to(flap, {
      rotateX: -180,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        this.envelope.classList.add("opened");
        flap.style.zIndex = "2";
      },
    });

    tl.to(letter, {
      y: -170,
      zIndex: 5,
      duration: 1.1,
      ease: "power3.out",
      onComplete: () => {
        TypingEffect.typeLetter();
      },
    });
  },

  showNextButton() {
    this.toQuestionBtn.classList.add("visible");
  },
};
