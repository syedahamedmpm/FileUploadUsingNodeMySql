var mysql = require('mysql')
const express = require('express')
const multer  = require('multer')
const cors = require('cors')

const app = express()
const port = 3008

var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'fileupload'
})
connection.connect(function(err) {
  if (err) throw err;
  console.log("Database is connected successfully!");
  //To Create Table//
  // var sql = "CREATE TABLE files (name VARCHAR(255))";
  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
});

app.use(express.json())

// enable CORS
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!')
})



//Handling Upload
app.post('/upload',(req,res)=>{
  console.log(req.);
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})