  // Function to load settings modal content
  function loadSettingsModal() {
    // Load modal content from external file into the parent document
    parent.$("#modalContainer").load("settings-modal.html", function () {
        // After content is loaded, show the modal
        parent.$("#settingModal").modal("show");
    });
}

// For all pages
function home() {
    parent.window.location.href = './dashboard.html';
}
function doctors() {
    parent.window.location.href = './doctors.html';
}

function patients() {
    parent.window.location.href = './patients.html';
}

function pharmacy() {
    parent.window.location.href = './pharmacy.html';
}

function appointment() {
    parent.window.location.href = './appointment.html';
}
// !!!

function storeImageSourceToLocal() {

    var imageElement = document.getElementById('display-picture');
    var autoChangeDpElement = parent.document.getElementById('auto-change-dp');

    if (imageElement) {
        var imageSource = imageElement.getAttribute('src');
        localStorage.setItem('imageSource', imageSource);
        autoChangeDpElement.setAttribute('src', imageSource);
    }
}

function checkActive() {
    document.querySelectorAll(".menu-btn").forEach(function (btn) {
        btn.classList.remove("active");
    });

    var parentSrc = parent.window.location.href;

    if (parentSrc.includes("dashboard.html")) {
        document.querySelector(".menu-btn[data-function='home']").classList.add("active");
    } else if (parentSrc.includes("doctors.html")) {
        document.querySelector(".menu-btn[data-function='doctors']").classList.add("active");
    } else if (parentSrc.includes("patients.html")) {
        document.querySelector(".menu-btn[data-function='patients']").classList.add("active");
    } else if (parentSrc.includes("pharmacy.html")) {
        document.querySelector(".menu-btn[data-function='pharmacy']").classList.add("active");
    } else if (parentSrc.includes("appointment.html")) {
        document.querySelector(".menu-btn[data-function='appointment']").classList.add("active");
    }

}

let isChecked = localStorage.getItem('isChecked') === 'false';
const themeBtn = document.getElementById('flexSwitchCheckDefault');

function updateIsChecked() {
    localStorage.setItem('isChecked', themeBtn.checked);
    console.log('check status: ' + themeBtn.checked)
}

themeBtn.addEventListener('change', updateIsChecked);

window.onload = function () {
    storeImageSourceToLocal();
    checkActive();

    const checkState = localStorage.getItem('isChecked')
    themeBtn.checked = checkState === 'true';
    console.log(themeBtn.checked);
};