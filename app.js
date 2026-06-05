```javascript
const API_URL = 'http://localhost:3000/weather';

let weatherRecords = [];

const btnThemeToggle = document.getElementById('btnThemeToggle');
const addWeatherForm = document.getElementById('addWeatherForm');
const filterCondition = document.getElementById('filterCondition');
const weatherCardsContainer = document.getElementById('weatherCardsContainer');

const cityName = document.getElementById('cityName');
const cityTemp = document.getElementById('cityTemp');
const cityCondition = document.getElementById('cityCondition');
const cityHumidity = document.getElementById('cityHumidity');
const cityWindSpeed = document.getElementById('cityWindSpeed');
const cityDate = document.getElementById('cityDate');

function initTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}

btnThemeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  const isDark = document.body.classList.contains('dark-theme');

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const inputs = [
  cityName,
  cityTemp,
  cityCondition,
  cityHumidity,
  cityWindSpeed,
  cityDate
];

inputs.forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('is-invalid');
  });

  input.addEventListener('change', () => {
    input.classList.remove('is-invalid');
  });
});

function validateForm() {
  let isValid = true;

  if (!cityName.value.trim() || cityName.value.trim().length < 3) {
    cityName.classList.add('is-invalid');
    isValid = false;
  } else {
    cityName.classList.remove('is-invalid');
  }

  const tempVal = parseFloat(cityTemp.value);

  if (isNaN(tempVal) || tempVal < -50 || tempVal > 60) {
    cityTemp.classList.add('is-invalid');
    isValid = false;
  } else {
    cityTemp.classList.remove('is-invalid');
  }

  if (!cityCondition.value) {
    cityCondition.classList.add('is-invalid');
    isValid = false;
  } else {
    cityCondition.classList.remove('is-invalid');
  }

  const humidityVal = parseInt(cityHumidity.value, 10);

  if (isNaN(humidityVal) || humidityVal < 0 || humidityVal > 100) {
    cityHumidity.classList.add('is-invalid');
    isValid = false;
  } else {
    cityHumidity.classList.remove('is-invalid');
  }

  const windVal = parseFloat(cityWindSpeed.value);

  if (isNaN(windVal) || windVal < 0) {
    cityWindSpeed.classList.add('is-invalid');
    isValid = false;
  } else {
    cityWindSpeed.classList.remove('is-invalid');
  }

  if (!cityDate.value) {
    cityDate.classList.add('is-invalid');
    isValid = false;
  } else {
    cityDate.classList.remove('is-invalid');
  }

  return isValid;
}

async function loadWeatherRecords() {
  showLoading();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to load weather: HTTP ${response.status}`);
    }

    weatherRecords = await response.json();

    applyFilters();
  } catch (error) {
    showErrorState();
  }
}

function applyFilters() {
  const selectedCondition = filterCondition.value;

  const filtered = weatherRecords.filter(rec => {
    return (
      selectedCondition === 'all' ||
      rec.condition === selectedCondition
    );
  });

  renderCards(filtered);
}

function renderCards(list) {
  if (list.length === 0) {
    weatherCardsContainer.innerHTML = `
      <div class="empty-state">
        <p style="font-size: 1.25rem; margin-bottom: 0.5rem;">
          ⛅ No city weather reports found
        </p>
        <p>
          Try changing your active filter selection or submit a weather report.
        </p>
      </div>
    `;
    return;
  }

  const cardsHTML = list.map(rec => {
    return `
      <article class="weather-card" data-id="${rec.id}">
        <div class="weather-details">
          <div class="weather-header">
            <span class="city-name">${escapeHTML(rec.city)}</span>
            <span class="badge badge-${rec.condition}">
              ${rec.condition}
            </span>
          </div>

          <div class="weather-meta">
            <span>💧 Humidity: ${rec.humidity}%</span>
            <span>💨 Wind: ${rec.windSpeed} km/h</span>
            <span>📅 ${rec.date}</span>
          </div>
        </div>

        <div class="temp-display">
          ${parseFloat(rec.temp).toFixed(0)}°C
        </div>
      </article>
    `;
  }).join('');

  weatherCardsContainer.innerHTML =
    `<div class="weather-grid">${cardsHTML}</div>`;
}

async function saveWeatherReport(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const newReport = {
    city: cityName.value.trim(),
    temp: parseFloat(cityTemp.value),
    condition: cityCondition.value,
    humidity: parseInt(cityHumidity.value, 10),
    windSpeed: parseFloat(cityWindSpeed.value),
    date: cityDate.value
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReport)
    });

    if (!response.ok) {
      throw new Error(`Failed to save report: HTTP ${response.status}`);
    }

    addWeatherForm.reset();

    await loadWeatherRecords();
  } catch (error) {
    showErrorState();
  }
}

function showLoading() {
  weatherCardsContainer.innerHTML = `
    <div class="loading-indicator">
      <div class="spinner"></div>
      <p>Loading city forecasts from server...</p>
    </div>
  `;
}

function showErrorState() {
  weatherCardsContainer.innerHTML = `
    <div class="error-state">
      <h3>⚠️ Connection Error</h3>
      <p>
        Failed to connect to the database. Make sure your server is running by running:
      </p>

      <code style="display:block;margin:0.5rem 0;background:rgba(0,0,0,0.1);padding:0.4rem;border-radius:4px;font-weight:bold;">
        npx json-server --watch db.json --port 3000
      </code>

      <button class="btn btn-secondary btn-sm"
              id="btnRetryLoad"
              style="margin-top:0.5rem;">
        🔄 Retry Connection
      </button>
    </div>
  `;

  const btnRetry = document.getElementById('btnRetryLoad');

  if (btnRetry) {
    btnRetry.addEventListener('click', loadWeatherRecords);
  }
}

function escapeHTML(str) {
  if (!str) return '';

  return str.replace(
    /[&<>'"]/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

addWeatherForm.addEventListener('submit', saveWeatherReport);

filterCondition.addEventListener('change', applyFilters);

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadWeatherRecords();
});
```
