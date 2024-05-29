const apiUrl = 'http://localhost:3001/api/inventories';

// Function to fetch inventories data and populate table
function fetchInventoriesData() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('inventoryTableBody');
      tableBody.innerHTML = '';

      data.forEach(inventories => {
        const row = `
          <tr>
            <td>${inventories.MedicineID}</td>
            <td>${inventories.MedicineName}</td>
            <td>${inventories.Category}</td>
            <td>${inventories.Quantity}</td>
            <td>${inventories.PricePerUnit}</td>
            <td>
              <button class="btn btn-danger" type="button">Delete</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error(error));
}

// Call function to fetch data when page loads
document.addEventListener('DOMContentLoaded', fetchInventoriesData);


// Inventory Search

const apiUrlIs = 'http://localhost:3001/api/inSearch';

// Function to fetch pharmacists data and populate table
function searchInventories(name) {
    fetch(`${apiUrlIs}/${name}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('inventoryTableBody');
            tableBody.innerHTML = '';

            data.forEach(inventories => {
                const row = `
          <tr>
            <td>${inventories.MedicineID}</td>
            <td>${inventories.MedicineName}</td>
            <td>${inventories.Category}</td>
            <td>${inventories.Quantity}</td>
            <td>${inventories.PricePerUnit}</td>
            <td>
              <button class="btn btn-danger" type="button">Delete</button>
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
    if (event.target.classList.contains('srchI')) {
        const name = document.getElementById('searchIInput').value
        searchInventories(name);
    }
});
