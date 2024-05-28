let menuState = localStorage.getItem('menuState') || "0";
let viewMode = localStorage.getItem('viewMode') || "0";

// Function to open a specific tab
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}



function toggleMenu() {
    var menuFrame = document.getElementById("side-menu");
    if (menuFrame.style.width === "0px" || menuFrame.style.width === "") {
        menuFrame.style.width = "16%";
        localStorage.setItem('menuState', 'open'); // Store menu state
        console.log("Menu status changed: onn");
    } else {
        menuFrame.style.width = "0px";
        localStorage.setItem('menuState', 'closed'); // Store menu state
        console.log("Menu status changed: off");
    }
}

function addTask() {
    var table = document.getElementById("todo").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);

    cell1.contentEditable = "true";
    cell1.focus();
    cell2.contentEditable = "true";
}

function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    const timeString = `${hours}:${minutes} ${amPm}`;

    const timeElement = document.getElementById('time');
    timeElement.textContent = timeString;

}

function toggleNotificationPanel() {
    const bellIcon = document.getElementById('bell-icon');
    var panel = document.getElementById("notification-panel");

    if (panel.classList.contains('show')) {
        panel.classList.remove('show');
    } else {
        const bellIconRect = bellIcon.getBoundingClientRect();

        panel.style.top = bellIconRect.bottom + 'px';
        panel.style.right = (window.innerWidth - bellIconRect.right) + 'px';
        panel.classList.add('show');
    }
}

function markAsRead(button) {
    var notificationItem = $(button).closest('.notification-item');
    notificationItem.addClass('read');
}

function deleteNotification(button) {
    var notificationItem = $(button).closest('.notification-item');
    notificationItem.remove(); // Remove the notification item

    // Check if there are any remaining notifications
    var remainingNotifications = $('.notification-item');
    if (remainingNotifications.length === 0) {
        closePanel(); // If no notifications left, close the panel
    }
}

// Function to handle profile display
function toggleAdminProfile() {
    var adminProfile = document.getElementById("admin-profile");
    if (adminProfile.style.display === "none") {
        adminProfile.style.display = "block";

        // Fetch admin details using JWT token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            return;
        }

        fetch('/api/admin/details', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    const adminDetails = data.adminDetails;
                    console.log(adminDetails)
                    // Display admin details
                    document.getElementById("admin-name").innerText = adminDetails.AdminName;
                    document.getElementById("admin-email").innerText = adminDetails.Email;
                    document.getElementById("admin-id").innerText = adminDetails.AdminID;
                    document.getElementById("admin-contact").innerText = adminDetails.Contact;
                } else {
                    console.error('Error:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching admin details:', error);
            });
    } else {
        adminProfile.style.display = "none";
    }
}



    


function toggleTheme() {

    const parentDocument = window.parent.document;
    const themeStylesheet = parentDocument.getElementById('themeStylesheet');

    const currentHref = themeStylesheet.getAttribute('href');

    if (currentHref.includes('light-mode')) {
        themeStylesheet.setAttribute('href', '../css/dark-mode.css?v=' + new Date().getTime());
        viewMode = "1";

        console.log("dark-mode status changed: onn")
    } else {
        themeStylesheet.setAttribute('href', '../css/light-mode.css?v=' + new Date().getTime());
        viewMode = "0";

        console.log("dark-mode status changed: off")
    }

    localStorage.setItem('viewMode', viewMode);

}

function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    const overlay = document.getElementById('overlay');
    const overlay2 = document.getElementById('overlay2');

    if (panel.classList.contains('show')) {
        panel.classList.remove('show');
        overlay.style.display = 'none';
        overlay2.style.display = 'none';
    } else {
        panel.classList.add('show')
        overlay.style.display = 'block';
        overlay.addEventListener('click', closeAllPanels, { once: true });
    }
}

