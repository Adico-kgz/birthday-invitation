"use strict";

const ParticlesBackground = {
  init() {
    if (!window.particlesJS) return;

    particlesJS("particles-js", {
      particles: {
        number: {
          value: 90,
          density: {
            enable: true,
            value_area: 900
          }
        },
        color: {
          value: ["#f6c453", "#fff1a8", "#00f5ff"]
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.65,
          random: true
        },
        size: {
          value: 3.2,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 145,
          color: "#f6c453",
          opacity: 0.18,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.25,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 180,
            line_linked: {
              opacity: 0.45
            }
          },
          push: {
            particles_nb: 5
          }
        }
      },
      retina_detect: true
    });
  }
};