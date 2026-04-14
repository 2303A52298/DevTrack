const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async(req,res)=>{
 const {name,description,created_by}=req.body;

 const project = await pool.query(
  "INSERT INTO projects(name,description,created_by) VALUES($1,$2,$3) RETURNING *",
  [name,description,created_by]
 );

 res.json(project.rows[0]);
});

router.get("/", async(req,res)=>{
 const projects = await pool.query("SELECT * FROM projects");
 res.json(projects.rows);
});

module.exports = router;