const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from a .env file

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json()); // Parse incoming JSON requests
app.use("/", router);
app.listen(5000, () => console.log("Server running on port 5000"));

// Create a transport object using Gmail
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Get email from environment variable
    pass: process.env.EMAIL_PASS, // Get password from environment variable
  },
});

// Verify transport
contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

// Handle POST request from contact form
router.post("/contact", (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  const name = `${firstName} ${lastName}`;

  // Prepare the email message
  const mail = {
    from: name,
    to: process.env.EMAIL_USER, // Send to the configured Gmail address
    subject: "Contact Form Submission - Portfolio",
    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Message: ${message}</p>
      <p>WhatsApp: <a href="https://wa.me/11234567890?text=Hello%20I%20need%20assistance%20from%20${name}">Click here to message on WhatsApp</a></p>
    `,
  };

  // Send email
  contactEmail.sendMail(mail, (error, info) => {
    if (error) {
      return res.json({ code: 500, message: "Failed to send message" });
    } else {
      return res.json({
        code: 200,
        status: "Message Sent",
        info: info.response,
      });
    }
  });
});
