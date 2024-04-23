const mysql = require('mysql2');
const express = require('express');
const app = express();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Content-Type', 'application/json; charset=utf-8');  
  next();
});

const PORT = process.env.NODE_DOCKER_PORT || 3000;


    const connection = mysql.createConnection({
        host     : 'db',
        user     : 'root',
        password : 'password',
        database : 'uni_db',
        port: 3306,
    });
        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                
                
            } else {
                console.log('connected as id ' + connection.threadId);
                
            }
        });
    
    

const data = {
  "0":{
    "name":"ahmed",
    "age":20
  },
  "1":{
    "name":"ali",
    "age":21
  },
  "2":{
    "name":"amr",
    "age":22
  }
}

app.get("/data", (req, res) => {
  res.send(data);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


app.get('/dbtest',(req, res) =>  {
  connection.query('SELECT * FROM STUDENTS', function (error, results, fields) {
    if (error) console.log(error);
    res.send(results);
  });
});


app.get('/students', (req, res) => {
  connection.query('SELECT * FROM STUDENTS', function (error, results, fields) {
    if (error) console.log(error);
    const students = results.map(result => ({
      name: result.student_name,
      id: result.id,
      cgpa: parseFloat(result.cgpa),
      age: result.age,
    }));
    console.log(students);
    res.send(students);
})});
