document.addEventListener('DOMContentLoaded', function() {
    // Code to execute after the DOM has fully loaded
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    sendOtpBtn.addEventListener('click', sendOTP);

    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    verifyOtpBtn.addEventListener('click', verifyOTP);
});

async function sendOTP() {
    console.log('sendOTP function called');
    const email = document.getElementById('email').value; // Get user's email
    console.log('Email:', email);
   
    try {
        const response = await fetch('/api/verifyEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (data.exists) {
            // Email exists in the database, proceed to send OTP
            const otpResponse = await fetch('/api/sendOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const otpData = await otpResponse.json();
            if (otpData.success) {
                // OTP sent successfully
                console.log('OTP sent successfully');
                // Show OTP input section
                document.getElementById('otpSection').style.display = 'block';
            } else {
                // Failed to send OTP
                console.error('Failed to send OTP');
                displayErrorMessage('Failed to send OTP. Please try again.');
            }
        } else {
            // Email does not exist in the database
            console.log('Email does not exist in the database'); 
            displayErrorMessage('Email does not exist in the database.');
        }
    } catch (error) {
        console.error('Error occurred: ', error);
        displayErrorMessage('An error occurred. Please try again later.');
    }
}

async function verifyOTP() {
    console.log('verifyOTP function called');
    const otp = document.getElementById('otp').value; // Get entered OTP
    console.log('OTP:', otp);

    try {
        const email = document.getElementById('email').value;
        const response = await fetch('/api/verifyOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, otp })
        });
        const data = await response.json();
        if (data.success) {
            // OTP verification successful, show password reset section
            document.getElementById('passwordResetSection').style.display = 'block';
        } else {
            // OTP verification failed, display error message
            displayErrorMessage('Invalid OTP. Please try again.');
        }
    } catch (error) {
        console.error('Error occurred: ', error);
        displayErrorMessage('An error occurred. Please try again later.');
    }
}

function displayErrorMessage(message) {
    // Display error message in a modal
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    const modalBody = document.querySelector('#errorModal .modal-body');
    modalBody.textContent = message;
    errorModal.show();
}
