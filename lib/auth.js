require("dotenv").config();
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

// Set up MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("sample_mflix");

// Create Nodemailer transport using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASSWORD, // Your Gmail password or App Password
  },
});

// Function to send email
const sendVerificationEmail = async (email, token) => {
  const verificationLink = `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Please verify your email address",
    text: `Click on the link to verify your email address: ${verificationLink}`,
    html: `<p>Click on the link to verify your email address: <a href="${verificationLink}">Verify Email</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    async afterCreateUser(user) {
      const token = Math.random().toString(36).substring(2); // Generate a simple token
      await sendVerificationEmail(user.email, token); // Send email with verification token
      // You can store the token and its expiration date in your database to check later
    },
  },
});
