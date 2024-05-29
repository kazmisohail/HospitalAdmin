const express = require("express");
const sql = require("mssql");
const nodemailer = require('nodemailer');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');


app.use(session({
    secret: 'your_secret_key_here', // This should be a long random string, used to sign the session ID cookie
    resave: false,
    saveUninitialized: true
}));
const PORT = process.env.PORT || 3001;

// SQL Server configuration
var config = {
    user: "sa",
    password: "1234",
    //server: "KAZMI",
    // server: "DESKTOP-TONH6GQ",

    server: "Arham_laptop",
    database: "HospitalManagementSystem", 

    // server: "Arham_laptop",
    database: "HospitalManagementSystem",

    options: {
        encrypt: false // Disable encryption
    }
};
sql.connect(config, err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connection Successful!");
});

// In app.js or wherever you define your API routes

app.post('/api/verifyEmail', async (req, res) => {
    const { email } = req.body;

    try {
        // Connect to the database
        await sql.connect(config);
        // Query to check if email exists
        const result = await sql.query`SELECT COUNT(*) AS count FROM admin WHERE email = ${email}`;
        // Check if email exists
        const exists = result.recordset[0].count > 0;
        res.json({ exists, requireOTP: exists }); // Return flag indicating whether OTP verification is required
    } catch (error) {
        console.error('Error verifying email:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        // Close database connection
        await sql.close();
    }
});

app.post('/api/verifyOTP', async (req, res) => {
    const { otp, email } = req.body;
    const storedOTP = req.session.otp; // Retrieve the stored OTP from the session

    if (otp === storedOTP) {
        // OTP matched successfully
        res.json({ success: true });
    } else {
        // OTP mismatch
        res.json({ success: false, error: 'Invalid OTP' });
    }
});

app.post('/api/sendOTP', async (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();

    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail', // Example: Gmail
            auth: {
                user: 'arhamraza947@gmail.com', // Your email address
                pass: 'hngwyqzhrpyoehph' // Your email password or app password if using Gmail
            }
        });

        let mailOptions = {
            from: 'arhamraza947@gmail.com',
            to: email,
            subject: 'Your OTP for password reset',
            text: `Your OTP for password reset is: ${otp}`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);

        // Store the OTP in the session
        req.session.otp = otp;

        res.json({ success: true });
    } catch (error) {
        console.error('Error occurred: ', error);
        res.status(500).json({ success: false, error: 'Failed to send OTP' });
    }
});


function generateOTP() {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

// Connect to SQL Server

app.put('/api/admins/password', async (req, res) => {
    const { email, password } = req.body;
    await sql.connect(config);
    try {
        await sql.query(`UPDATE Admin SET Password = '${password}' WHERE Email = '${email}'`);

        // Send a success response
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
// Define endpoint to fetch admin details
app.get('/api/admin/details', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'chaljaachaljaa');
    const email = decoded.email;
    try {
        // Connect to the database
        const pool = await sql.connect(config);
        // Query to fetch admin details based on email
        const result = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query('SELECT * FROM Admin WHERE Email = @Email');
        const adminDetails = result.recordset[0];
        // Check if admin details are found
        if (result.recordset.length > 0) {
            // const adminDetails = result.recordset[0];
            res.json({ success: true, adminDetails });

        } else {
            console.log("idhr masla hai")
            res.status(404).json({ success: false, message: 'idhr masla hai Admin details not found' });
            console.log(adminDetails)
        }
    } catch (error) {
        console.error('Error fetching admin details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        // Close database connection
        await sql.close();
    }
});

// Define route for fetching total number of patients
app.get('/api/patients/total', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT COUNT(patientname) AS totalPatients FROM Patient");
        res.json({ totalPatients: result.recordset[0].totalPatients });
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
});

//is function sey login horaha
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .input('Email', sql.NVarChar, email)
            .input('Password', sql.NVarChar, password)
            .query('SELECT * FROM Admin WHERE Email = @Email AND Password = @Password');

        if (result.recordset.length > 0) {
            const token = jwt.sign({ email }, 'chaljaachaljaa', { expiresIn: '1h' });
            res.json({ success: true, message: 'Login successful', token });
        } else {
            res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});
// app.post('/api/admins/create', async (req, res) => {
//     const { EmpName,Email, Password, Contact,Role,Permission } = req.body;

//     if (!EmpName  || !Email || !Password || !Contact||Role||Permission) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//         const pool = await sql.connect(dbConfig);
//         const result = await pool.request()
//             .input('EmpName', sql.NVarChar, EmpName)
//            // .input('DOB', sql.Date, DOB)
//             .input('Email', sql.NVarChar, Email)
//             .input('Password', sql.NVarChar, Password) // Make sure to hash the password in a real application
//             .input('Contact', sql.NVarChar, Contact)
//             .input('Role', sql.NVarChar, Role)
//             .input('Permission', sql.NVarChar, Permission)
//             await request.execute('InsertAdminDetails');
//         res.json({ message: 'Admin created successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Database error' });
//     }
// });

// Define route for fetching total doctors
app.get("/api/doctors/total", async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT COUNT(EmpName) AS totalDoctors FROM employee where deptid=1");
        res.json({ totalDoctors: result.recordset[0].totalDoctors });
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
});

