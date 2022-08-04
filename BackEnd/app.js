var mysql = require('mysql')
const express = require('express')
const multer  = require('multer')
const cors = require('cors')
var path = require('path');
var bodyParser = require('body-parser');

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
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// serving static files
app.use('/uploads', express.static('upload'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// handle storage using multer
var storage = multer.diskStorage({
  destination:function(req,file,cb){
    console.log(file);
    cb(null,'uploads')
  },
  filename:function(req,file,cb){
    cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
})
var upload = multer({storage:storage})

//Handling Upload
app.post('/uploads',upload.single('file'),(req,res,next)=>{
  console.log("Request File",req.file);

 const file = req.file
 if(!file){
  return res.status(400).send({ message: 'Please upload a file.' });
 }
 
var sql = "INSERT INTO files(name) VALUES ('" + req.file.filename + "')";
var query = connection.query(sql, function(err, result) {
  return res.status(200).send({ message: 'File is successfully Uploaded.', file });
});
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})