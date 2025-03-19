import { sendTimeInNotification } from './nodemailer/send.email.js'; 

async function testEmail() {
    try {
        const email = "supnetcjs@gmail.com"; // Replace with your test email
        const studentName = "John Doe";
        const date = new Date();
        const time = "14:30"; // Example 24-hour format time

        const result = await sendTimeInNotification(email, studentName, date, time);
        console.log("Email sent successfully:", result);
    } catch (error) {
        console.error("Error testing email:", error);
    }
}

testEmail();