function report() {
    var module = document.getElementById('moduleReport1').value

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
        alert("Please select module")
    }


}

function close() {
    parent.window.location.href = './dashboard.html';
}

function generateReport() {
    module = document.getElementById('moduleReport').value
    month = document.getElementById('monthReport').value

    if (month == "") {
        alert("Please select month")
    }
    else {
        if(module == "doctor") {
        }
        else if(module == "patient") {
        }
        else if(module == "emergency") {
        }
        else if(module == "pharmacy") {
        }
        else if(module == "lab") {
        }
        else {
            alert("Please select week")
        }
    }

}