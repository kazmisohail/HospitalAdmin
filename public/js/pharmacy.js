const apiUrl = 'http://localhost:3001/api/pharmacists';

// Function to fetch pharmacists data and populate table
function fetchPharmacistsData() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('pharmacyTableBody');
      tableBody.innerHTML = '';

      data.forEach(pharmacist => {
        const row = `
          <tr>
            <td>${pharmacist.EmpID}</td>
            <td>${pharmacist.EmpName}</td>
            <td>${pharmacist.Email}</td>
            <td>${pharmacist.Contact}</td>
            <td>${pharmacist.Salary}</td>
            <td>
            <button class="btn btn-info profile-button" type="button"
                data-bs-toggle="modal" data-bs-target="#pharmacyProfileModal"
                data-pharmacist-id="${pharmacist.EmpID}">Profile</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error(error));
}

// Call function to fetch data when page loads
document.addEventListener('DOMContentLoaded', fetchPharmacistsData);


// Function to fetch and display pharmacist profile in modal
function fetchPharmacistProfile(id) {
  const profileModal = document.getElementById('pharmacyProfileModal');
  const modalBody = profileModal.querySelector('.modal-body');

  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(pharmacist => {
      modalBody.innerHTML = `
                <p><strong>Emp ID: </strong>${pharmacist.EmpID}</p>
                <p><strong>Name: </strong>${pharmacist.EmpName}</p>
                <p><strong>DOB: </strong>${pharmacist.DOB}</p>
                <p><strong>Contact: </strong>${pharmacist.Contact}</p>
                <p><strong>Email: </strong>${pharmacist.Email}</p>
                <p><strong>DOJ: </strong>${pharmacist.DOJ}</p>
                <p><strong>Salary: </strong>${pharmacist.Salary}</p>
                <p><strong>Experience Level: </strong>${pharmacist.ExperienceLevel}</p>
                <hr>
                <form action="">
                      <h3>Update Details</h3>
                      <input type="tel" class="form-control" placeholder="Enter New Contact" required="false">
                      <input type="text" class="form-control" placeholder="Enter New Salary" required="false">
                      <input type="text" class="form-control" placeholder="Enter New Experience" required="false">
                </form>
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
    const pharmacistId = event.target.dataset.pharmacistId;
    fetchPharmacistProfile(pharmacistId);
  }
});


// Pharmacy Search

const apiUrlPs = 'http://localhost:3001/api/phSearch';

// Function to fetch pharmacists data and populate table
function searchPharmacists(name) {
    fetch(`${apiUrlPs}/${name}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('pharmacyTableBody');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.EmpID}</td>
            <td>${pharmacist.EmpName}</td>
            <td>${pharmacist.Email}</td>
            <td>${pharmacist.Contact}</td>
            <td>${pharmacist.Salary}</td>
            <td>
            <button class="btn btn-info profile-button" type="button"
                data-bs-toggle="modal" data-bs-target="#pharmacyProfileModal"
                data-pharmacist-id="${pharmacist.EmpID}">Profile</button>
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
    if (event.target.classList.contains('srch')) {
        const name = document.getElementById('searchInput').value
        searchPharmacists(name);
    }
});
