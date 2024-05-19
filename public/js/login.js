function logIn() {
    window.location.href = "./dashboard.html";
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    const eyeIcon = document.getElementById('eye-icon');
    if (eyeIcon.classList.contains('fa-regular')) {
        eyeIcon.classList.remove('fa-regular');
        eyeIcon.classList.add('fa-solid');
    }

    else {
        eyeIcon.classList.add('fa-regular');
        eyeIcon.classList.remove('fa-solid');
    }
}
