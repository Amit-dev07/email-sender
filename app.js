require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;
    console.log("Send email start");
    console.log(name,email,message);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465, // true for port 465, false for port 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER_RECEIVER,
        subject: 'New Inquiry from Website',
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email.');
        }
        console.log('Email sent:', info.response);
        res.send('Email sent successfully!');
    });
});

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log("loading home page")
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/hello', (req, res) => {
    console.log("loading home page")
    res.sendFile(path.join(__dirname, 'public', 'hello.html'));
});

app.get('/main', (req, res) => {
    console.log("loading home page")
    res.sendFile(path.join(__dirname, 'public', 'index2.html'));
});
app.listen(3000, () => {
    console.log('Email Server started on port 3000');
});
