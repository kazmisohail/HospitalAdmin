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

// Function to fetch pharmacists data and populate table
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
                data-bs-toggle="modal" data-bs-target="#appointmentProfileModal"
                data-appointment-id="${pendApp.AppointmentIDID}">Profile</button>
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
