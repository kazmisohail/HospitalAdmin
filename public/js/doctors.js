function showAllDoctors() {
  document.getElementById('allDoctorsSection').style.display = 'block';
  document.getElementById('topDoctorsSection').style.display = 'none';
  document.getElementById('allDoctorsBtn').classList.add('btn-primary');
  document.getElementById('allDoctorsBtn').classList.remove('btn-secondary');
  document.getElementById('topDoctorsBtn').classList.add('btn-secondary');
  document.getElementById('topDoctorsBtn').classList.remove('btn-primary');
}

function showTopDoctors() {
  document.getElementById('allDoctorsSection').style.display = 'none';
  document.getElementById('topDoctorsSection').style.display = 'block';
  document.getElementById('allDoctorsBtn').classList.add('btn-secondary');
  document.getElementById('allDoctorsBtn').classList.remove('btn-primary');
  document.getElementById('topDoctorsBtn').classList.add('btn-primary');
  document.getElementById('topDoctorsBtn').classList.remove('btn-secondary');
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

function deleteDoctor() {
  // Implement delete doctor functionality
  alert('Deleting doctor ID: ');
}

// Backend Starts Here
const apiUrl = 'http://localhost:3001/api/allDoctorsTable';

// Function to fetch pharmacists data and populate table
function fetchAllDoctorsData() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('allDoctorsTableBody');
      tableBody.innerHTML = '';

      data.forEach(doctor => {
        const row = `
          <tr>
            <td>${doctor.DoctorID}</td>
            <td>${doctor.EmpName}</td>
            <td>${doctor.DOB}</td>
            <td>${doctor.Status}</td>
            <td>
              <button class="btn btn-info" type="button" data-bs-toggle="modal"
                data-bs-target="#doctorProfileModal">Profile</button>
                <button class="btn btn-danger" type="button" onclick="deleteDoctor()">Delete</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error(error));
}

// Call function to fetch data when page loads
document.addEventListener('DOMContentLoaded', fetchAllDoctorsData);

// Top Doctors
const apiUrl1 = 'http://localhost:3001/api/topDoctorsTable';

// Function to fetch pharmacists data and populate table
function fetchTopDoctorsData() {
  fetch(apiUrl1)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('topDoctorsTableBody');
      tableBody.innerHTML = '';

      data.forEach(doctor => {
        const row = `
          <tr>
            <td>${doctor.DoctorID}</td>
            <td>${doctor.EmpName}</td>
            <td>${doctor.DOB}</td>
            <td>${doctor.AppointmentCount}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error(error));
}

// Call function to fetch data when page loads
document.addEventListener('DOMContentLoaded', fetchTopDoctorsData);