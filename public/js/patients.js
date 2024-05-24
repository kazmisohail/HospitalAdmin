function openTab(event, tabName) {
  const tabContents = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = 'none';
  }

  const tabButtons = document.getElementsByClassName('tab-button');
  for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = tabButtons[i].className.replace(' active', '');
  }

  document.getElementById(tabName).style.display = 'block';
  event.currentTarget.className += ' active';
}

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
                data-bs-target="#patientProfileModal">Profile</button>
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
