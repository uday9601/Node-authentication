const {connect} = require('mongoose');
require('dotenv').config();


//^ Creating Database and connecting to it
connect(process.env.DEV_MONGOURL).
then(()=>
{
    console.log("mongoDB connected Successfully")
}).catch(err=>
    {
        console.log(err)
    })