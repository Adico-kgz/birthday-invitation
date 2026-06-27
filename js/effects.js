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
      card.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    });
  },

  bindFinish() {
    const finishBtn = document.getElementById("finishBtn");

    finishBtn.addEventListener("click", () => {
      App.showScreen("final");
      Fireworks.launchCelebration();

      setInterval(() => {
        if (
          document.getElementById("finalScreen").classList.contains("active")
        ) {
          Fireworks.confettiBurst();
        }
      }, 7000);
    });
  },

  animateInvitationCard() {
    if (!window.gsap) return;

    gsap.from(".invitation-card", {
      opacity: 0,
      y: 80,
      rotateX: 18,
      duration: 1.1,
      ease: "power3.out",
    });

    gsap.from(".countdown-wrap", {
      opacity: 0,
      y: 50,
      duration: 0.9,
      delay: 0.25,
      ease: "power3.out",
    });

    gsap.from(".map-card", {
      opacity: 0,
      y: 50,
      duration: 0.9,
      delay: 0.42,
      ease: "power3.out",
    });
  },

  createSpark(x, y) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    document.body.appendChild(spark);

    setTimeout(() => {
      spark.remove();
    }, 1400);
  },

  screenFlash() {
    document.body.classList.add("screen-flash");

    setTimeout(() => {
      document.body.classList.remove("screen-flash");
    }, 760);
  },
};

const style = document.createElement("style");
style.textContent = `
.party-balloon {
  position: fixed;
  width: 54px;
  height: 74px;
  border-radius: 50% 50% 45% 45%;
  z-index: 60;
  pointer-events: none;
  animation-name: partyBalloonFly;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.party-balloon::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 72px;
  width: 1px;
  height: 90px;
  background: rgba(255,255,255,.45);
}

@keyframes partyBalloonFly {
  from {
    transform: translateY(0) rotate(-8deg);
    opacity: .9;
  }
  to {
    transform: translateY(-130vh) rotate(18deg);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);
