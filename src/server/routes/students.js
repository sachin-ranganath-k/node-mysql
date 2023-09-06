const express = require("express");
const bodyParser = require("body-parser");
const con = require("../db/db");

const app = express();
const router = express.Router();

app.use(bodyParser.json());

router.get("/students/all", (req, res) => {
  const sql = "select *from students";
  con.query(sql, (error, result) => {
    if (error) {
      res.status(400).json({
        status: 400,
        message: "Error..!",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Fetched Successfully..!",
      });
    }
  });
});

router.get("/student/:rollNo", (req, res) => {
  const sql = "SELECT * FROM students WHERE rollNo=?";
  const values = [req.params.rollNo];
  con.query(sql, values, (error, result) => {
    if (error) {
      res.status(400).json({
        status: 400,
        message: "Error fetching user data",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: `Fetched data with user id ${req.params.rollNo}`,
      });
    }
  });
});

module.exports = router;
