// document.addEventListener('DOMContentLoaded', function() {
//     const reportForm = document.getElementById('reportForm');

//     if (reportForm) {
//         reportForm.addEventListener('submit', function(event) {
//             event.preventDefault();
//             generateDoctorReport();
//         });
//     }
// });

// function generateDoctorReport() {
//     const monthInput = document.getElementById('monthReport').value;
//     const weekInput = document.getElementById('weekReport').value;

//     if (!monthInput || !weekInput) {
//         alert("Please select both month and week");
//         return;
//     }

//     const [year, month] = monthInput.split('-');
//     const weekOfMonth = parseInt(weekInput);

//     fetch(`/api/reports/doctor?year=${year}&month=${month}&weekOfMonth=${weekOfMonth}`)
//         .then(response => response.json())
//         .then(data => {
//             const table = document.getElementById('appointmentTable');
//             // Clear existing rows
//             table.innerHTML = `
//                 <tr class="pTHead">
//                     <th>Day</th>
//                     <th>Completed</th>
//                     <th>Pending</th>
//                     <th>Cancelled</th>
//                 </tr>
//             `;
//             // Populate table with data
//             data.forEach(row => {
//                 const tr = document.createElement('tr');
//                 tr.innerHTML = `
//                     <td>${row.Day}</td>
//                     <td>${row.Completed}</td>
//                     <td>${row.Pending}</td>
//                     <td>${row.Cancelled}</td>
//                 `;
//                 table.appendChild(tr);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching report data:', error);
//             alert('Failed to fetch report data');
//         });
// }

function report() {
    var module = document.getElementById('moduleReport1').value;

    if (module == "doctor") {
        var newTab = window.open('', '_blank');
        newTab.location.href = './doctorReport.html';
    }
    else if (module == "appointment") {
        var newTab = window.open('', '_blank');
        newTab.location.href = './appointmentReport.html';
    }
    else if (module == "patient") {
        var newTab = window.open('', '_blank');
        newTab.location.href = './patientReport.html';
    }
    else if (module == "emergency") {
        var newTab = window.open('', '_blank');
        newTab.location.href = './emergencyReport.html';
    }
    else if (module == "lab") {
        var newTab = window.open('', '_blank');
        newTab.location.href = './labReport.html';
    }
    else if (module == "pharmacy") {
        var newTab = window.open('', '_blank');
        newTab.location.href = './pharmacyReport.html';
    }
    else {
        alert("Please select module");
    }
}

function close() {
    parent.window.location.href = './dashboard.html';
}

// Pharmacy 1
const apiUrlPh1 = 'http://localhost:3001/api/pharmacyRevenue';

// Function to fetch pharmacists data and populate table
function fetchPharmacistsData(year,month, week) {
    fetch(`${apiUrlPh1}/${year}/${month}/${week}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('revenueTableBody');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.DayOfWeek}</td>
            <td>${pharmacist.PharmacyRevenue}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('phR1')) {
        const [year, month] = document.getElementById('monthReport').value.split('-')
        const week = document.getElementById('moduleReport').value
        fetchPharmacistsData(year,month, week);
    }
});

// Pharmacy 2
const apiUrlPh2 = 'http://localhost:3001/api/pharmacyMedicine';

// Function to fetch pharmacists data and populate table
function fetchPharmacistsData1(year,month, week) {
    fetch(`${apiUrlPh2}/${year}/${month}/${week}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('medicineTableBody');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.DayOfWeek}</td>
            <td>${pharmacist.MedicineName}</td>
            <td>${pharmacist.QuantitySold}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('phR2')) {
        const [year, month] = document.getElementById('btn1').value.split('-')
        const week = document.getElementById('btn2').value
        fetchPharmacistsData1(year,month, week);
    }
});


// Appointment 1
const apiUrlAp1 = 'http://localhost:3001/api/appReport1';

// Function to fetch pharmacists data and populate table
function fetchApp1(year,month) {
    fetch(`${apiUrlAp1}/${year}/${month}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('app1TableBody');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.WeekNumber}</td>
            <td>${pharmacist.AppointmentCount}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('genR1')) {
        const [year, month] = document.getElementById('btnR1').value.split('-')
        fetchApp1(year,month);
    }
});

// Appointment 2
const apiUrlAp2 = 'http://localhost:3001/api/appReport2';

// Function to fetch pharmacists data and populate table
function fetchApp2(year,month, week) {
    fetch(`${apiUrlAp2}/${year}/${month}/${week}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('app2TableBody');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.Day}</td>
            <td>${pharmacist.Completed}</td>
            <td>${pharmacist.Pending}</td>
            <td>${pharmacist.Cancelled}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('genR2')) {
        const [year, month] = document.getElementById('mR1').value.split('-')
        const week = document.getElementById('wR1').value
        fetchApp2(year,month, week);
    }
});


