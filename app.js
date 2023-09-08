const express = require('express');
const app = express();

const studentRoute = require('./src/server/routes/students')
app.use(studentRoute);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.listen(3002, ()=>{
    console.log('Server started..!')
})