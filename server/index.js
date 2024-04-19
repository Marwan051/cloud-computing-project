require('dotenv').config();
const PORT = process.env.NODE_DOCKER_PORT || 3000;

const express = require('express');
const app = express();

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