// Define route for fetching total number of appointments
app.get('/api/appointments/total', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT COUNT(*) AS TodaysTotalAppointment FROM Appointment WHERE CAST([Date] AS DATE) = CAST(GETDATE() AS DATE);");
        res.json({ totalAppointments: result.recordset[0].TodaysTotalAppointment });
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/patients/status', async (req, res) => {
    try {
        const opd = await sql.query('select count(patientname) as total from dbo.opd_View');
        const admitted = await sql.query('SELECT COUNT(patientname) as total FROM dbo.admitted_view ');
        const today = await sql.query('SELECT COUNT(*) as total FROM dbo.todayspatients ');
        const emergency = await sql.query('SELECT COUNT(*) as total FROM dbo.Emergency_View; ');

        res.json({
            opd: opd.recordset[0].total,
            admitted: admitted.recordset[0].total,
            today: today.recordset[0].total,
            emergency: emergency.recordset[0].total
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/doctors/status', async (req, res) => {
    try {
        const permanent = await sql.query('SELECT COUNT(Empname) AS total FROM Employee WHERE Status = \'Permanent\' AND DeptID = 1');
        const visiting = await sql.query('SELECT COUNT(Empname) AS total FROM Employee WHERE Status = \'Visiting\' AND DeptID = 1');
        const onDuty = await sql.query('SELECT COUNT(DISTINCT DoctorID) AS total FROM DoctorShift WHERE CAST(GETDATE() AS TIME) BETWEEN CAST(StartTime AS TIME) AND CAST(EndTime AS TIME); ');

        res.json({
            permanent: permanent.recordset[0].total,
            visiting: visiting.recordset[0].total,
            onDuty: onDuty.recordset[0].total,
        });
    } catch (err) {
        console.error('Error fetching doctor status counts:', err);
        res.status(500).send('Server error');
    }
});

// Add endpoint for fetching doctor report data
app.get('/api/reports/doctor', async (req, res) => {
    const { year, month, weekOfMonth } = req.query;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Year', sql.Int, year)
            .input('Month', sql.Int, month)
            .input('WeekOfMonth', sql.Int, weekOfMonth)
            .execute('GetAppointmentStatusByWeekOfMonth');

        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching doctor report data:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/appointments/status', async (req, res) => {
    try {
        const completed = await sql.query('SELECT COUNT(*) AS CompletedAppointments FROM Appointment WHERE CAST([Date] AS DATE) = CAST(GETDATE() AS DATE) AND Status = \'Completed\';');
        const pending = await sql.query('SELECT COUNT(*) AS PendingAppointments FROM Appointment WHERE CAST([Date] AS DATE) = CAST(GETDATE() AS DATE) AND Status = \'Pending\';');

        res.json({
            completed: completed.recordset[0].CompletedAppointments,
            pending: pending.recordset[0].PendingAppointments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Define route for fetching issues
app.get("/api/issues", async (req, res) => {
    try {
        const result = await sql.query("SELECT IssueID, DeptID, EmpID, CreationDate, Condition, Content FROM issue");
        res.json(result.recordset);
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
});

//Server End-point for assigning work to admin
const transporter = nodemailer.createTransport({
    service: 'gmail', // you can use any email service you prefer
    auth: {
        user: 'arhamraza947@gmail.com',
        pass: 'hngwyqzhrpyoehph'
    }
});

app.post('/api/assign-work', async (req, res) => {
    const { AdminID, ActionType, Description, Details } = req.body;
    try {
        // Save the work assignment to the database
        const query = "exec assignWork @AdminID, @ActionType, @Description, @Details;";
        const request = new sql.Request();
        request.input('AdminID', sql.NVarChar, AdminID);
        request.input('ActionType', sql.NVarChar, ActionType);
        request.input('Description', sql.NVarChar, Description);
        request.input('Details', sql.NVarChar, Details);
        await request.query(query);

        // Fetch the admin's email address
        const emailQuery = "SELECT Email FROM Admin WHERE AdminID = @AdminID";
        const emailRequest = new sql.Request();
        emailRequest.input('AdminID', sql.NVarChar, AdminID);
        const emailResult = await emailRequest.query(emailQuery);

        if (emailResult.recordset.length > 0) {
            const adminEmail = emailResult.recordset[0].Email;

            // Send the email with the work details
            const mailOptions = {
                from: 'arhamraza947@gmail.com',
                to: adminEmail,
                subject: 'New Work Assignment',
                text: `You have been assigned a new work:
Action Type: ${ActionType}
Description: ${Description}
Details: ${Details}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

        res.status(200).json({ message: "Work assigned and email sent successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.post('/api/add-admin', async (req, res) => {
    const { AdminName, Email, Password, Contact, Role, Permission } = req.body;
    try {

        const query = "EXEC InsertAdminDetails @AdminName, @Email, @Password, @Contact, @Role, @Permission;";

        const request = new sql.Request();
        request.input('AdminName', sql.NVarChar, AdminName);
        request.input('Email', sql.NVarChar, Email);
        request.input('Password', sql.NVarChar, Password);
        request.input('Contact', sql.NVarChar, Contact);
        request.input('Role', sql.NVarChar, Role);
        request.input('Permission', sql.NVarChar, Permission);

        await request.query(query);

        console.log("Admin Added Successfully");
    } catch (error) {
        console.log(error);
    }
});

// // Endpoint to get notifications
// app.get('/getNotifications/:adminID', (req, res) => {
//     const adminID = req.params.adminID;
//     const request = new sql.Request();
//     request.input('AdminID', sql.Int, adminID);
//     request.query('SELECT * FROM Control WHERE AdminID = @AdminID AND Details IS NULL', (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         } else {
//             res.json(result.recordset);
//         }
//     });
// });

//Start the server on port 3001



// Pharmacy
// Define API endpoint to fetch pharmacists data
app.get('/api/pharmacists', (req, res) => {
    const query = 'SELECT * FROM AllPharmacists';
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Define API endpoint to fetch pharmacist data by ID
app.get('/api/pharmacists/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM AllPharmacists WHERE EmpID = ${id}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset[0]); // Assuming only one pharmacist is returned
        }
    });
});


// Inventory
// Define API endpoint to fetch inventories data
app.get('/api/inventories', (req, res) => {
    const query = 'SELECT * FROM AllItems';
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Patient
// Define API endpoint to fetch patient data
app.get('/api/patientsTable', (req, res) => {
    const query = 'SELECT * FROM AllPatients';
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Define API endpoint to fetch patients general profile data by ID
app.get('/api/patientsTable/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM Patient WHERE PatientID = ${id}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset[0]); // Assuming only one pharmacist is returned
        }
    });
});

// Define API endpoint to fetch patients medical data by ID
app.get('/api/patientsTable1/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM GetPatientMedicalProfile(${id})`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset[0]); // Assuming only one pharmacist is returned
        }
    });
});

// Define API endpoint to fetch patients lab data by ID
app.get('/api/patientsTable2/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM GetPatientLabProfile(${id})`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset[0]); // Assuming only one pharmacist is returned
        }
    });
});


// Doctor
// Define API endpoint to fetch doctor data
app.get('/api/allDoctorsTable', (req, res) => {
    const query = 'SELECT * FROM AllDoctors';
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Define API endpoint to fetch doctor data
app.get('/api/topDoctorsTable', (req, res) => {
    const query = 'SELECT * FROM PopularDoctors';
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Define API endpoint to fetch doctor general profile data by ID
app.get('/api/allDoctorsTable/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM AllDoctors WHERE DoctorID = ${id}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset[0]); // Assuming only one pharmacist is returned
        }
    });
});

// Define API endpoint to fetch doctors special data by ID
app.get('/api/allDoctorsTable1/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM GetDoctorSpecificProfile(${id})`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset[0]); // Assuming only one pharmacist is returned
        }
    });
});


