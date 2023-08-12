import nodemailer from "nodemailer";
import Uuidv4 from "uuid";
import dotenv from "dotenv";


dotenv.config();


export const sendVerificationEmail = async ({email }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: process.env.TESTMAIL,
      pass: process.env.TESTPASS,
    },
  });


  const currentUrl = "http://localhost:3000"; // Update the port
  const uniqueString = Uuidv4();


  const mailOptions = {
    from: process.env.TESTMAIL,
    to: email,
    subject: "Verify your Email for KB-Fanatics",
    html: `<p> Verify your email address to complete your Account <p><p> This link expires in 6 hours</p><p><a href=${currentUrl + "user/verify/"+ uniqueString}</a> here</p>`,
  };


  try {
    const emailResponse = await transporter.sendMail(mailOptions);
    return emailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};
