"use strict";

const MapController = {
  destination: {
    lat: 42.8746,
    lng: 74.5698,
    address: "Secret Music Hall, Бишкек, ул. Ауэзова 24/3",
  },

  init() {
    this.routeBtn = document.getElementById("routeBtn");
    this.distanceText = document.getElementById("distanceText");

    if (this.routeBtn) {
      this.routeBtn.addEventListener("click", () => this.openRoute());
    }

    this.tryGeoDistance();
  },

  openRoute() {
    const query = encodeURIComponent(this.destination.address);
    window.open(`https://2gis.kg/bishkek/search/${query}`, "_blank");
  },

  tryGeoDistance() {
    if (!this.distanceText) return;

    if (!navigator.geolocation) {
      this.distanceText.textContent =
        "Геолокация не поддерживается на этом устройстве.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const distance = this.calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
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

    return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  },

  toRad(value) {
    return (value * Math.PI) / 180;
  },
};
