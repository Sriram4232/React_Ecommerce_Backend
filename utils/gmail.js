const nodemailer = require('nodemailer');
require('dotenv').config();


let mail = async (email, username) => {
    // Create a transporter.
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.MAIL_PASSWORD
        }
    });
    // compose a message

    let message = {
        from: process.env.APP_EMAIL,
        to: email,
        subject: 'Account Creation',
        text: `Hi ${username} Your account has been created successfully.`,
        html: `<p>Hi ${username}. Thankyou for joining in our website. Your account has been created successfully.</p>`
    };

    // sending a mail

    await transporter.sendMail(message);
    console.log("email sent✅");
}

// exporting this js file
module.exports = mail;