// Lab 1
const apiUrlL1 = 'http://localhost:3001/api/labReport1';

// Function to fetch pharmacists data and populate table
function fetchLab1(year,month, week) {
    fetch(`${apiUrlL1}/${year}/${month}/${week}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('lab1TableBody');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.DayOfWeek}</td>
            <td>${pharmacist.LabRevenue}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('labG1')) {
        const [year, month] = document.getElementById('LabM1').value.split('-')
        const week = document.getElementById('LabW1').value
        fetchLab1(year,month, week);
    }
});

// Lab 2
const apiUrlL2 = 'http://localhost:3001/api/labReport2';

// Function to fetch pharmacists data and populate table
function fetchLab2(year,month, week) {
    fetch(`${apiUrlL2}/${year}/${month}/${week}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('lab2TableBody');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.DayOfWeek}</td>
            <td>${pharmacist.TestsConducted}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('labG2')) {
        const [year, month] = document.getElementById('labM2').value.split('-')
        const week = document.getElementById('labW2').value
        fetchLab2(year,month, week);
    }
});


// Emergency 1
const apiUrlEm1 = 'http://localhost:3001/api/emReport1';

// Function to fetch pharmacists data and populate table
function fetchEm1(year,month, week) {
    fetch(`${apiUrlEm1}/${year}/${month}/${week}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('emTable1');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.DayOfWeek}</td>
            <td>${pharmacist.EmergencyCalls}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('emG1')) {
        const [year, month] = document.getElementById('emM1').value.split('-')
        const week = document.getElementById('emW1').value
        fetchEm1(year,month, week);
    }
});

// Emergency 2
const apiUrlEm2 = 'http://localhost:3001/api/emReport2';

// Function to fetch pharmacists data and populate table
function fetchEm2(year,month) {
    fetch(`${apiUrlEm2}/${year}/${month}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('emTable2');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.LifeCount}</td>
            <td>${pharmacist.DeathCount}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('emG2')) {
        const [year, month] = document.getElementById('emM2').value.split('-')
        fetchEm2(year,month);
    }
});


// Patient 1
const apiUrlP1 = 'http://localhost:3001/api/patReport1';

// Function to fetch pharmacists data and populate table
function fetchPatient1(year,month, week) {
    fetch(`${apiUrlP1}/${year}/${month}/${week}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('patTable1');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.DayOfWeek}</td>
            <td>${pharmacist.Visiting}</td>
            <td>${pharmacist.Admitted}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('patG1')) {
        const [year, month] = document.getElementById('patM1').value.split('-')
        const week = document.getElementById('patW1').value
        fetchPatient1(year,month, week);
    }
});

// Patient 2
const apiUrlP2 = 'http://localhost:3001/api/patReport2';

// Function to fetch pharmacists data and populate table
function fetchPatient2(year,month) {
    fetch(`${apiUrlP2}/${year}/${month}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('patTable2');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.DiagnosisName}</td>
            <td>${pharmacist.DiagnosisCount}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('patG2')) {
        const [year, month] = document.getElementById('patM2').value.split('-')
        fetchPatient2(year,month);
    }
});


// Doctor 1
const apiUrlD1 = 'http://localhost:3001/api/docReport1';

// Function to fetch pharmacists data and populate table
function fetchDoc1(year,month) {
    fetch(`${apiUrlD1}/${year}/${month}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('docTable1');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.VisitingPatients}</td>
            <td>${pharmacist.AdmittedPatients}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('docG1')) {
        const [year, month] = document.getElementById('docM1').value.split('-')
        fetchDoc1(year,month);
    }
});

// Doctor 2
const apiUrlD2 = 'http://localhost:3001/api/docReport2';

// Function to fetch pharmacists data and populate table
function fetchDoc2(year,month) {
    fetch(`${apiUrlD2}/${year}/${month}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('docTable2');
            tableBody.innerHTML = '';

            data.forEach(pharmacist => {
                const row = `
          <tr>
            <td>${pharmacist.WeekNumber}</td>
            <td>${pharmacist.Revenue}</td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error(error));


}

// Call function to fetch data on click
document.addEventListener('click', event => {
    if (event.target.classList.contains('docG2')) {
        const [year, month] = document.getElementById('docM2').value.split('-')
        fetchDoc2(year,month);
    }
});
