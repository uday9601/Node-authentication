const express = require('express');
var cors = require('cors')
require('dotenv').config();
const teacherRoutes = require('./routes/teacher.routes');
require('./adapters/connectionDB');

//& You're declaring a variable named app.
//& You're using the express() function to create an instance of the Express application


let app=express();
app.use(cors())


//&  The line "app.use(express.json())" is used to include the built-in middleware in Express
//&  that parses incoming JSON payloads from HTTP requests. This middleware automatically
//&  parses the JSON data sent in the request body and makes it accessible through the "req.body" property.

app.use(express.json());


//&  The app.use() function in Express is used to apply middleware to your application.

app.use("/api/teacher",teacherRoutes);



//& Page not Found middleware
app.use("*",(req,res,next)=>
{
    res.status(404).json({error:true,message:"Page not found"})
})


//&  The app.listen() function in Express is used to start your server and make it listen for incoming HTTP requests.
//& It binds the server to a specified port and optional hostname, allowing your application to respond to requests from clients.

app.listen(process.env.PORT,(err)=>
{
    if(err) throw err;
    console.log(`Page is running on PORT ${process.env.PORT}`)
})