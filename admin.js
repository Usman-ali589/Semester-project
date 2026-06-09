
const API_URL = 'http://localhost:3000/weather';

let weatherRecords = [];

const btnThemeToggle = document.getElementById('btnThemeToggle');
const adminTableContainer = document.getElementById('adminTableContainer');

const statTotalCities = document.getElementById('statTotalCities');
const statMaxTemp = document.getElementById('statMaxTemp');
const statMinTemp = document.getElementById('statMinTemp');

const editModalBackdrop = document.getElementById('editModalBackdrop');
const editWeatherForm = document.getElementById('editWeatherForm');
const btnCancelEdit = document.getElementById('btnCancelEdit');
const btnCancelCross = document.getElementById('btnCancelCross');

const editCityId = document.getElementById('editCityId');
const editCityName = document.getElementById('editCityName');
const editCityTemp = document.getElementById('editCityTemp');
const editCityCondition = document.getElementById('editCityCondition');
const editCityHumidity = document.getElementById('editCityHumidity');
const editCityWindSpeed = document.getElementById('editCityWindSpeed');
const editCityDate = document.getElementById('editCityDate');

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

const editInputs = [
  editCityName,
  editCityTemp,
  editCityCondition,
  editCityHumidity,
  editCityWindSpeed,
  editCityDate
];

editInputs.forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('is-invalid');
  });

  input.addEventListener('change', () => {
    input.classList.remove('is-invalid');
  });
});

function validateEditForm() {
  let isValid = true;

  if (!editCityName.value.trim() || editCityName.value.trim().length < 3) {
    editCityName.classList.add('is-invalid');
    isValid = false;
  } else {
    editCityName.classList.remove('is-invalid');
  }

  const tempVal = parseFloat(editCityTemp.value);

  if (isNaN(tempVal) || tempVal < -50 || tempVal > 60) {
    editCityTemp.classList.add('is-invalid');
    isValid = false;
  } else {
    editCityTemp.classList.remove('is-invalid');
  }

  if (!editCityCondition.value) {
    editCityCondition.classList.add('is-invalid');
    isValid = false;
  } else {
    editCityCondition.classList.remove('is-invalid');
  }

  const humidityVal = parseInt(editCityHumidity.value, 10);

  if (isNaN(humidityVal) || humidityVal < 0 || humidityVal > 100) {
    editCityHumidity.classList.add('is-invalid');
    isValid = false;
  } else {
    editCityHumidity.classList.remove('is-invalid');
  }

  const windVal = parseFloat(editCityWindSpeed.value);

  if (isNaN(windVal) || windVal < 0) {
    editCityWindSpeed.classList.add('is-invalid');
    isValid = false;
  } else {
    editCityWindSpeed.classList.remove('is-invalid');
  }

  if (!editCityDate.value) {
    editCityDate.classList.add('is-invalid');
    isValid = false;
  } else {
    editCityDate.classList.remove('is-invalid');
  }

  return isValid;
}

