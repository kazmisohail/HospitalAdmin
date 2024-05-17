// function valueReturn() {
//     module = document.getElementById('monthReport').value
//     document.getElementById('moduleName').innerHTML = module
//     return module
// }

// module = document.getElementById('monthReport').value

function report() {
    var newTab = window.open('', '_blank');
    newTab.location.href = './report.html';
}

function generateReport() {
    module = document.getElementById('moduleReport').value
    document.getElementById('moduleName').innerHTML = module.toUpperCase()

    month = document.getElementById('monthReport').value
    document.getElementById('monthName').innerHTML = month

    // Create a new Date object
    var currentDate = new Date();

    // Get the current date
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Months are zero-based, so January is 0
    var year = currentDate.getFullYear();

    // Get the current time
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    // Format the date and time
    var formattedDate = `${year}-${month}-${day}`;
    var formattedTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById('date').innerHTML = formattedDate + " | " + formattedTime

    document.getElementById('adminName').innerHTML = "Sohail"
}