// Appointment
// Define API endpoint to fetch pending data
app.get('/api/pendingApp', (req, res) => {
    const query = 'SELECT * FROM PendingAppointments';
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Define API endpoint to fetch completed data
app.get('/api/completedApp', (req, res) => {
    const query = 'SELECT * FROM CompletedAppointments';
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Define API endpoint to fetch today's data
app.get('/api/todaysApp', (req, res) => {
    const query = 'SELECT * FROM TodaysAppointments';
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});


// ------------ REPORT ---------------
// Pharmacy 1
app.get('/api/pharmacyRevenue/:year/:month/:week', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const week = req.params.week;

    const query = `EXEC CalculatePharmacyRevenueByWeekOfMonth ${year}, ${month}, ${week}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Pharmacy 2
app.get('/api/pharmacyMedicine/:year/:month/:week', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const week = req.params.week;

    const query = `EXEC CalculateTopMedicinesByWeekOfMonth ${year}, ${month}, ${week}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});


// Appointment 1
app.get('/api/appReport1/:year/:month', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;

    const query = `EXEC CountAppointmentsByWeek ${month}, ${year}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Appointment 2
app.get('/api/appReport2/:year/:month/:week', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const week = req.params.week;

    const query = `EXEC GetAppointmentStatusByWeekOfMonth ${year}, ${month}, ${week}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Lab 1
app.get('/api/labReport1/:year/:month/:week', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const week = req.params.week;

    const query = `EXEC CalculateLabRevenueByWeekOfMonth ${year}, ${month}, ${week}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Lab 2
app.get('/api/labReport2/:year/:month/:week', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const week = req.params.week;

    const query = `EXEC CountTestsConductedByDaysOfWeek ${year}, ${month}, ${week}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Em 1
app.get('/api/emReport1/:year/:month/:week', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const week = req.params.week;

    const query = `EXEC GetEmergencyCallsByWeekOfMonth ${year}, ${month}, ${week}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Em 2
app.get('/api/emReport2/:year/:month', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;

    const query = `EXEC CalculateLifeToDeathCountsByMonth ${month}, ${year}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Pat 1
app.get('/api/patReport1/:year/:month/:week', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const week = req.params.week;

    const query = `EXEC GetPatientsStatusByWeekOfMonth ${year}, ${month}, ${week}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Pat 2
app.get('/api/patReport2/:year/:month', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;

    const query = `EXEC GetTopDiagnosesByMonth ${month}, ${year}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Doc 1
app.get('/api/docReport1/:year/:month', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;

    const query = `EXEC GetPatientsTreatedByDoctor ${month}, ${year}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});

// Doc 2
app.get('/api/docReport2/:year/:month', (req, res) => {
    const year = req.params.year;
    const month = req.params.month;

    const query = `EXEC CalculateMonthlyDoctorDeptRevenueByWeek ${month}, ${year}`;
    sql.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(result.recordset);
        }
    });
});