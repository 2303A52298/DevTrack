const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async(req,res)=>{
 const {title,status,project_id}=req.body;

 const task = await pool.query(
  "INSERT INTO tasks(title,status,project_id) VALUES($1,$2,$3) RETURNING *",
  [title,status,project_id]
 );

 res.json(task.rows[0]);
});

router.get("/", async(req,res)=>{
 const tasks = await pool.query("SELECT * FROM tasks");
 res.json(tasks.rows);
});

module.exports = router;