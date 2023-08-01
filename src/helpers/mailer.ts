import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

connect();
export async function sendMail({email,emailType,userId}:any){

    const hashedToken=await bcryptjs.hash(userId.toString(),10);

    if(emailType==='VERIFY'){
        const data=User.findByIdAndUpdate(userId,{
            verifyToken: hashedToken,
            verifyTokenExpiry:Date.now()+3600000,
        })
    }else{
        await User.findByIdAndUpdate(userId,{
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry:Date.now()+3600000,
        })
    }
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "8546e6bc01e741",
          pass: "becfa0e440db1f"
        }
    });
    const mailOptions={
        from: 'sparsh@mail.com', // sender address
        to: email, // list of receivers
        subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password", // Subject line
        // text: "Hello world?", // plain text body
        html: `<p> Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"} .or copy this url on browser:<br>${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</p>`, // html body
      };

      const response = await transporter.sendMail(mailOptions);

      return response;
}