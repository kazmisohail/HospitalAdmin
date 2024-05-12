/* <!-- JavaScript code to fetch and display appointments --> */

// Function to fetch and display all appointments
async function getAllAppointments() {
    try {
        const response = await fetch('/api/appointments');
        const appointments = await response.json();
        renderAppointments(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

// Function to search for appointments
async function searchAppointments(query) {
    try {
        const response = await fetch(`/api/appointments?search=${query}`);
        const appointments = await response.json();
        renderAppointments(appointments);
    } catch (error) {
        console.error('Error searching appointments:', error);
    }
}

// Function to render appointments on the UI
function renderAppointments(appointments) {
    const tableBody = document.getElementById('appointmentTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    appointments.forEach(appointment => {
        const row = tableBody.insertRow();
        row.innerHTML = `
                                <td>${appointment.id}</td>
                                <td>${appointment.patientId}</td>
                                <td>${appointment.doctorId}</td>
                                <td>${appointment.diagnosis}</td>
                                <td>${appointment.date}</td>
                                <td>${appointment.time}</td>
                                <td>${appointment.status}</td>
                                <td>
                                    <button onclick="editAppointment(${appointment.id})">Edit</button>
                                    <button onclick="deleteAppointment(${appointment.id})">Delete</button>
                                </td>
                            `;
    });
}

// Function to handle form submission
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() !== '') {
        searchAppointments(searchInput);
    } else {
        getAllAppointments();
    }
});

// Function to edit appointment details
function editAppointment(appointmentId) {
    // Implement edit functionality here
    alert('Edit appointment with ID: ' + appointmentId);
}

// Function to delete an appointment
function deleteAppointment(appointmentId) {
    // Implement
}
