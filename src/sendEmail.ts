import { createTransport } from "nodemailer";



export const sendMail = (name: string, email = "ayalewemneteab@gmail.com", subject: string, html: string | null = null) => {
    const HtmlElement = html || `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Request</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          color: #333;
        }
        p {
          color: #555;
        }
        a {
          color: #007BFF;
          text-decoration: none;
          font-weight: bold;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 15px;
          background-color: #007BFF;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Schedule Your Appointment</h2>
        <p>Dear ${name},</p>
        <p>We hope this message finds you in good health. Taking the first step towards better health is crucial, and we're here to assist you on your journey.</p>
        <p>To schedule your appointment, please click on the button below:</p>
        <a class="button" href="[Your Appointment Link]">Schedule Appointment</a>
        <p>If you have any questions or need further assistance, feel free to reply to this email.</p>
        <p>Thank you for choosing Vermel Inc. We look forward to supporting you in your wellness journey.</p>
        <p>Best regards,<br>Bruhtesfa Ayalew<br>[Your Title/Position]<br>[Your Health Center or Organization]</p>
      </div>
    </body>
    </html>
    `;

    try {
        const transporter = createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL || "ayalewemneteab@gmail.com",
                pass: process.env.MAIL_PASSWORD || "ayalewemneteab@gmail.com",
            },
        });

        const mailOptions = {
            from: 'ayalewemneteab@gmail.com',
            to: email,
            subject: subject,
            html: HtmlElement
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error: any) {
        console.log(error);
    }
};
