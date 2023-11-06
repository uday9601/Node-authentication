const nodemailer = require('nodemailer');

//!sending email
let invitationMail=async(email,name)=>{
    let transporter=nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:"udaykanthchadalawada@gmail.com",
            pass:"nyjjgnyrriqdcnhc"
        }
    })
    //!sending OTP
let random=Math.trunc(Math.random()*9999)


transporter.sendMail({
    from:"udaykanthchadalawada@gmail.com",
    to:email,
    subject:"invitation mail",
    //text:"thanks fro registering with us",
    //html:`<h1>thanks for registring ${name} visit again</h1>`
    html:`<h1> OTP ${random}</h1>`
},()=>{console.log("mail sent succesfully")})


}

module.exports={
    invitationMail
}