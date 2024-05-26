function toggleSettings() {
    
    var adminProfile = document.getElementById("admin-profile");
    if (adminProfile.style.display === "none") {
        adminProfile.style.display = "block";

        // Fetch admin details using JWT token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            return;
        }

        fetch('/api/admin/details', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {console.log(data)
                    const adminDetails = data.adminDetails;
                    console.log(adminDetails)
                    // Display admin details
                    document.getElementById("admin-name").innerText = adminDetails.AdminName;
                    document.getElementById("admin-email").innerText = adminDetails.Email;
                    document.getElementById("admin-id").innerText = adminDetails.AdminID;
                    document.getElementById("admin-contact").innerText = adminDetails.Contact;
                } else {
                    console.error('Error:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching admin details:', error);
            });
    } else {
        adminProfile.style.display = "none";
    }
}