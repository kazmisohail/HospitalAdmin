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

// For all pages
function home() {
    window.location.href = './dashboard.html';
}
function doctors() {
    window.location.href = './doctors.html';
}

function patients() {
    window.location.href = './patients.html';
}

function pharmacy() {
    window.location.href = './pharmacy.html';
}

function appointment() {
    window.location.href = './appointment.html';
}
// !!!

function toggleMenu() {
    var menu = document.getElementById("side-menu");
    menu.classList.toggle("open");

    if (menu.classList.contains('open')) {
        console.log("menu state changed to 1")
        menuState = "1";
    } else {
        console.log("menu state changed to 0")
        menuState = "0";
    }

    localStorage.setItem('menuState', menuState);
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
    document.getElementById('time').textContent = timeString;
}

function openPanel() {
    var notificationPanel = document.querySelector(".notification-panel");
    notificationPanel.style.display = "block";
}

function togglePanel() {
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

function toggleTheme() {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const currentHref = themeStylesheet.getAttribute('href');

    if (currentHref.includes('light-mode')) {
        themeStylesheet.setAttribute('href', '../css/dark-mode.css?v=' + new Date().getTime());
        viewMode="1";
        console.log("dark-mode status changed: onn")
    } else {
        themeStylesheet.setAttribute('href', '../css/light-mode.css?v=' + new Date().getTime());
        console.log("dark-mode status changed: off")
        viewMode="0";
    }

    localStorage.setItem('viewMode', viewMode);
}

//functions that are statics




document.addEventListener('DOMContentLoaded', function () {
    console.log("Page Opened");
    setInterval(updateTime, 1000);
    updateTime();

    var menu = document.getElementById("side-menu")
    const themeStylesheet = document.getElementById('themeStylesheet');

    if (menuState === "1") {
        console.log("menustate is 1")
        menu.classList.add("open");
    }

    else{
        console.log("menustate is 0")
    }

    if (viewMode === "1") {
        console.log("dark mode status : onn")
        themeStylesheet.setAttribute('href', '../css/dark-mode.css?v=' + new Date().getTime());
    }

    else{
        console.log("dark mode status: off")
    }

});

