const express = require('express');
const {  registerTeacher, loginTeacher,getallteachers } = require('../controllers/teacher.controller');
const  {auth}= require('../services/authservice')


//&  you're initializing an Express router using the "express.Router()" function.
//&  This is a crucial step when you want to create modular routes and middleware in your Express application

let router=express.Router();

router.post("/addteacher",registerTeacher)
router.get("/loginteacher",loginTeacher)
router.get("/getallteacher",auth,getallteachers)





module.exports=router