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
const apiUrl2 = 'http://localhost:3001/api/allDoctorsTable1';

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
              <button class="btn btn-info profile-button" type="button"
               data-bs-toggle="modal" data-bs-target="#doctorProfileModal"
               data-doctor-id="${doctor.DoctorID}">Profile</button>
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

function fetchDoctorProfile(id) {
  const profileModal = document.getElementById('doctorProfileModal');
  const modalBody = profileModal.querySelector('.modal-body');

  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(doctor => {
      modalBody.innerHTML = `
                    <div id="General" class="tab-content active">
                        <p><strong>Doctor ID:</strong> ${doctor.DoctorID}</p>
                        <p><strong>Name:</strong> ${doctor.EmpName}</p>
                        <p><strong>DOB:</strong> ${doctor.DOB}</p>
                        <p><strong>Gender:</strong> ${doctor.Gender}</p>
                        <p><strong>Contact:</strong> ${doctor.Contact}</p>
                        <p><strong>Address:</strong> ${doctor.Address}</p>
                        <p><strong>Email:</strong> ${doctor.Email}</p>
                        <p><strong>DOJ:</strong> ${doctor.DOJ}</p>
                        <p><strong>Salary:</strong> ${doctor.Salary}</p>
                        <hr>
                        <form action="">
                            <h3>Change Details</h3>
                            <input type="text" class="form-control" name="" placeholder="New Contact"
                                required="false">
                            <input type="text" class="form-control" name="" placeholder="New Address"
                                required="false">
                            <input type="number" class="form-control" name="" placeholder="New Salary"
                                required="false">
                        </form>
                    </div>
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
    const patientId = event.target.dataset.doctorId;
    fetchDoctorProfile(patientId);
  }
});

// Function to fetch and display patient medical in modal
function fetchDoctor1Profile(id1) {
  const profileModal = document.getElementById('doctorProfileModal');
  const modalBody = profileModal.querySelector('.modal-body1');

  fetch(`${apiUrl2}/${id1}`)
    .then(response => response.json())
    .then(doctorS => {
      modalBody.innerHTML = `
      <div id="Departmental" class="tab-content">
        <p><strong>Doctor ID:</strong> ${doctorS.DoctorID}</p>
        <p><strong>Specialization:</strong> ${doctorS.Specialization}</p>
        <p><strong>Status:</strong> ${doctorS.Status}</p>
        <p><strong>OPD Charges:</strong> ${doctorS.OPDCharges}</p>
        <p><strong>Shift ID:</strong> ${doctorS.ShiftID}</p>
        <p><strong>Day:</strong> ${doctorS.Day}</p>
        <p><strong>Placement:</strong> ${doctorS.Placement}</p>
        <hr>
        <form action="">
            <h3>Update Details</h3>
            <input type="text" class="form-control" name="" placeholder="New Specialization"
                required="false">
            <input type="text" class="form-control" name="" placeholder="New Status"
                required="false">
            <input type="number" class="form-control" name="" placeholder="New OPD Charges"
                required="false">
        </form>
      </div>
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
    const patientId1 = event.target.dataset.doctorId;
    fetchDoctor1Profile(patientId1);
  }
});


// Doctor Search

const apiUrlD = 'http://localhost:3001/api/dcSearch';

// Function to fetch pharmacists data and populate table
function searchDoctors(name) {
    fetch(`${apiUrlD}/${name}`)
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
              <button class="btn btn-info profile-button" type="button"
              data-bs-toggle="modal" data-bs-target="#doctorProfileModal"
              data-doctor-id="${doctor.DoctorID}">Profile</button>
              <button class="btn btn-danger" type="button" onclick="deleteDoctor()">Delete</button>
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
    if (event.target.classList.contains('srchD')) {
        const name = document.getElementById('searchInputD').value
        searchDoctors(name);
    }
});
