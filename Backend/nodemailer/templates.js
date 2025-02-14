export const TIME_IN_NOTIFICATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Time In Notification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Student Time In</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello Parent/Guardian,</p>
    <p>We want to inform you that <strong>{studentName}</strong> has successfully <strong>entered</strong> the school premises.</p>
    <p><strong>Date:</strong> {date}</p>
    <p><strong>Time In:</strong> {timeIn}</p>
    <p>If you have any concerns, please contact the school administration.</p>
    <p>Best regards,<br>Your School Name</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply.</p>
  </div>
</body>
</html>
`;

export const TIME_OUT_NOTIFICATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Time Out Notification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #FF5733, #E74C3C); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Student Time Out</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello Parent/Guardian,</p>
    <p>We want to inform you that <strong>{studentName}</strong> has <strong>left</strong> the school premises.</p>
    <p><strong>Date:</strong> {date}</p>
    <p><strong>Time Out:</strong> {timeOut}</p>
    <p>Please ensure your child arrives home safely.</p>
    <p>Best regards,<br>Your School Name</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply.</p>
  </div>
</body>
</html>
`;
