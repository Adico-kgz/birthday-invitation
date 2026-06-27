"use strict";

const TypingEffect = {
  async typeText(element, text, speed = 42) {
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      await this.wait(speed);
    }
  },

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  async typeWelcome() {
    const title = document.getElementById("welcomeTyping");
    const subtitle = document.getElementById("welcomeTypingSecond");

    await this.typeText(title, "Дорогой друг...", 55);
    await this.wait(350);
    await this.typeText(
      subtitle,
      "Я хочу разделить с тобой один из самых важных дней в моей жизни.",
      34,
    );
  },

  async typeLetter() {
    const letter = document.getElementById("letterTyping");

    await this.typeText(
      letter,
      "Этот день будет особенным, потому что рядом будут самые важные люди. Я очень хочу, чтобы ты был среди них. Приходи, будем праздновать, смеяться, танцевать и создавать воспоминания.",
      29,
    );

    EnvelopeController.showNextButton();
  },
};
