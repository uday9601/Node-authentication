const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


let teacherSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Mandatory"]
    },
    email:
    {
        type:String,
        required:[true,"email is mandatory"]
    },
    password:{
        type:String,
        required:[true,"Password is Mandatory"]
    }
},
{timestamps:true})

//! Don't use arrow function for pre method
teacherSchema.pre("save", async function(next)
{
    let salt=await bcryptjs.genSalt(11);
    this.password=await bcryptjs.hash(this.password, salt);
    //! from 5 and above version of mongoose next() is not required
    //next()
})

teacherSchema.methods.compareMyPassword= async function(password)
{
    let hashedPassword=await bcryptjs.compare(password , this.password);
    return hashedPassword;
}


module.exports=new mongoose.model("teacher",teacherSchema)