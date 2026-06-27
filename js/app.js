function initCalendarButton() {
  const calendarBtn = document.getElementById("calendarBtn");

  if (!calendarBtn) return;

  calendarBtn.addEventListener("click", () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Adil Birthday Invitation//RU",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:adil-birthday-20260705@birthday-invitation",
      "DTSTAMP:20260705T120000Z",
      "DTSTART:20260705T120000Z",
      "DTEND:20260705T170000Z",
      "SUMMARY:День рождения Адиля",
      "DESCRIPTION:Приглашение на день рождения. Дресс-код приветствуется.",
      "LOCATION:Secret Music Hall, Бишкек, ул. Ауэзова 24/3",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "adil-birthday.ics";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}
