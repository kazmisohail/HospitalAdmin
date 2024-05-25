// Function to handle login
async function logIn() {
    const email = document.getElementById('uname').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
        // Handle successful login
        alert('Login successful');
        // Redirect or perform other actions
        window.location.href = './dashboard.html'; // Example redirection
    } else {
        // Handle login error
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        document.querySelector('#errorModal .modal-body').textContent = result.error || 'Invalid email or password.';
        errorModal.show();
    }
}

// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Function to handle forgot password
function forgotPassword() {
    // You can display a dialog box or redirect to a new page for forgot password functionality
    // For example, redirecting to a new HTML page where the user can enter their email
    window.location.href = './forgot_password.html';
}
