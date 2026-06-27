"use strict";

const MapController = {
  destination: {
    lat: 42.8746,
    lng: 74.5698,
    address: "Secret Music Hall, Ауэзова 24/3, Бишкек",
  },

  init() {
    this.routeBtn = document.getElementById("routeBtn");
    this.distanceText = document.getElementById("distanceText");

    this.routeBtn.addEventListener("click", () => this.openRoute());
    this.tryGeoDistance();
  },

  openRoute() {
    const encoded = encodeURIComponent(this.destination.address);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
      "_blank",
    );
  },

  tryGeoDistance() {
    if (!navigator.geolocation) {
      this.distanceText.textContent =
        "Геолокация не поддерживается на этом устройстве.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = this.calculateDistance(
          userLat,
          userLng,
          this.destination.lat,
          this.destination.lng,
        );

        this.distanceText.textContent = `Примерное расстояние до места: ${distance.toFixed(1)} км`;
      },
      () => {
        this.distanceText.textContent =
          "Разреши геолокацию, чтобы увидеть расстояние до места.";
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      },
    );
  },

  calculateDistance(lat1, lon1, lat2, lon2) {
    const radius = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return radius * c;
  },

  toRad(value) {
    return (value * Math.PI) / 180;
  },
};
