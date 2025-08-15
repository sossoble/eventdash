// Sample Events
const events = [
  { name: "Career Fair", date: "2025-08-20", venue: "Main Hall", slots: 3 },
  { name: "Tech Conference", date: "2025-09-10", venue: "Auditorium", slots: 2 },
  { name: "Cultural Festival", date: "2025-09-15", venue: "Sports Ground", slots: 5 },
  { name: "Research Symposium", date: "2025-09-25", venue: "Library", slots: 1 },
  { name: "Alumni Meet", date: "2025-10-05", venue: "Conference Center", slots: 4 }
];

// Load from localStorage if available
let storedEvents = JSON.parse(localStorage.getItem("events")) || events;

// Elements
const eventsTableBody = document.querySelector("#eventsTable tbody");
const eventSelect = document.getElementById("eventSelect");
const registrationForm = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");

// Render Events Table
function renderEvents() {
  eventsTableBody.innerHTML = "";
  eventSelect.innerHTML = "";

  storedEvents.forEach((event, index) => {
    // Table row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Event Name">${event.name}</td>
      <td data-label="Date">${event.date}</td>
      <td data-label="Venue">${event.venue}</td>
      <td data-label="Slots">${event.slots}</td>
      <td>
        <button class="register-btn" ${event.slots === 0 ? "disabled" : ""}>
          ${event.slots === 0 ? "Fully Booked" : "Register"}
        </button>
      </td>
    `;
    eventsTableBody.appendChild(row);

    // Dropdown option
    if (event.slots > 0) {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = event.name;
      eventSelect.appendChild(option);
    }

    // Button functionality
    row.querySelector(".register-btn").addEventListener("click", () => {
      if (storedEvents[index].slots > 0) {
        storedEvents[index].slots -= 1;
        saveData();
        renderEvents();
        alert(`Successfully registered for ${event.name}!`);
      }
    });
  });
}

// Save to localStorage
function saveData() {
  localStorage.setItem("events", JSON.stringify(storedEvents));
}

// Form Submission
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const selectedEventIndex = eventSelect.value;

  // Validation
  if (!name || !studentId || selectedEventIndex === "") {
    formMessage.textContent = "⚠️ Please fill all fields correctly.";
    formMessage.style.color = "red";
    return;
  }
  if (!/^[0-9]{4,10}$/.test(studentId)) {
    formMessage.textContent = "⚠️ Student ID must be numeric (4-10 digits).";
    formMessage.style.color = "red";
    return;
  }

  const selectedEvent = storedEvents[selectedEventIndex];
  formMessage.textContent = `✅ ${name} (ID: ${studentId}) registered for "${selectedEvent.name}".`;
  formMessage.style.color = "green";
});

// Initial Render
renderEvents();
