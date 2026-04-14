const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

router.post("/register", async (req, res) => {
 const { name, email, password } = req.body;

 const hashed = await bcrypt.hash(password, 10);

 const user = await pool.query(
  "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",
  [name,email,hashed]
 );

 res.json(user.rows[0]);
});

router.post("/login", async (req,res)=>{
 const {email,password} = req.body;

 const user = await pool.query(
  "SELECT * FROM users WHERE email=$1",
  [email]
 );

 if(user.rows.length===0)
  return res.status(400).json("User not found");

 const valid = await bcrypt.compare(password,user.rows[0].password);

 if(!valid)
  return res.status(401).json("Invalid password");

 const token = jwt.sign(
  {id:user.rows[0].id},
  "secretkey"
 );

 res.json({token});
});

module.exports = router;