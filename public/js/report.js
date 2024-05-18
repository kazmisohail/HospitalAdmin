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
    month = document.getElementById('monthReport').value

    if (month == "") {
        alert("Please select module and month")
    }
    else {
        if(module == "doctor") {
            document.getElementById('moduleName').innerHTML = module.toUpperCase()
            document.getElementById('monthName').innerHTML = month
            document.getElementById('bChart-msg').innerHTML = "Doctor Module Bar Chart, message will generate by using backend"
            document.getElementById('pChart-msg').innerHTML = "Patient Module Pie Chart, message will generate by using backend"
        }
        else if(module == "patient") {
            document.getElementById('moduleName').innerHTML = module.toUpperCase()
            document.getElementById('monthName').innerHTML = month
            document.getElementById('bChart-msg').innerHTML = "Patient Module Bar Chart, message will generate by using backend"
            document.getElementById('pChart-msg').innerHTML = "Patient Module Pie Chart, message will generate by using backend"
        }
        else if(module == "emergency") {
            document.getElementById('moduleName').innerHTML = module.toUpperCase()
            document.getElementById('monthName').innerHTML = month
            document.getElementById('bChart-msg').innerHTML = "Emergency Module Bar Chart, message will generate by using backend"
            document.getElementById('pChart-msg').innerHTML = "Emergency Module Pie Chart, message will generate by using backend"
        }
        else if(module == "pharmacy") {
            document.getElementById('moduleName').innerHTML = module.toUpperCase()
            document.getElementById('monthName').innerHTML = month
            document.getElementById('bChart-msg').innerHTML = "Pharmacy Module Bar Chart, message will generate by using backend"
            document.getElementById('pChart-msg').innerHTML = "Pharmacy Module Pie Chart, message will generate by using backend"
        }
        else if(module == "lab") {
            document.getElementById('moduleName').innerHTML = module.toUpperCase()
            document.getElementById('monthName').innerHTML = month
            document.getElementById('bChart-msg').innerHTML = "Lab Module Bar Chart, message will generate by using backend"
            document.getElementById('pChart-msg').innerHTML = "Lab Module Pie Chart, message will generate by using backend"
        }
        else {
            alert("Please select module")
        }
    }

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