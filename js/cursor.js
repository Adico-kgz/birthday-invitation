"use strict";

const CursorEffect = {
  init() {
    this.cursor = document.getElementById("cursor");
    this.glow = document.getElementById("cursorGlow");

    document.addEventListener("mousemove", (event) => {
      this.move(event.clientX, event.clientY);
    });

    document.addEventListener("mousedown", () => {
      this.cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
      this.glow.style.transform = "translate(-50%, -50%) scale(.75)";
    });

    document.addEventListener("mouseup", () => {
      this.cursor.style.transform = "translate(-50%, -50%) scale(1)";
      this.glow.style.transform = "translate(-50%, -50%) scale(1)";
    });
  },

  move(x, y) {
    this.cursor.style.left = `${x}px`;
    this.cursor.style.top = `${y}px`;

    if (window.gsap) {
      gsap.to(this.glow, {
        left: x,
        top: y,
        duration: 0.22,
        ease: "power2.out",
      });
    } else {
      this.glow.style.left = `${x}px`;
      this.glow.style.top = `${y}px`;
    }
  },
};
