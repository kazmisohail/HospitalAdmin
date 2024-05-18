const express = require("express");
const sql = require("mssql");

const app = express();
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// SQL Server configuration
var config = {
    user: "sa",
    password: "1234",
    server: "Arham_laptop",
   // server: "DESKTOP-TONH6GQ",
    database: "HospitalManagementSystem",
    options: {
        encrypt: false // Disable encryption
    }
};

// Connect to SQL Server
sql.connect(config, err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connection Successful!");
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
app.get('/api/doctors/status', async (req, res) => {
    try {
        const permanent = await sql.query('SELECT COUNT(*) AS total FROM Employees WHERE   Status = \'Permanent\' AND DeptID = 1');
        const visiting = await sql.query('SELECT COUNT(*) AS total FROM Employees WHERE   Status = \'Visiting\' AND DeptID = 1');
        const onDuty = await sql.query('SELECT COUNT(*) AS total FROM Employees WHERE  Status = \'On Duty\' AND DeptID = 1');

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
// Define route for fetching total number of appointments
app.get('/api/appointments/total', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT COUNT(appointmentid) AS totalAppointments FROM Appointment");
        res.json({ totalAppointments: result.recordset[0].totalAppointments });
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
});

// Define route for fetching total doctors
app.get("/api/doctors/total", async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT COUNT(EmpName) AS totalDoctors FROM employee");
        res.json({ totalDoctors: result.recordset[0].totalDoctors });
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
