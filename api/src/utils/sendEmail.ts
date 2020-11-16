import nodemailer from "nodemailer";
require("dotenv").config(); // ✅ Load .env file

const { EMAILPASS, EMAIL } = process.env;
console.log("Email Pass:", EMAILPASS);
// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("testAccount", testAccount);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: `${EMAIL}`,
      pass: `${EMAILPASS}`,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "angusjelinek@gmail.com", // sender address
    to: to, // list of receivers
    subject: "Change password", // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
