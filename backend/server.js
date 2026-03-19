console.log("SERVER FILE LOADED");
require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = process.env.VERCEL 
    ? path.join("/tmp", "user.json") 
    : path.join(__dirname, "user.json");

function readUsers() {
    if (process.env.VERCEL && !fs.existsSync(USERS_FILE)) {
        try {
            const defaultUsers = require("./user.json");
            fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
        } catch (err) {
            console.error("Failed to seed USERS_FILE:", err);
            fs.writeFileSync(USERS_FILE, "[]");
        }
    } else if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, "[]");
    }

    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER || "astradyne.global@gmail.com",
        pass: process.env.EMAIL_PASS,
    },
});

let otps = {}; // Mock storage for OTPs

app.get("/", (req, res) => {
    res.send("Backend running");
});



app.post("/api/send-otp", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    });

    otps[email] = otp;

    const mailOptions = {
        from: '"Astradyne Global" <astradyne.global@gmail.com>',
        to: email,
        subject: "Your Verification Code - Astradyne Global",
        text: `Your verification code is: ${otp}. Please do not reply to this email.`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #4f46e5;">Verification Code</h2>
                <p>Hello,</p>
                <p>Your verification code for Astradyne Global is:</p>
                <h1 style="letter-spacing: 5px; color: #1e293b;">${otp}</h1>
                <p>This code will expire shortly. Please do not share it with anyone.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 0.8rem; color: #64748b;">This is an automated message, please do not reply.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP ${otp} sent to ${email}`);
        res.json({ message: "OTP sent to your email." });
    } catch (error) {
        console.error("Error sending email:", error);
        // Fallback for development if no credentials provided
        if (!process.env.EMAIL_PASS) {
            console.log("INTERNAL DEV NOTE: EMAIL_PASS not set. Use this OTP:", otp);
            return res.json({ message: "OTP generated (Check server logs in development)." });
        }
        res.status(500).json({ message: "Failed to send email OTP." });
    }
});

app.post("/api/verify-otp", (req, res) => {
    const { email, otp } = req.body;
    if (otps[email] === otp) {
        delete otps[email];
        res.json({ message: "OTP verified successfully" });
    } else {
        res.status(400).json({ message: "Invalid OTP" });
    }
});

app.post("/api/register", (req, res) => {
    const { name, email, password, grade, school, mobile } = req.body;

    let users = readUsers();
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password,
        grade,
        school,
        mobile: mobile || "",
        role: "student"
    };

    users.push(newUser);
    saveUsers(users);

    res.json({ message: "User registered successfully" });
});

app.post("/api/login", (req, res) => {
    const { email, password, role: requestedRole } = req.body;

    let users = readUsers();

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Role-based enforcement
    const userRole = user.role || "student";
    if (requestedRole && userRole !== requestedRole) {
        return res.status(401).json({ message: `Invalid credentials or selected wrong role.` });
    }

    res.json({ message: "Login successful", userId: user.id, name: user.name, email: user.email, grade: user.grade, school: user.school, role: userRole, department: user.department, joiningDate: user.joiningDate });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
