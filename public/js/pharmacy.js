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
document.addEventListener('DOMContentLoaded', fetchPharmacistsData);
