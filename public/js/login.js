// function logIn() {
//     window.location.href = "./dashboard.html";

// }
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
         window.location.href = '/dashboard.html'; // Example redirection
       
    } else {
        // Handle login error
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        document.querySelector('#errorModal .modal-body').textContent = result.error || 'Invalid email or password.';
        errorModal.show();
    }
}
