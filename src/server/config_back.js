const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = {
    PORT : 3000,
    MONGO_URI : process.env.MONGO_URI,
    EMAIL : process.env.MAILER_PASSWORD,
    WEBSITE_URL : 'http://localhost:5173',
    TRANSPORTER : nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAILER_ADRESS,
          pass: process.env.MAILER_PASSWORD
        }
    })
}