function toggleLayer2Panel(panelId) {
    const panel = document.getElementById(panelId);
    const overlay = document.getElementById('overlay2');

    if (panel.classList.toggle('show')) {
        overlay.style.display = 'block';
        overlay.addEventListener('click', closeAllPanels, { once: true });
    } else {
        overlay.style.display = 'none';
    }
}

function closeAllPanels() {
    const overlay = document.getElementById('overlay');
    const overlay2 = document.getElementById('overlay2');
    const panels = document.querySelectorAll('.assign-work ,.remarks-panel ,.reportModal, .add-doctor, .del-admin ,.add-admin, .control-panel.show, .ex-panel.show');

    panels.forEach(panel => {
        panel.classList.remove('show');
    });

    overlay.style.display = 'none';
    overlay2.style.display = 'none';
}
function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    const overlay = document.getElementById('overlay');

    if (panel.classList.contains('show')) {
        panel.classList.remove('show');
        overlay.style.display = 'none';
    } else {
        panel.classList.add('show');
        overlay.style.display = 'block';
        overlay.addEventListener('click', closeAllPanels, { once: true });

        // Fetch the relevant data for the panel if it's being opened
        if (panelId === 'DoctorStatusPanel') {
            fetchDoctorStatus();
        }
        else if (panelId == 'patientStatusPanel') {
            fetchPatientStatus();
        }
        else if (panelId == 'toggleAppointmentPanel') {
            fetchAppointmentStatus();
        }
    }
}
async function fetchPatientStatus() {
    try {
        const response = await fetch('/api/patients/status');
        const data = await response.json();
        $(".panel-item.opd p").text(data.opd);
        $(".panel-item.admitted p").text(data.admitted);
        $(".panel-item.today p").text(data.today);
        $(".panel-item.emergency p").text(data.emergency);

        //document.querySelector('.panel-item.onduty p').textContent = data.onDuty;
    } catch (error) {
        console.error('Error fetching doctor status:', error);
    }
}
async function fetchAppointmentStatus() {
    try {
        const response = await fetch('/api/appointments/status');
        const data = await response.json();
        $(".panel-item.completed p").text(data.completed);
        $(".panel-item.pending p").text(data.pending);
    } catch (error) {
        console.error('Error fetching doctor status:', error);
    }
}
async function fetchDoctorStatus() {
    try {
        const response = await fetch('/api/doctors/status');
        const data = await response.json();
        $(".panel-item.permanent p").text(data.permanent);
        $(".panel-item.visiting p").text(data.visiting);
        $(".panel-item.onduty p").text(data.onDuty);
        //document.querySelector('.panel-item.onduty p').textContent = data.onDuty;
    } catch (error) {
        console.error('Error fetching doctor status:', error);
    }
}

