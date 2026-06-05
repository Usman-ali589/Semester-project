```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Administrative Control Panel for Usman Weather Forecast. Manage city logs, revise stats, and update records.">
  <title>Admin Portal - Smart Weather Forecast</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <nav class="admin-navbar" id="adminNavbar">
    <div class="nav-links">
      <a href="index.html" id="linkDashboard">Dashboard</a>
      <a href="admin.html" class="active" id="linkAdmin">Admin Portal</a>
    </div>
    <div class="brand" id="navBrand">
      ⚙️ Smart Weather Forecast <span class="admin-badge">Admin</span>
    </div>
    <div class="nav-controls">
      <button class="theme-btn" id="btnThemeToggle" aria-label="Toggle theme" type="button">🌓 Theme</button>
    </div>
  </nav>

  <main>
    <header class="dashboard-title">
      <h1>Weather Administration Dashboard</h1>
      <p style="color: var(--text-muted);">Perform updates on city forecasts, monitor extreme metrics, and manage overall logs.</p>
    </header>

    <section class="stats-grid" id="adminStatsSection" aria-label="Summary Statistics">
      <div class="stat-card" id="cardTotalCities">
        <span class="stat-label">Total Cities Tracked</span>
        <span class="stat-value" id="statTotalCities">0</span>
      </div>

      <div class="stat-card" id="cardMaxTemp">
        <span class="stat-label">Highest Temperature</span>
        <span class="stat-value" id="statMaxTemp" style="color: var(--danger-color);">0°C</span>
      </div>

      <div class="stat-card" id="cardMinTemp">
        <span class="stat-label">Lowest Temperature</span>
        <span class="stat-value" id="statMinTemp" style="color: var(--primary-color);">0°C</span>
      </div>
    </section>

    <section class="card" id="managementSection">
      <h2 class="card-title">All City Weather Logs</h2>

      <div id="adminTableContainer"></div>
    </section>
  </main>

  <div class="modal-backdrop" id="editModalBackdrop">
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalHeading">

      <div class="modal-header">
        <h3 id="modalHeading">Edit Weather Report</h3>
        <button class="modal-close" id="btnCancelCross" aria-label="Close modal">&times;</button>
      </div>

      <form id="editWeatherForm" novalidate>

        <input type="hidden" id="editCityId">

        <div class="form-group">
          <label for="editCityName">City Name</label>
          <input type="text" id="editCityName" class="form-control" placeholder="e.g. Lahore" required>
          <div class="invalid-feedback" id="editCityError">
            Please enter a valid city name (at least 3 characters).
          </div>
        </div>

        <div class="form-group" style="margin-top: 0.8rem;">
          <label for="editCityTemp">Temperature (°C)</label>
          <input type="number" id="editCityTemp" class="form-control" placeholder="e.g. 25" required>
          <div class="invalid-feedback" id="editTempError">
            Please enter a valid temperature (between -50 and 60°C).
          </div>
        </div>

        <div class="form-group" style="margin-top: 0.8rem;">
          <label for="editCityCondition">Weather Condition</label>
          <select id="editCityCondition" class="form-control" required>
            <option value="Sunny">Sunny</option>
            <option value="Rainy">Rainy</option>
            <option value="Cloudy">Cloudy</option>
            <option value="Windy">Windy</option>
            <option value="Snowy">Snowy</option>
          </select>
          <div class="invalid-feedback" id="editConditionError">
            Please select a weather condition.
          </div>
        </div>

        <div class="form-group" style="margin-top: 0.8rem;">
          <label for="editCityHumidity">Humidity (%)</label>
          <input type="number" id="editCityHumidity" class="form-control" placeholder="e.g. 55" min="0" max="100" required>
          <div class="invalid-feedback" id="editHumidityError">
            Please enter a valid humidity (0 to 100%).
          </div>
        </div>

        <div class="form-group" style="margin-top: 0.8rem;">
          <label for="editCityWindSpeed">Wind Speed (km/h)</label>
          <input type="number" id="editCityWindSpeed" class="form-control" placeholder="e.g. 15" min="0" required>
          <div class="invalid-feedback" id="editWindSpeedError">
            Please enter a valid wind speed (0 or greater).
          </div>
        </div>

        <div class="form-group" style="margin-top: 0.8rem;">
          <label for="editCityDate">Report Date</label>
          <input type="date" id="editCityDate" class="form-control" required>
          <div class="invalid-feedback" id="editDateError">
            Please select a valid date.
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btnCancelEdit">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" id="btnSaveEdit">
            Save Changes
          </button>
        </div>

      </form>

    </div>
  </div>

  <script src="admin.js"></script>
</body>
</html>
```

