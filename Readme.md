# Smart Weather Forecast ⛅
### Capstone Project Submission — Web Technologies SP26

---

## 👤 Student Information Header
- **Student Name:** [Usman Ali]
- **Roll Number:** [F24BDOCS1M01314]
- **Project Domain:** Real-time Weather Forecasting & Meteorological Logging

---

## 📌 Project Overview
The **Smart Weather Forecast** is a clean, lightweight, single-page-inspired web application designed to help users track regional weather metrics, review temperature alerts, and log local meteorology parameters. It features a straightforward, zero-framework CSS Flexbox design that is highly readable, responsive, and extremely simple to run.

It supports persistent light/dark themes and executes dynamic REST API operations (GET, POST, PUT, DELETE) on a local **JSON Server** simulating full-stack database integrations.

---

## ⚙️ How to Install & Run

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Step 1: Clone or Open Project Folder
Open your terminal/command prompt and navigate into the project directory:
```bash
cd "d:\University\Usman Web Project"
```

### Step 2: Start the JSON Server
Launch the REST mock database by running the following command from the project root:
```bash
npx json-server --watch db.json --port 3000
```
*Note: Make sure JSON Server is running successfully at `http://localhost:3000/weather`. If port 3000 is occupied, you can run on another port but update the `API_URL` variable in `app.js` and `admin.js` accordingly.*

### Step 3: Run the Application
Simply double-click or open **`index.html`** in any modern web browser (Chrome, Edge, Firefox, Safari) to view the application live!
- Access the User Dashboard at: `index.html`
- Access the Admin Panel at: `admin.html`

---

## 🌟 Core Features & Grading Criteria Addressed

### 1. User Dashboard (`index.html` / `app.js`)
- **GET (Fetch & Display)**: Pulls all city weather logs from JSON Server and injects them as simple, visual cards.
- **Dynamic Filtering**: Instantly filters city cards by **Weather Condition** (Sunny, Rainy, Cloudy, Windy, Snowy).
- **POST (Report Local Weather Form)**: A responsive reporting form featuring **6 input fields**:
  1. City Name (text input)
  2. Temperature in degree Celsius (°C) (number input)
  3. Weather Condition (select dropdown)
  4. Humidity percentage (%) (number input)
  5. Wind Speed in km/h (number input)
  6. Date of Report (date picker)
- **Inline validation**: Triggers automatically on submit, highlighting invalid elements and showing custom error labels in red **without annoying alert boxes**.
- **Auto-Rendering**: List immediately updates itself once a transaction is successfully written via POST.
- **Connection States**: Shows a custom CSS loading spinner while loading, and a readable offline error card with a **🔄 Retry Connection** button if JSON Server goes offline.

### 2. Admin Portal (`admin.html` / `admin.js`)
- **Visual Distinction**: Styled using a premium dark navy navigation color scheme and clear **Weather Admin** labels to differentiate it clearly from the user dashboard.
- **Summary Statistics (3 Cards)**:
  1. **Total Cities Tracked**: Count of active weather records in the database.
  2. **Highest Temperature (°C)**: Extreme hot temperature alert showing the peak Celsius reading.
  3. **Lowest Temperature (°C)**: Extreme cold temperature alert showing the lowest Celsius reading.
- **PUT (Edit Resource)**: Click "✏️ Edit" on any city row to load its details into a beautiful blur-backdrop modal form, and save changes using an HTTP `PUT` request.
- **DELETE (Delete Resource)**: Click "🗑️ Delete" to open a confirm validation dialog. Approving sends an HTTP `DELETE` call to clear the row and updates the dashboard immediately.

### 3. Unified Technical Quality
- **Flexbox Only**: CSS is structured using a simple, lightweight Flexbox layout system without unnecessary frameworks or complex layouts.
- **Theme Persistence**: Complete dark mode implementation persisted in the user browser's `localStorage`.
- **Modern JavaScript**: Standardized on pure `async/await` syntax with proper `try/catch` error block guards and checks for `response.ok` on every single request.
- **No Console Debug Pollutions**: Cleaned and validated JavaScript files free of dead code blocks or left-behind `console.log` statements.

---

## 📸 App Screenshots Mockups
Once your app is running, capture screenshot clips and save them here!

### 1. User Dashboard (Light & Dark Mode)
`[Insert index.html Screenshot Here]`

### 2. Admin Management Panel & Stats
`[Insert admin.html Screenshot Here]`

### 3. Modal Edit Dialog
`[Insert Edit Modal Dialog Screenshot Here]`

---

## 🎓 Viva & Concept Discussion Cheat Sheet
During your Capstone presentation, be prepared to answer:
1. **How does `async/await` differ from `.then()`?**
   - *Answer:* `async/await` makes asynchronous code look and behave like synchronous code. It avoids nested "callback hell" and relies on standard `try/catch` syntax for cleaner error handling.
2. **What are the REST HTTP Methods and status codes we used?**
   - `GET`: Read resources (Returns status code `200 OK`)
   - `POST`: Create new resource (Returns status code `201 Created`)
   - `PUT`: Update a resource entirely (Returns status code `200 OK`)
   - `DELETE`: Remove a resource (Returns status code `200 OK` or `204 No Content`)
3. **Why do we check `response.ok`?**
   - *Answer:* `fetch()` only rejects a promise on network failures (e.g. server offline). If the server returns a `404 Not Found` or `500 Server Error`, fetch still succeeds! Checking `response.ok` validates if the status is in the 2xx range before we try to parse it.

