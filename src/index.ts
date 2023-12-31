import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sendMail } from "./sendEmail";
import cors from "cors";
import axios from "axios";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: [
            "vermel.netlify.app",
            "vermel-inc.netlify.app",
            "http://localhost:3000",
            "http://localhost:5173",
            "127.0.0.1:3000",
            "http://localhost",
            "127.0.0.1"
        ],
    })
);
app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

// make appointment route
app.post("/appointment", (req: Request, res: Response) => {
    console.log(req.body);
    try {
        sendMail(req.body.name, req.body.email, 'Schedule Your Appointment');
    } catch (error: any) {
        return res.status(500).send(
            JSON.stringify({
                message: error.message,
                success: false
            })
        );
    }
    return res.status(200).send(JSON.stringify({
        message: "Email sent successfully",
        success: true
    }));
});

app.post("/contact-us", (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const { name, email, subject, message } = req.body;

        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Confirmation</title>
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
            <h2>Thank You for Contacting Us!</h2>
            <p>Dear ${name},</p>
            <p>We have received your message with the following details:</p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Subject:</strong> ${subject}</li>
              <li><strong>Message:</strong> ${message}</li>
            </ul>
            <p>We appreciate your inquiry and will get back to you as soon as possible.</p>
            <p>Thank you for choosing Vermel Inc!</p>
            <p>If you have any additional questions or concerns, feel free to reply to this email.</p>
            <p>Best regards,<br>Lidiya<br>[Your Title/Position]<br>Vermel Inc</p>
            <a class="button" href="https://vermel-inc.netlify.app/">Visit Our Website</a>
          </div>
        </body>
        </html>
        `;

        sendMail(name, email, subject, html);

    } catch (error: any) {
        return res.status(500).send(
            JSON.stringify({
                message: error.message,
                success: false
            })
        );
    }
    return res.status(200).send(JSON.stringify({
        message: "Email sent successfully",
        success: true
    }));
})

// Replace 'example.com' with your server's domain or IP address
const serverUrl = 'http://vermel-server.onrender.com/users';
// Replace 300000 (5 minutes) with the desired interval in milliseconds
const interval = 600000;

/**
 * Keeps the server alive by sending a ping request to the server URL.
 *
 * @param {string} serverUrl - The URL of the server.
 * @return {void} This function does not return a value.
 */
const keepServerAlive = () => {
    axios.get(serverUrl).then((res) => {
        if (!res.data) {
            throw new Error(`Failed to ping server at ${serverUrl}`);
        } else {
            console.log(`Successfully pinged server at ${serverUrl}`);
        }

    }).catch((error) => {
        console.error(`Failed to ping server at ${serverUrl}:`, error);
    })
}

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    setInterval(keepServerAlive, interval);
});