window.onload = function () {
    console.log("Page Khul Gaya");
    // $.get('/api/admin/details', {
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         if (data.success) {
    //             const assignWorkItem = document.querySelector('.control-panel-item.item-1');
    //             const adminDetails = data.adminDetails;
    //             if(adminDetails.Permission !='All Access')
    //                 assignWorkItem.removeEventListener('click', toggleLayer2Panel);
    //             // Add a class to visually indicate that the functionality is disabled (optional)
    //             assignWorkItem.classList.add('disabled');
    //         } else {
    //             console.error('Error:', data.message);
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error fetching admin details:', error);
    //     });
 
    // Fetch total number of doctors
    $.get("/api/doctors/total", function (data) {
        console.log("Total Doctors Data:", data);
        $(".card-description.doctor").text(data.totalDoctors);
    }).fail(function (err) {
        console.error("Error fetching total doctors:", err);
    });

    // Fetch total number of patients
    $.get("/api/patients/total", function (data) {
        console.log("Total Patients Data:", data);
        $(".card-description.patient").text(data.totalPatients);
    }).fail(function (err) {
        console.error("Error fetching total patients:", err);
    });

    // Fetch total number of appointments
    $.get("/api/appointments/total", function (data) {
        console.log("Total Appointments Data:", data);
        $(".card-description.appointment").text(data.totalAppointments);
    }).fail(function (err) {
        console.error("Error fetching total appointments:", err);
    });

    // Fetch issues and populate the table
    $.get("/api/issues", function (data) {
        console.log("Issues Data:", data);
        var tbody = $(".table1 tbody");
        tbody.empty(); // Clear existing rows

        data.forEach(function (issue) {
            var row = `<tr>
                <td>${issue.IssueID}</td>
                <td>${issue.DeptID}</td>
                <td>${issue.EmpID}</td>
                <td>${issue.CreationDate}</td>
                <td>${issue.Condition}</td>
                <td>${issue.Content}</td>
                <td><button class="btn btn-primary submit-btn" type="button" onclick="togglePanel('resolve-panel')">Submit</button></td>
            </tr>`;
            tbody.append(row);
        });
    }).fail(function (err) {
        console.error("Error fetching issues:", err);
    });

    /* const adminID = 7; // Example admin ID
    $.get(`http://localhost:3002/getNotifications/${adminID}`, function (notifications) {
        const notificationContent = $('.notification-content');



        notificationContent.empty(); // Clear existing content

        if (notifications.length === 0) {
            $('#no-notification-msg').css('display', 'block');
        } else {
            $('#no-notification-msg').css('display', 'none');
            notifications.forEach(notification => {
                const notificationItem = $('<div class="notification-item"></div>');
                notificationItem.html(`
                    <p>${notification.Description}</p>
                    <div class="notification-functions">
                        <button class="read-btn" onclick="markAsRead(${notificationItem})"><img src="../images/read.png" alt=""></button>
                        <button class="delete-btn" onclick="deleteNotification(${notificationItem})"><img src="../images/delete.png" alt=""></button>
                        <div class="notification-time">${new Date(notification.Timestamp).toLocaleString()}</div>
                    </div>
                `);
                notificationContent.append(notificationItem);
            });
        }
    }).fail(function (error) {
        console.error('Error fetching notifications:', error);
    });
 */

    // client-side code for assigning work to an admin
    document.getElementById('assignWorkForm').addEventListener('submit', async function () {

        const adminID = document.getElementById('AdminID').value;
        const actionType = document.getElementById('ActionType').value;
        const description = document.getElementById('Description').value;
        const details = document.getElementById('Details').value;
        const data = {
            AdminID: adminID,
            ActionType: actionType,
            Description: description,
            Details: details
        };

        try {
            const response = await fetch('/api/assign-work', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Work assigned successfully:', result);

        } catch (error) {
            console.error('Error assigning work:', error);
        }
    });

    document.getElementById('adminForm').addEventListener('submit', async function (event) {
    
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const contact = document.getElementById('number').value;
        const role = document.getElementById('role').value;
        const permission = document.getElementById('permission').value;
    
        const data = {
            AdminName: name,
            Email: email,
            Password: password,
            Contact: contact,
            Role: role,
            Permission: permission
        };
    
        try {
            const response = await fetch('/api/add-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Admin details inserted successfully:', result);
    
        } catch (error) {
            console.error('Error inserting admin details:', error);
        }
    });
    

};

/* async function assignWork() {
    preventDefault();
    
    const adminID = document.getElementById('AdminID').value;
    const actionType = document.getElementById('ActionType').value;
    const description = document.getElementById('Description').value;

    const data = {
        AdminID: adminID,
        ActionType: actionType,
        Description: description
    };

    try {
        const response = await fetch('/api/assign-work', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Work assigned successfully:', result);

        // Optionally, refresh the table or provide user feedback
        // You can call a function to refresh your data table here
    } catch (error) {
        console.error('Error assigning work:', error);
    }
} */

function inventory() {
    parent.window.location.href = './inventory.html';
}

function pharmacy() {
    parent.window.location.href = './pharmacy.html';
}