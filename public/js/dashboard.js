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
    var panel = document.getElementById("notification-panel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
}

function closePanel() {
    var notificationPanel = document.getElementById("notification-panel");
    var notificationContent = document.querySelector(".notification-content");
    var noNotificationMsg = document.getElementById("no-notification-msg");

    var notificationItems = document.querySelectorAll(".notification-item");
    if (notificationItems.length === 0) {
        // If no notifications, display message and close panel
        noNotificationMsg.style.display = "block";
        notificationPanel.style.display = "none";
    } else {
        // If notifications exist, simply close the panel
        notificationPanel.style.display = "none";
    }
}

function markAsRead(button) {
    var notificationItem = button.closest('.notification-item');
    notificationItem.classList.add('read');
}

function deleteNotification(button) {
    var notificationItem = button.closest(".notification-item");
    notificationItem.remove(); // Remove the notification item

    // Check if there are any remaining notifications
    var remainingNotifications = document.querySelectorAll(".notification-item");
    if (remainingNotifications.length === 0) {
        closePanel(); // If no notifications left, close the panel
    }
}

function toggleAdminProfile() {
    var adminProfile = document.getElementById("admin-profile");
    if (adminProfile.style.display === "none") {
        adminProfile.style.display = "block";
    } else {
        adminProfile.style.display = "none";
    }
}

function toggleControlPanel() {
    var controlPanel = document.getElementById("control-panel");
    var overlay = document.getElementById("overlay");

    if (controlPanel.style.display === "none") {
        controlPanel.style.display = "block";
        overlay.style.display = "block";
        document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
        controlPanel.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scrolling
    }
}

function toggleResolvepanel() {
    var resolvePanel = document.getElementById("resolve-panel");
    var overlay = document.getElementById("overlay");

    if (resolvePanel.style.display === "none") {
        resolvePanel.style.display = "block";
        overlay.style.display = "block";
        document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
        resolvePanel.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scrolling
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

function closeRemarksPanel() {
    var remarksPanel = document.querySelector('.remarks-panel');
    var overlay = document.getElementById("overlay");

    if (remarksPanel.style.display === "none") {
        remarksPanel.style.display = "block";
        overlay.style.display = "block";
        document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
        remarksPanel.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scrolling
    }
}

function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    const overlay = document.getElementById('overlay');
    
    if (panel.classList.toggle('show')) {
        overlay.style.display = 'block';
        overlay.addEventListener('click', closeAllPanels, { once: true });
    } else {
        overlay.style.display = 'none';
    }
}

function closeAllPanels() {
    const overlay = document.getElementById('overlay');
    const panels = document.querySelectorAll('.control-panel.show, .ex-panel.show');
    
    panels.forEach(panel => {
        panel.classList.remove('show');
    });
    
    overlay.style.display = 'none';
}

window.onload = function () {
    console.log("Page Khul Gaya");

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
                <td><button class="btn btn-primary submit-btn" type="button" onclick="toggleResolvepanel()">Submit</button></td>
            </tr>`;
            tbody.append(row);
        });
    }).fail(function (err) {
        console.error("Error fetching issues:", err);
    });
};



function loadAddAdminModal() {
    // Load modal content from external file into the parent document
    parent.$("#addAdminContainer").load("addAdmin-modal.html", function () {
        // After content is loaded, show the modal
        parent.$("#addAdminModal").modal("show");
    });
}