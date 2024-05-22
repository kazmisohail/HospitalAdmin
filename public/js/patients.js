const apiUrl = 'http://localhost:3001/api/patientsTable';

// Function to fetch pharmacists data and populate table
function fetchPatientsData() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('patientTableBody');
      tableBody.innerHTML = '';

      data.forEach(patient => {
        const row = `
          <tr>
            <td>${patient.PatientID}</td>
            <td>${patient.PatientName}</td>
            <td>${patient.Gender}</td>
            <td>${patient.Status}</td>
            <td>${patient.Contact}</td>
            <td>
              <button class="btn btn-info" type="button" data-bs-toggle="modal"
                data-bs-target="#pharmacyProfileModal">Profile</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error(error));
}

// Call function to fetch data when page loads
document.addEventListener('DOMContentLoaded', fetchPatientsData);
