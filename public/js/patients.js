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
const apiUrl = 'http://localhost:3001/api/patientsTable';
const apiUrl1 = 'http://localhost:3001/api/patientsTable1';
const apiUrl2 = 'http://localhost:3001/api/patientsTable2';

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
              <button class="btn btn-info profile-button" type="button"
                data-bs-toggle="modal" data-bs-target="#patientProfileModal"
                data-patient-id="${patient.PatientID}">Profile</button>
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

// Function to fetch and display patient profile in modal
function fetchPatientProfile(id) {
  const profileModal = document.getElementById('patientProfileModal');
  const modalBody = profileModal.querySelector('.modal-body');

  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(patient => {
      modalBody.innerHTML = `
      <div id="General" class="tab-content active">
        <p><strong>Patient ID:</strong> ${patient.PatientID}</p>
        <p><strong>Name:</strong> ${patient.PatientName}</p>
        <p><strong>DOB:</strong> ${patient.DOB}</p>
        <p><strong>Gender:</strong> ${patient.Gender}</p>
        <p><strong>Contact:</strong> ${patient.Contact}</p>
        <p><strong>Address:</strong> ${patient.Address}</p>
        <p><strong>Email:</strong> ${patient.Email}</p>
        <p><strong>Status:</strong> ${patient.Status}</p>
        <hr>
        <form action="">
          <h3>Update Details</h3>
          <input type="text" class="form-control" name="" placeholder="New Contact"
              required="false">
          <input type="text" class="form-control" name="" placeholder="New Address"
              required="false">
          <input type="text" class="form-control" name="" placeholder="New Status"
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
    const patientId = event.target.dataset.patientId;
    fetchPatientProfile(patientId);
  }
});

// Function to fetch and display patient medical in modal
function fetchPatientMedicalProfile(id1) {
  const profileModal = document.getElementById('patientProfileModal');
  const modalBody = profileModal.querySelector('.modal-body1');

  fetch(`${apiUrl1}/${id1}`)
    .then(response => response.json())
    .then(patientM => {
      modalBody.innerHTML = `
                    <div id="Medical" class="tab-content">
                        <p><strong>Patient ID:</strong> ${patientM.PatientID}</p>
                        <p><strong>Appointment ID:</strong> ${patientM.AppointmentID}</p>
                        <p><strong>Diagnosis Name:</strong> ${patientM.DiagnosisName}</p>
                        <p><strong>Treatment History:</strong> ${patientM.TreatmentHistory}</p>
                        <p><strong>Allergies:</strong> ${patientM.Allergies}</p>
                        <p><strong>Previous Surgeries:</strong> ${patientM.PreviousSurgeries}</p>
                        <p><strong>Family History:</strong> ${patientM.FamilyHistory}</p>
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
    const patientId1 = event.target.dataset.patientId;
    fetchPatientMedicalProfile(patientId1);
  }
});

// Function to fetch and display patient lab in modal
function fetchPatientLabProfile(id2) {
  const profileModal = document.getElementById('patientProfileModal');
  const modalBody = profileModal.querySelector('.modal-body2');

  fetch(`${apiUrl2}/${id2}`)
    .then(response => response.json())
    .then(patientL => {
      modalBody.innerHTML = `
      <div id="Lab" class="tab-content">
        <p><strong>Patient ID:</strong> ${patientL.PatientID}</p>
        <p><strong>Test ID:</strong> ${patientL.TestID}</p>
        <p><strong>Test Name:</strong> ${patientL.TestName}</p>
        <p><strong>Cost:</strong> ${patientL.Cost}</p>
        <p><strong>Result:</strong> ${patientL.FieldResult}</p>
        <p><strong>Report Schedule:</strong> ${patientL.TestResultSchedule}</p>
        <p><strong>Collection Time:</strong> ${patientL.collection_time}</p>
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
    const patientId2 = event.target.dataset.patientId;
    fetchPatientLabProfile(patientId2);
  }
});