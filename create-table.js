const connStr = "Server=XXX;Database=XXX;User Id=XXX;Password=XXX;encrypt=true";
  

const sql = require("mssql");


sql.connect(connStr)
   .then(conn => console.log("conectou!"))
   .catch(err => console.log("erro! " + err));