"use strict";

const Fireworks = {
  launchCelebration() {
    this.confettiBurst();
    this.fireworksLoop(4200);
    this.createBalloons(18);
    this.sparkRain(80);
  },

  confettiBurst() {
    if (!window.confetti) return;

    const duration = 3600;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 80,
        spread: 90,
        origin: { x: Math.random(), y: Math.random() * 0.55 },
        scalar: 1.05,
      });

      confetti({
        particleCount: 45,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.75 },
      });

      confetti({
        particleCount: 45,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.75 },
      });
    }, 360);
  },

  fireworksLoop(duration) {
    if (!window.confetti) return;

    const end = Date.now() + duration;

    const timer = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(timer);
        return;
      }

      confetti({
        particleCount: 120,
        startVelocity: 42,
        spread: 360,
        ticks: 80,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.45,
        },
      });
    }, 520);
  },

  createBalloons(count) {
    for (let i = 0; i < count; i++) {
      const balloon = document.createElement("div");
      balloon.className = "party-balloon";
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.bottom = "-120px";
      balloon.style.animationDuration = `${8 + Math.random() * 6}s`;
      balloon.style.background =
        Math.random() > 0.5
          ? "linear-gradient(145deg, #00f5ff, #b6ffff)"
          : "linear-gradient(145deg, #f6c453, #fff1a8)";
      document.body.appendChild(balloon);

      setTimeout(() => balloon.remove(), 15000);
    }
  },

  sparkRain(count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        Effects.createSpark(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
        );
      }, i * 35);
    }
  },
};
