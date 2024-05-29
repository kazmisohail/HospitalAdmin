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

    fetchPendingAppData();
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

    fetchCompletedAppData();
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

    fetchTodayAppData();
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
const apiUrl3 = 'http://localhost:3001/api/completedApp1';

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
            <button class="btn btn-info" type="button"
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
            <button class="btn btn-info" type="button"
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

// Completed Appointment Profile
// Function to fetch and display appointment profile in modal
function fetchCompAppProfile(id) {
  const profileModal = document.getElementById('appointmentProfileModal');
  const modalBody = profileModal.querySelector('.compAppP1');

  fetch(`${apiUrl1}/${id}`)
    .then(response => response.json())
    .then(compApp => {
      modalBody.innerHTML = `
                <p><strong>Appointment ID: </strong>${compApp.AppointmentID}</p>
                <p><strong>Patient ID: </strong>${compApp.PatientID}</p>
                <p><strong>Dcotor ID: </strong>${compApp.DoctorID}</p>
                <p><strong>Diagnosis: </strong>${compApp.DiagnosisName}</p>
                <p><strong>Date: </strong>${compApp.Date}</p>
                <p><strong>Time: </strong>${compApp.Time}</p>
          `;
      // Open the modal
      const modal = new bootstrap.Modal(profileModal);
      modal.show();
    })
    .catch(error => console.error(error));
}

// Event listener for profile buttons
document.addEventListener('click', event => {
  if (event.target.classList.contains('profile-button')) {
    const compAppointmentID = event.target.dataset.compAppointmentId;
    fetchCompAppProfile(compAppointmentID);
  }
});

// Function to fetch and display appointment profile2 in modal
function fetchCompApp1Profile(id1) {
  const profileModal = document.getElementById('appointmentProfileModal');
  const modalBody = profileModal.querySelector('.compAppP2');

  fetch(`${apiUrl3}/${id1}`)
    .then(response => response.json())
    .then(compApp => {
      modalBody.innerHTML = `
            <p><strong>Rating: </strong>${compApp.AppointmentID}</p>
            <p><strong>Comments: </strong>${compApp.PatientID}</p>
          `;
      // Open the modal
      const modal = new bootstrap.Modal(profileModal);
      modal.show();
    })
    .catch(error => console.error(error));
}

// Event listener for profile buttons
document.addEventListener('click', event => {
  if (event.target.classList.contains('profile-button')) {
    const compAppointmentID1 = event.target.dataset.compAppointmentId;
    fetchCompApp1Profile(compAppointmentID1);
  }
});


// Pending Appointment Search

const apiUrlpA = 'http://localhost:3001/api/pASearch';

// Function to fetch pharmacists data and populate table
function searchPA(id) {
    fetch(`${apiUrlpA}/${id}`)
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
            <button class="btn btn-info" type="button"
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

// // Call function to fetch data on click
// document.addEventListener('click', event => {
//     if (event.target.classList.contains('srchAp')) {
//         const id = document.getElementById('searchInputAp').value
//         searchPA(id);
//     }
// });


// Appointment Search

const apiUrlcA = 'http://localhost:3001/api/cASearch';

// Function to fetch pharmacists data and populate table
function searchCA(id) {
    fetch(`${apiUrlcA}/${id}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('completedAppTableBody');
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
            <button class="btn btn-info" type="button"
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

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('srchAp')) {
        const id = document.getElementById('searchInputAp').value
        searchCA(id);
        searchPA(id);
    }
});