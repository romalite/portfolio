let API_KEY = "f75da6f470dbc9a9b8e5184627e5bc1c";

let API_URL      = "https://api.openweathermap.org/data/2.5/weather";
let FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Theme
let darkMode = false;
let themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", function() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
  themeBtn.textContent = darkMode ? "☀️" : "🌙";
});


// Schnellzugriff-Städte
let quickCities = ["Berlin", "Hamburg", "München", "Wien", "Zürich", "Köln"];

function buildQuickCities() {
  let container = document.getElementById("quick-cities");
  for (let i = 0; i < quickCities.length; i++) {
    let btn = document.createElement("button");
    btn.className   = "quick-btn";
    btn.textContent = "📍 " + quickCities[i];

    let city = quickCities[i]; // für den Listener
    btn.addEventListener("click", function() {
      document.getElementById("city-input").value = city;
      fetchWeather(city);
    });

    container.appendChild(btn);
  }
}

buildQuickCities();


// Suche starten
document.getElementById("search-btn").addEventListener("click", function() {
  let city = document.getElementById("city-input").value.trim();
  if (city !== "") fetchWeather(city);
});

document.getElementById("city-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    let city = this.value.trim();
    if (city !== "") fetchWeather(city);
  }
});


// Wetter-Icons aus Codes
function getIcon(code) {
  // code ist der OpenWeather icon code z.B. "01d", "09n"
  let map = {
    "01": "☀️",
    "02": "🌤️",
    "03": "☁️",
    "04": "☁️",
    "09": "🌧️",
    "10": "🌦️",
    "11": "⛈️",
    "13": "❄️",
    "50": "🌫️"
  };
  let key = code.slice(0, 2);
  return map[key] || "🌡️";
}

// Wochentag aus Unix-Timestamp
let weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

function getDayName(timestamp) {
  let d = new Date(timestamp * 1000);
  return weekdays[d.getDay()];
}


// Wetter holen
function fetchWeather(city) {
  showError(false);
  showResult(false);
  showLoading(true);

  let url = API_URL + "?q=" + encodeURIComponent(city) + "&appid=" + API_KEY + "&units=metric&lang=de";

  fetch(url)
    .then(function(response) {
      if (!response.ok) throw new Error("Stadt nicht gefunden");
      return response.json();
    })
    .then(function(data) {
      showLoading(false);
      renderWeather(data);
      fetchForecast(city);
    })
    .catch(function(err) {
      showLoading(false);
      showError(true);
      console.log("Fehler:", err);
    });
}

// Vorhersage holen
function fetchForecast(city) {
  let url = FORECAST_URL + "?q=" + encodeURIComponent(city) + "&appid=" + API_KEY + "&units=metric&lang=de";

  fetch(url)
    .then(function(response) {
      if (!response.ok) throw new Error("Forecast Fehler");
      return response.json();
    })
    .then(function(data) {
      renderForecast(data);
    })
    .catch(function(err) {
      console.log("Forecast Fehler:", err);
    });
}


// Aktuelles Wetter anzeigen
function renderWeather(data) {
  document.getElementById("weather-icon").textContent = getIcon(data.weather[0].icon);
  document.getElementById("weather-city").textContent = data.name + ", " + data.sys.country;
  document.getElementById("weather-temp").textContent = Math.round(data.main.temp) + "°C";
  document.getElementById("weather-desc").textContent = data.weather[0].description;

  // Detail-Karten
  let detailsData = [
    { icon: "🌡️", label: "Gefühlt",    value: Math.round(data.main.feels_like) + "°C" },
    { icon: "💧", label: "Luftfeuchte", value: data.main.humidity + "%" },
    { icon: "💨", label: "Wind",        value: Math.round(data.wind.speed) + " m/s" },
    { icon: "🔽", label: "Min",         value: Math.round(data.main.temp_min) + "°C" },
    { icon: "🔼", label: "Max",         value: Math.round(data.main.temp_max) + "°C" },
    { icon: "👁️", label: "Sichtweite", value: (data.visibility / 1000).toFixed(1) + " km" }
  ];

  let container = document.getElementById("weather-details");
  container.innerHTML = "";

  for (let i = 0; i < detailsData.length; i++) {
    let d = detailsData[i];

    let card = document.createElement("div");
    card.className = "detail-card";

    let icon = document.createElement("div");
    icon.className   = "detail-icon";
    icon.textContent = d.icon;

    let label = document.createElement("div");
    label.className   = "detail-label";
    label.textContent = d.label;

    let value = document.createElement("div");
    value.className   = "detail-value";
    value.textContent = d.value;

    card.appendChild(icon);
    card.appendChild(label);
    card.appendChild(value);
    container.appendChild(card);
  }

  showResult(true);
}


// 5-Tage Vorschau anzeigen
function renderForecast(data) {
  let container = document.getElementById("forecast-list");
  container.innerHTML = "";

  // API gibt Einträge alle 3h – wir nehmen einen pro Tag (12:00 Uhr)
  let days = [];
  for (let i = 0; i < data.list.length; i++) {
    let item = data.list[i];
    let hour = new Date(item.dt * 1000).getHours();
    if (hour === 12 || hour === 13) {
      days.push(item);
    }
    if (days.length >= 5) break;
  }

  // Wenn nicht genug 12-Uhr-Einträge, nehmen wir die ersten 5
  if (days.length < 5) {
    days = [];
    for (let i = 0; i < data.list.length && days.length < 5; i += 8) {
      days.push(data.list[i]);
    }
  }

  for (let i = 0; i < days.length; i++) {
    let d = days[i];

    let card = document.createElement("div");
    card.className = "forecast-card";

    let day = document.createElement("div");
    day.className   = "forecast-day";
    day.textContent = getDayName(d.dt);

    let icon = document.createElement("div");
    icon.className   = "forecast-icon";
    icon.textContent = getIcon(d.weather[0].icon);

    let temp = document.createElement("div");
    temp.className   = "forecast-temp";
    temp.textContent = Math.round(d.main.temp) + "°C";

    let low = document.createElement("div");
    low.className   = "forecast-low";
    low.textContent = Math.round(d.main.temp_min) + "°C";

    card.appendChild(day);
    card.appendChild(icon);
    card.appendChild(temp);
    card.appendChild(low);
    container.appendChild(card);
  }
}


// Hilfsfunktionen zum Anzeigen/Verstecken
function showResult(visible) {
  let el = document.getElementById("weather-result");
  if (visible) {
    el.classList.remove("hidden");
  } else {
    el.classList.add("hidden");
  }
}

function showError(visible) {
  let el = document.getElementById("error-msg");
  if (visible) {
    el.classList.remove("hidden");
  } else {
    el.classList.add("hidden");
  }
}

function showLoading(visible) {
  // Einfacher Spinner im Suchergebnis-Bereich
  let existing = document.getElementById("loading-spinner");
  if (visible && !existing) {
    let spinner = document.createElement("div");
    spinner.id          = "loading-spinner";
    spinner.className   = "spinner";
    spinner.textContent = "⏳";
    document.querySelector("main").insertBefore(spinner, document.getElementById("weather-result"));
  } else if (!visible && existing) {
    existing.remove();
  }
}
