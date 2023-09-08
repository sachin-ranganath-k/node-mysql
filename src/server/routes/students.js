const express = require("express");
const bodyParser = require("body-parser");
const con = require("../db/db");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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
        message: "Error fetching student data",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: `Fetched data with student id ${req.params.rollNo}`,
      });
    }
  });
});

router.put("/update/:rollNo/:name", (req, res) => {
  const rollNo = req.params.rollNo;
  const studentName = req.params.name;
  const sql = `UPDATE students SET name='${studentName}' WHERE rollNo='${rollNo}'`;
  con.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        status: 400,
        message: "Error updating student data",
        result: result
      });
    } else {
      // console.log(req.body)
      res.status(200).json({
        status: 200,
        // responseData: req.body,
        message: `Updated data with stident id ${rollNo}`,
      });
    }
  });
});

router.delete("/delete/:rollNo", (req, res) => {
  const rollNo = req.params.rollNo;
  const sql = `delete from students where rollNo='${rollNo}'`;
  con.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        status: 400,
        message: "Error deleting student data",
        result: result
      });
    } else {
      // console.log(req.body)
      res.status(200).json({
        status: 200,
        // responseData: req.body,
        message: `Deleted data with student id ${rollNo}`,
      });
    }
  });
});

module.exports = router;
