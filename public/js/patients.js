/* JavaScript code to fetch and display patients */

// Function to fetch and display all patients
async function getAllPatients() {
    try {
        const response = await fetch('/api/patients');
        const patients = await response.json();
        renderPatients(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
}

// Function to search for patients
async function searchPatients(query) {
    try {
        const response = await fetch(`/api/patients?search=${query}`);
        const patients = await response.json();
        renderPatients(patients);
    } catch (error) {
        console.error('Error searching patients:', error);
    }
}

// Function to render patients on the UI
function renderPatients(patients) {
    const tableBody = document.getElementById('patientTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    patients.forEach(patient => {
        const row = tableBody.insertRow();
        row.innerHTML = `
                    <td>${patient.id}</td>
                    <td>${patient.name}</td>
                    <td>${patient.gender}</td>
                    <td>${patient.status}</td>
                    <td>${patient.contact}</td>
                    <td>
                        <button onclick="editPatient(${patient.id})">Edit</button>
                        <button onclick="deletePatient(${patient.id})">Delete</button>
                    </td>
                `;
    });
}

// Function to handle form submission
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() !== '') {
        searchPatients(searchInput);
    } else {
        getAllPatients();
    }
});

// Function to edit patient details
function editPatient(patientId) {
    // Implement edit functionality here
    alert('Edit patient with ID: ' + patientId);
}

// Function to delete a patient
function deletePatient(patientId) {
    // Implement delete functionality here
    alert('Delete patient with ID: ' + patientId);
}
