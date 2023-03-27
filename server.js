//jshint esversion: 6
require('dotenv').config({path: __dirname + '/.env'})
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/views/index.html")
})

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.GOOGLE_USERNAME,
            pass: process.env.GOOGLE_PASS,
        }
    })
  
    const mailOptions = {
        from: req.body.email,
        to: process.env.MY_EMAIL,
        subject: `Message from: ${req.body.name} <${req.body.email}> : ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
            res.send('error');
        } else {
            res.send('success');
            console.log('successfully sent email');
        }
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
})