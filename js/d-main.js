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

// Open default tab on page load
document.getElementById("defaultOpen").click();

function home() {
    window.location.href = 'index.html';
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

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateString = `${day}-${month}-${year}`;
    document.getElementById('date').textContent = dateString;
}

function togglePanel() {
    var panel = document.getElementById("notification-panel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
}

function closePanel() {
    var panel = document.getElementById("notification-panel");
    panel.style.display = "none";
}

function markAsRead(button) {
    var notificationItem = button.closest('.notification-item');
    notificationItem.classList.add('read');
}

function deleteNotification(button) {
    var notificationItem = button.closest('.notification-item');
    notificationItem.remove();
}



