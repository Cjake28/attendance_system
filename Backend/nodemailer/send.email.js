import dotenv from 'dotenv';
import { formatDate, convertTOAMPM } from '../utils/formatDate.js'; // Import your functions
import transporter from './config.email.js'; // Import your transporter
import { TIME_IN_NOTIFICATION_TEMPLATE, TIME_OUT_NOTIFICATION_TEMPLATE } from './templates.js'; // Import your email templates

dotenv.config();

export async function sendTimeInNotification(email, studentName, date, time) {
    try {
        const formattedDate = formatDate(date);
        const formattedTime = convertTOAMPM(time); // No need to split

        const sendEmail = await transporter.sendMail({
            from: '"Dr. Felipe De Jesus NHS" <' + process.env.NODEMAILER_EMAIL + '>',
            to: email,
            subject: 'Time In Notification',
            html: TIME_IN_NOTIFICATION_TEMPLATE
                .replace("{studentName}", studentName.toUpperCase())
                .replace("{date}", formattedDate)
                .replace("{timeIn}",  formattedTime), // Format date & time
        });
        return sendEmail;
    } catch (err) {
        console.error(err);
    }
}

export async function sendTimeOutNotification(email, studentName, date, time) {
    try {
        const formattedDate = formatDate(date);
        const formattedTime = convertTOAMPM(time); // No need to split

        const sendEmail = await transporter.sendMail({
            from: '"Dr. Felipe De Jesus NHS" <' + process.env.NODEMAILER_EMAIL + '>',
            to: email,
            subject: 'Time Out Notification',
            html: TIME_OUT_NOTIFICATION_TEMPLATE
                .replace("{studentName}", studentName.toUpperCase())
                .replace("{date}", formattedDate)
                .replace("{timeOut}",  formattedTime), // Format date & time
        });
        return sendEmail;
    } catch (err) {
        console.error(err);
    }
}
