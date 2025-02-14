import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Explicitly set port for Gmail SMTP
  secure: true, // Use SSL
  auth: {
    user: process.env.NODEMAILER_EMAIL, // Use uppercase for env variables
    pass: process.env.NODEMAILER_EMAIL_PASS
  }
});

export default transporter;
