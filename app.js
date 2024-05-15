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

// Start the server on port 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
