"use strict";

const QuestionButtons = {
  phrases: [
    "Не получится 😄",
    "Попробуй ещё",
    "Я знаю что ты придешь ❤️",
    "Даже не пытайся 😂",
    "Правильный ответ сверху",
    "Эта кнопка заблокирована",
  ],

  colors: [
    "linear-gradient(135deg, #ff4f8b, #ffc1d7)",
    "linear-gradient(135deg, #8b5cf6, #ddd6fe)",
    "linear-gradient(135deg, #f97316, #fed7aa)",
    "linear-gradient(135deg, #ef4444, #fecaca)",
    "linear-gradient(135deg, #22c55e, #bbf7d0)",
  ],

  init() {
    this.yesBtn = document.getElementById("yesBtn");
    this.noBtn = document.getElementById("noBtn");
    this.questionCard = document.querySelector(".question-card");

    if (!this.yesBtn || !this.noBtn) return;

    this.noBtn.addEventListener("mouseenter", () => this.escape());
    this.noBtn.addEventListener("mousemove", () => this.escape());

    this.noBtn.addEventListener("touchstart", (event) => {
      event.preventDefault();
      this.escape();
    });

    this.noBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.escape();
    });

    this.yesBtn.addEventListener("click", () => this.accept());
  },

  escape() {
    if (!this.questionCard || !this.noBtn) return;

    const cardRect = this.questionCard.getBoundingClientRect();
    const btnRect = this.noBtn.getBoundingClientRect();

    const padding = 20;
    const maxX = cardRect.width - btnRect.width - padding * 2;
    const maxY = cardRect.height - btnRect.height - padding * 2;

    const x = padding + Math.random() * Math.max(maxX, 40);
    const y = padding + Math.random() * Math.max(maxY, 40);

    const rotate = Math.floor(Math.random() * 40) - 20;
    const scale = 0.9 + Math.random() * 0.2;

    this.noBtn.style.position = "absolute";
    this.noBtn.style.left = `${x}px`;
    this.noBtn.style.top = `${y}px`;
    this.noBtn.style.right = "auto";
    this.noBtn.style.bottom = "auto";
    this.noBtn.style.transform = `rotate(${rotate}deg) scale(${scale})`;
    this.noBtn.style.background =
      this.colors[Math.floor(Math.random() * this.colors.length)];
    this.noBtn.textContent =
      this.phrases[Math.floor(Math.random() * this.phrases.length)];

    if (window.gsap) {
      gsap.fromTo(
        this.noBtn,
        { y: y - 10 },
        { y: y, duration: 0.25, ease: "bounce.out" },
      );
    }
  },

  accept() {
    if (typeof MusicController !== "undefined" && MusicController.playParty) {
      MusicController.playParty();
    }

    if (typeof App !== "undefined") {
      App.showScreen("main");
    }
  },
};
