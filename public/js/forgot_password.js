
document.addEventListener('DOMContentLoaded', function() {
    // Code to execute after the DOM has fully loaded
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    sendOtpBtn.addEventListener('click', sendOTP);
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
            } else {
                // Failed to send OTP
                console.error('Failed to send OTP');
            }
        } else {
            // Email does not exist in the database
            console.log('data.message'); 
        }
    } catch (error) {
        console.error('Error occurred: ', error);
    }
}
