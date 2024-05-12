const express = require('express')
const cookieParser = require('cookie-parser');
const sql = require('mssql/msnodesqlv8');


// port connection
const app = express();
const PORT = process.env.PORT || 3000;

// middleware static website
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// run server and port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// db connection
// var config = {
//     server: "KAZMI",
//     database: "HospitalManagementSystem",
//     driver: "msnodesqlv8",
//     options: {
//         trustedConnection: true
//     }
// }

// sql.connect(config, function(err) {
//     if (err)
//         console.log("DB ERROR", err)
//     else
//         console.log("Connected")
//     var request = new sql.Request();
//     request.query("select * from Admin", function(err, records){
//         if(err)
//             console.log("Query ERROR", err)
//         else
//             console.log(records)
//     })
// })