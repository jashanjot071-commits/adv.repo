const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your Gmail & App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jashanjot071@gmail.com",
    pass: "bzgj dbfa zskt awfy"
  }
});

app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Email to Advocate
  const adminEmail = {
  from: "yourgmail@gmail.com",     // Your verified Gmail
  replyTo: email,               // User's email (anyone can use)
  to: "jashanjot071@gmail.com", // Advocate's email
  subject: subject ? `Inquiry: ${subject}` : `New Inquiry from ${name}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject || "Not provided"}</p>
    <p><strong>Message:</strong> ${message}</p>
  `
};


  // Auto-response to user
  const autoReply = {
    from: "yourgmail@gmail.com",
    to: email,
    subject: "Thank you for contacting Advocate Mohan Singh Arora",
    html: `
      <p>Hello ${name},</p>
      <p>Your message has been received. Advocate Mohan Singh Arora will contact you shortly.</p>
      <br>
      <p>Regards,<br><strong>District Court Complex</strong><br>Ludhiana</p>
    `
  };

  try {
    await transporter.sendMail(adminEmail);
    await transporter.sendMail(autoReply);
    res.json({ success: true, message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to send message. Try again later." });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
