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
            "https://vermel-inc.netlify.app",
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
    // console.log(req.body);
    try {
        sendMail(req.body.name, req.body.email, 'Confirmation of Your Appointment with Vermel Hospice, Inc');
        sendMail(req.body.name, process.env.MAIL, 'Confirmation of Your Appointment with Vermel Hospice, Inc');
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
        sendMail(name, email, 'Confirmation of Your Inquiry with Vermel Hospice, Inc');
        sendMail(name, process.env.MAIL, 'Confirmation of Your Inquiry with Vermel Hospice, Inc');

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

app.get('/users', (req: Request, res: Response) => {
    res.send('Hello World!');
});

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
    // setInterval(keepServerAlive, interval);
});