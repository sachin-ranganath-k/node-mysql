const express = require("express");
const con = require("../db/db");

const router = express.Router();

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

router.post("/student/add", (req, res) => {
  let data = { rollNo: req.body.studRollNo, name: req.body.studName };
  const sql = "insert into students set ? ";
  const sql2 = `select * from students where name = '${req.body.studName}'`;
  con.query(sql2, data, (err, result) => {
    if (err) {
      res.status(400).json({
        status: 400,
        message: "Error occured..! Please verify body sent correctly",
        result: result,
      });
      console.log(err);
    } else {
      if (result.length > 0) {
        res.status(501).json({
          status: 501,
          message: "Student name already exists..!",
        });
      } else {
        con.query(sql, data, (err, result) => {
          if (err) {
            res.status(400).json({
              status: 400,
              message: "Error occured..!",
              result: result,
            });
          } else {
            res.status(200).json({
              status: 200,
              message: "Added Successfully..!",
            });
          }
        });
      }
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
