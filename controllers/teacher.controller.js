
const Teacher = require('../model/teacher.model');
const {invitationMail} = require('../helpers/mailhelper');
const jwt = require('jsonwebtoken')



let registerTeacher = async (req,res,next)=>
{
    try
    {
        let {name,email,password} = req.body;
        
        //!email sending

        invitationMail(email,name)


        //! returns the document if condition satisfies else return null
        let isTeacherAvailable = await Teacher.findOne({email})

        if(!isTeacherAvailable)
        {
           
            let teacher = await Teacher.create({name,email,password})

            return res.status(201).json({error:false,message:"Teacher Added Successfully",data:{name:teacher.name,email:teacher.email}})
        }
        res.status(409).json({error:true,message:"This email is Already exists",data:{email:isTeacherAvailable.email}})
    }
    catch(err)
    {
        next(err)
    }
}


let loginTeacher = async (req,res,next) =>
{
    try
    {
        let {email,password} = req.body

        let isTeacherAvailable = await Teacher.findOne({email})

        if(!isTeacherAvailable)
        {
            return res.status(404).json({error:true,message:`No Teacher is available with given Email ID`})
        }

        let hashedPassword = await isTeacherAvailable.compareMyPassword(password)
        if(hashedPassword)
        {
            let token=jwt.sign({email:isTeacherAvailable.email,name:isTeacherAvailable.name}, 
                process.env.JWT_KEY,{expiresIn:process.env.JWT_EXPIRESIN})
            return res.status(201).json({error:false,message:"Login Successfull",token})
        }
        else
        {
            return res.status(401).json({error:true,message:"Invalid Password"})
        }
    }
    catch(err)
    {
        next(err)
    }
}

let getallteachers=async (req,res,next)=>{

try{

    let teachers=await Teacher.find({},{_id:0});
    return res.status(200).json({user:req.user.name,error:false,message:"teacgers fetched succesfully",
    data:teachers})
}


catch(err){
next(err)
}


}





module.exports=
{
    registerTeacher,
    loginTeacher,
    getallteachers

}