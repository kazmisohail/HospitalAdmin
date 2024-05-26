function showPending() {
    document.getElementById('pendingSection').style.display = 'block';
    document.getElementById('completedSection').style.display = 'none';
    document.getElementById('todaysSection').style.display = 'none';
    document.getElementById('pendingBtn').classList.add('btn-primary');
    document.getElementById('pendingBtn').classList.remove('btn-secondary');
    document.getElementById('completedBtn').classList.add('btn-secondary');
    document.getElementById('completedBtn').classList.remove('btn-primary');
    document.getElementById('todaysBtn').classList.add('btn-secondary');
    document.getElementById('todaysBtn').classList.remove('btn-primary');
}

function showCompleted() {
    document.getElementById('pendingSection').style.display = 'none';
    document.getElementById('completedSection').style.display = 'block';
    document.getElementById('todaysSection').style.display = 'none';
    document.getElementById('pendingBtn').classList.add('btn-secondary');
    document.getElementById('pendingBtn').classList.remove('btn-primary');
    document.getElementById('completedBtn').classList.add('btn-primary');
    document.getElementById('completedBtn').classList.remove('btn-secondary');
    document.getElementById('todaysBtn').classList.add('btn-secondary');
    document.getElementById('todaysBtn').classList.remove('btn-primary');
}

function showTodays() {
    document.getElementById('pendingSection').style.display = 'none';
    document.getElementById('completedSection').style.display = 'none';
    document.getElementById('todaysSection').style.display = 'block';
    document.getElementById('pendingBtn').classList.add('btn-secondary');
    document.getElementById('pendingBtn').classList.remove('btn-primary');
    document.getElementById('completedBtn').classList.add('btn-secondary');
    document.getElementById('completedBtn').classList.remove('btn-primary');
    document.getElementById('todaysBtn').classList.add('btn-primary');
    document.getElementById('todaysBtn').classList.remove('btn-secondary');
}

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


// Backend Starts Here
const apiUrl = 'http://localhost:3001/api/pendingApp';
const apiUrl1 = 'http://localhost:3001/api/completedApp';
const apiUrl2 = 'http://localhost:3001/api/todaysApp';

// Pending Appointments
// Function to fetch data and populate table
function fetchPendingAppData() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('pendingAppTableBody');
      tableBody.innerHTML = '';

      data.forEach(pendApp => {
        const row = `
          <tr>
            <td>${pendApp.AppointmentID}</td>
            <td>${pendApp.PatientID}</td>
            <td>${pendApp.DoctorID}</td>
            <td>${pendApp.DiagnosisName}</td>
            <td>${pendApp.Date}</td>
            <td>${pendApp.Time}</td>
            <td>
            <button class="btn btn-info profile-button" type="button"
                data-bs-toggle="modal" data-bs-target="#appointmentUpdateModal"
                data-appointment-id="${pendApp.AppointmentID}">Update</button>
                <button class="btn btn-danger" type="button">Cancel</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error(error));
}

// Call function to fetch data when page loads
document.addEventListener('DOMContentLoaded', fetchPendingAppData);

// Completed Appointments
// Function to fetch data and populate table
function fetchCompletedAppData() {
  fetch(apiUrl1)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('completedAppTableBody');
      tableBody.innerHTML = '';

      data.forEach(compApp => {
        const row = `
          <tr>
            <td>${compApp.AppointmentID}</td>
            <td>${compApp.PatientID}</td>
            <td>${compApp.DoctorID}</td>
            <td>${compApp.DiagnosisName}</td>
            <td>${compApp.Date}</td>
            <td>${compApp.Time}</td>
            <td>${compApp.Rating}</td>
            <td>${compApp.Comments}</td>
            <td>
            <button class="btn btn-info profile-button" type="button"
                data-bs-toggle="modal" data-bs-target="#appointmentProfileModal"
                data-appointment-id="${compApp.AppointmentID}">Profile</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error(error));
}

// Call function to fetch data when page loads
document.addEventListener('DOMContentLoaded', fetchCompletedAppData);

// Today's Appointments
// Function to fetch data and populate table
function fetchTodayAppData() {
  fetch(apiUrl2)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('todaysAppTableBody');
      tableBody.innerHTML = '';

      data.forEach(tApp => {
        const row = `
          <tr>
            <td>${tApp.AppointmentID}</td>
            <td>${tApp.PatientID}</td>
            <td>${tApp.DoctorID}</td>
            <td>${tApp.DiagnosisName}</td>
            <td>${tApp.Date}</td>
            <td>${tApp.Time}</td>
            <td>${tApp.Rating}</td>
            <td>${tApp.Comments}</td>
            <td>
            <button class="btn btn-info profile-button" type="button"
                data-bs-toggle="modal" data-bs-target="#appointmentUpdateModal"
                data-appointment-id="${tApp.AppointmentID}">Update</button>
            <button class="btn btn-danger" type="button">Cancel</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error(error));
}

// Call function to fetch data when page loads
document.addEventListener('DOMContentLoaded', fetchTodayAppData);