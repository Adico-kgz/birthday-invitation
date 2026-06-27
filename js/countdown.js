"use strict";

const CountdownTimer = {
  init() {
    this.days = document.getElementById("days");
    this.hours = document.getElementById("hours");
    this.minutes = document.getElementById("minutes");
    this.seconds = document.getElementById("seconds");

    this.targetDate = this.getNextBirthdayDate();
    this.update();
    setInterval(() => this.update(), 1000);
  },

  getNextBirthdayDate() {
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(year, 6, 5, 18, 0, 0);

    if (target.getTime() < now.getTime()) {
      target = new Date(year + 1, 6, 5, 18, 0, 0);
    }

    return target;
  },

  update() {
    const now = new Date();
    const diff = this.targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      this.days.textContent = "00";
      this.hours.textContent = "00";
      this.minutes.textContent = "00";
      this.seconds.textContent = "00";
      return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(diff / day);
    const hours = Math.floor((diff % day) / hour);
    const minutes = Math.floor((diff % hour) / minute);
    const seconds = Math.floor((diff % minute) / second);

    this.days.textContent = String(days).padStart(2, "0");
    this.hours.textContent = String(hours).padStart(2, "0");
    this.minutes.textContent = String(minutes).padStart(2, "0");
    this.seconds.textContent = String(seconds).padStart(2, "0");
  },
};
