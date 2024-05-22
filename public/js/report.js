document.addEventListener('DOMContentLoaded', function() {
    const reportForm = document.getElementById('reportForm');

    if (reportForm) {
        reportForm.addEventListener('submit', function(event) {
            event.preventDefault();
            generateDoctorReport();
        });
    }
});

function generateDoctorReport() {
    const monthInput = document.getElementById('monthReport').value;
    const weekInput = document.getElementById('weekReport').value;

    if (!monthInput || !weekInput) {
        alert("Please select both month and week");
        return;
    }

    const [year, month] = monthInput.split('-');
    const weekOfMonth = parseInt(weekInput);

    fetch(`/api/reports/doctor?year=${year}&month=${month}&weekOfMonth=${weekOfMonth}`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('appointmentTable');
            // Clear existing rows
            table.innerHTML = `
                <tr class="pTHead">
                    <th>Day</th>
                    <th>Completed</th>
                    <th>Pending</th>
                    <th>Cancelled</th>
                </tr>
            `;
            // Populate table with data
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.Day}</td>
                    <td>${row.Completed}</td>
                    <td>${row.Pending}</td>
                    <td>${row.Cancelled}</td>
                `;
                table.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching report data:', error);
            alert('Failed to fetch report data');
        });
}

function report() {
    var module = document.getElementById('moduleReport1').value;

    if(module == "doctor"){
        var newTab = window.open('', '_blank');
        newTab.location.href = './doctorReport.html';    
    }
    else if(module == "patient"){
        var newTab = window.open('', '_blank');
        newTab.location.href = './patientReport.html';
    }
    else if(module == "emergency"){
        var newTab = window.open('', '_blank');
        newTab.location.href = './emergencyReport.html';
    }
    else if(module == "lab"){
        var newTab = window.open('', '_blank');
        newTab.location.href = './labReport.html';
    }
    else if(module == "pharmacy"){
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
