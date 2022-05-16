const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const port = 6000;

app.use(express.json());

const senderAddress = 'adevadevsender@yandex.ru';
const recipient = 'hello@adev.am';

async function sendEmail({text, name, email}) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.yandex.ru',
    auth: {
      // secret answer sender курткабейн
      user: senderAddress,
      pass: 'novarestart987',
    },
    secure: true,
  });

  let info = await transporter.sendMail({
    from: `"Adev invite" <${senderAddress}>`,
    to: recipient,
    subject: `Landing reaction from ${name} ${email}`,
    text,
  });

  console.log('Message sent: %s', info.messageId);
  return info.messageId;
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/send-email', (req, res) => {
  try {
    sendEmail(req.body);
    res.status(200).end();
  } catch (error) {
    res.json({message: 'Shit happened!', error}).status(400);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