async function fetchAdminData() {
  showLoading();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to load weather: HTTP ${response.status}`);
    }

    weatherRecords = await response.json();

    calculateStats();
    renderTable();
  } catch (error) {
    showErrorState();
  }
}

function calculateStats() {
  const count = weatherRecords.length;

  if (count === 0) {
    statTotalCities.textContent = '0';
    statMaxTemp.textContent = '0°C';
    statMinTemp.textContent = '0°C';
    return;
  }

  let highest = -Infinity;
  let lowest = Infinity;

  weatherRecords.forEach(rec => {
    const temp = parseFloat(rec.temp);

    if (temp > highest) highest = temp;
    if (temp < lowest) lowest = temp;
  });

  statTotalCities.textContent = count.toString();
  statMaxTemp.textContent = `${highest.toFixed(0)}°C`;
  statMinTemp.textContent = `${lowest.toFixed(0)}°C`;
}

function renderTable() {
  if (weatherRecords.length === 0) {
    adminTableContainer.innerHTML = `
      <div class="empty-state">
        <p style="font-size: 1.25rem; margin-bottom: 0.5rem;">⚙️ No city weather logs in database</p>
        <p>Go to the user Dashboard to submit a city weather record first.</p>
      </div>
    `;
    return;
  }

  const rowsHTML = weatherRecords.map(rec => {
    return `
      <tr id="row-${rec.id}">
        <td><strong>#${rec.id}</strong></td>
        <td>${escapeHTML(rec.city)}</td>
        <td><span class="badge badge-${rec.condition}">${rec.condition}</span></td>
        <td style="font-weight: bold; color: var(--primary-color);">${parseFloat(rec.temp).toFixed(0)}°C</td>
        <td>💧 ${rec.humidity}%</td>
        <td>💨 ${rec.windSpeed} km/h</td>
        <td>${rec.date}</td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary btn-sm btn-edit" data-id="${rec.id}" type="button">
              ✏️ Edit
            </button>
            <button class="btn btn-danger btn-sm btn-delete" data-id="${rec.id}" type="button">
              🗑️ Delete
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  adminTableContainer.innerHTML = `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>Condition</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Wind Speed</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHTML}
        </tbody>
      </table>
    </div>
  `;

  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      loadRecordToEdit(id);
    });
  });
}
```javascript
document.querySelectorAll('.btn-delete').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-id');
    confirmDelete(id);
  });
});

async function loadRecordToEdit(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to load details: HTTP ${response.status}`);
    }

    const rec = await response.json();

    editCityId.value = rec.id;
    editCityName.value = rec.city;
    editCityTemp.value = rec.temp;
    editCityCondition.value = rec.condition;
    editCityHumidity.value = rec.humidity;
    editCityWindSpeed.value = rec.windSpeed;
    editCityDate.value = rec.date;

    editInputs.forEach(input => input.classList.remove('is-invalid'));

    editModalBackdrop.classList.add('show');
  } catch (error) {
    alert("Could not retrieve city details from database.");
  }
}

function closeEditModal() {
  editModalBackdrop.classList.remove('show');
  editWeatherForm.reset();
}

async function submitEditForm(event) {
  event.preventDefault();

  if (!validateEditForm()) {
    return;
  }

  const id = editCityId.value;

  const updatedReport = {
    city: editCityName.value.trim(),
    temp: parseFloat(editCityTemp.value),
    condition: editCityCondition.value,
    humidity: parseInt(editCityHumidity.value, 10),
    windSpeed: parseFloat(editCityWindSpeed.value),
    date: editCityDate.value
  };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedReport)
    });

    if (!response.ok) {
      throw new Error(`Failed to update weather: HTTP ${response.status}`);
    }

    closeEditModal();
    await fetchAdminData();
  } catch (error) {
    alert("Could not update city weather on JSON Server.");
  }
}

async function confirmDelete(id) {
  const rec = weatherRecords.find(r => r.id === id);
  const city = rec ? rec.city : `#${id}`;

  const hasConfirmed = confirm(
    `⚠️ Are you sure you want to permanently delete the weather report for "${city}"?`
  );

  if (!hasConfirmed) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Failed to delete report: HTTP ${response.status}`);
    }

    await fetchAdminData();
  } catch (error) {
    alert("Could not delete record from JSON Server database.");
  }
}

function showLoading() {
  adminTableContainer.innerHTML = `
    <div class="loading-indicator">
      <div class="spinner"></div>
      <p>Loading weather logs...</p>
    </div>
  `;
}

function showErrorState() {
  adminTableContainer.innerHTML = `
    <div class="error-state">
      <h3>⚠️ Connection Error</h3>
      <p>Could not communicate with the backend. Please check that JSON Server is running locally:</p>
      <code style="display: block; margin: 0.5rem 0; background: rgba(0,0,0,0.1); padding: 0.4rem; border-radius: 4px; font-weight: bold;">
        npx json-server --watch db.json --port 3000
      </code>
      <button class="btn btn-secondary btn-sm" id="btnRetryLoadAdmin">
        🔄 Retry Connection
      </button>
    </div>
  `;

  const btnRetry = document.getElementById('btnRetryLoadAdmin');

  if (btnRetry) {
    btnRetry.addEventListener('click', fetchAdminData);
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

editWeatherForm.addEventListener('submit', submitEditForm);
btnCancelEdit.addEventListener('click', closeEditModal);
btnCancelCross.addEventListener('click', closeEditModal);

window.addEventListener('click', (event) => {
  if (event.target === editModalBackdrop) {
    closeEditModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  fetchAdminData();
});
```

