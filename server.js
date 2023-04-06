//jshint esversion: 6
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.post('/', (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USERNAME,
      pass: process.env.ZOHO_PASS,
    },
  });

  const mailOptions = {
    from: process.env.ZOHO_GREG,
    to: process.env.MY_EMAIL,
    subject: `Message from: ${req.body.name} <${req.body.email}> : ${req.body.subject}`,
    text: req.body.message,
  };

  const confirmationOptions = {
    from: process.env.ZOHO_NO_REPLY,
    to: req.body.email,
    subject: `Message Receipt Confirmation`,
    text: "I received the message that you sent through my website. Thank you, I'll be in touch.",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      res.send('success');
      console.log('successfully sent email');
    }
  });

  transporter.sendMail(confirmationOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      res.send('success');
      console.log('successfully sent email');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
