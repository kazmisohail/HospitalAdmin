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
    server: "KAZMI",
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
        const result = await pool.request().query("SELECT COUNT(appointmentid) AS totalAppointments FROM Appointment");
        res.json({ totalAppointments: result.recordset[0].totalAppointments });
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/patients/status', async (req, res) => {
    try {
        const opd = await sql.query('select count(patientname) as total from dbo.opd_View');
        const admitted = await sql.query('SELECT COUNT(patientname) as total FROM dbo.admitted_view ');
        const today = await sql.query('SELECT COUNT(totalpatients) as total FROM dbo.todayspatients ');
        const emergency = await sql.query('SELECT COUNT(*) as emergency FROM Emergency_View; ');

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
        const onDuty = await sql.query('SELECT COUNT(Empname) AS total FROM Employee WHERE Status = \'OnDuty\' AND DeptID = 1');

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

app.get('/api/appointments/status', async (req, res) => {
    try {
        const completedResult = await sql.query('select count(*) from dbo.TodayscompletedAppointment');
        const pendingResult = await sql.query('select count(*) from dbo.TodayspendingAppointment');
        console.log("Completed Result:", completedResult);
        console.log("Pending Result:", pendingResult);
        const completedCount = parseInt(completedResult.recordset[0]['']);
        const pendingCount = parseInt(pendingResult.recordset[0]['']);

        res.json({
            completed: completedCount,
            pending: pendingCount
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
app.post('/api/assign-work', async (req, res) => {
    const { AdminID, ActionType, Description } = req.body;
    try {
        const query = "exec assignWork @AdminID, @ActionType, @Description;";

        const request = new sql.Request();
        request.input('AdminID', sql.NVarChar, AdminID);
        request.input('ActionType', sql.NVarChar, ActionType);
        request.input('Description', sql.NVarChar, Description);

        await request.query(query);

        console.log("Work Assigned Successfully");
    } catch (error) {
        console.log(error);
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
