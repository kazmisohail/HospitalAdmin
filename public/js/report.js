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
            document.getElementById('bChart-msg').innerHTML = "Doctor Module Bar Chart, message will generate by using backend"
            document.getElementById('pChart-msg').innerHTML = "Doctor Module Pie Chart, message will generate by using backend"
        }
        else if(module == "patient") {
            document.getElementById('moduleName').innerHTML = module.toUpperCase()
            document.getElementById('bChart-msg').innerHTML = "Patient Module Bar Chart, message will generate by using backend"
            document.getElementById('pChart-msg').innerHTML = "Patient Module Pie Chart, message will generate by using backend"
        }
        else if(module == "emergency") {
            document.getElementById('moduleName').innerHTML = module.toUpperCase()
            document.getElementById('bChart-msg').innerHTML = "Emergency Module Bar Chart, message will generate by using backend"
            document.getElementById('pChart-msg').innerHTML = "Emergency Module Pie Chart, message will generate by using backend"
        }
        else if(module == "pharmacy") {
            document.getElementById('moduleName').innerHTML = module.toUpperCase()
            document.getElementById('bChart-msg').innerHTML = "Pharmacy Module Bar Chart, message will generate by using backend"
            document.getElementById('pChart-msg').innerHTML = "Pharmacy Module Pie Chart, message will generate by using backend"
        }
        else if(module == "lab") {
            document.getElementById('moduleName').innerHTML = module.toUpperCase()
            document.getElementById('bChart-msg').innerHTML = "Lab Module Bar Chart, message will generate by using backend"
            document.getElementById('pChart-msg').innerHTML = "Lab Module Pie Chart, message will generate by using backend"
        }
        else {
            alert("Please select module")
        }
    }

}