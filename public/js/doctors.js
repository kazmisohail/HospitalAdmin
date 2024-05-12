/* <!-- JavaScript code to fetch and display doctors --> */
// Function to fetch and display all doctors
async function getAllDoctors() {
    try {
        const response = await fetch('/api/doctors');
        const doctors = await response.json();
        renderDoctors(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
    }
}

// Function to search for doctors
async function searchDoctors(query) {
    try {
        const response = await fetch(`/api/doctors?search=${query}`);
        const doctors = await response.json();
        renderDoctors(doctors);
    } catch (error) {
        console.error('Error searching doctors:', error);
    }
}

// Function to render doctors on the UI
function renderDoctors(doctors) {
    const tableBody = document.getElementById('doctorTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    doctors.forEach(doctor => {
        const row = tableBody.insertRow();
        row.innerHTML = `
                                <td>${doctor.id}</td>
                                <td>${doctor.name}</td>
                                <td>${doctor.specialization}</td>
                                <td>
                                    <button onclick="editDoctor(${doctor.id})">Edit</button>
                                    <button onclick="deleteDoctor(${doctor.id})">Delete</button>
                                </td>
                            `;
    });
}

// Function to handle form submission
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() !== '') {
        searchDoctors(searchInput);
    } else {
        getAllDoctors();
    }
});

// Function to edit doctor details
function editDoctor(doctorId) {
    // Implement edit functionality here
    alert('Edit doctor with ID: ' + doctorId);
}

// Function to delete a doctor
function deleteDoctor(doctorId) {
    // Implement delete functionality here
    alert('Delete doctor with ID: ' + doctorId);
}

// Fetch all doctors when the page loads
getAllDoctors();
