import nodemailer from "nodemailer";

//Generating otp
let otp = 0;
const generateOtp = async () => {
  otp = 0;
  for (let i = 0; i < 6; i++) {
    otp = otp * 10 + Math.floor(Math.random() * 10);
    if (i === 0 && otp === 0) {
      otp = Math.floor(Math.random() * 9) + 1;
    }
  }
  return otp;
};

const sendMail = (userData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.SENDER, // Your Gmail address
      pass: process.env.PASSKEY, // Your Gmail password or app-specific password
    },
  });

  let mailOptions = {
    from: "Admin", // Sender address
    to: `${userData.email}`, // List of recipients
    subject: `Your OTP for Secure Access `, // Subject line
    text: "Your OTP for Secure Access", // Plain text body
    html: `
           <p> <h3>Dear ${userData.username},</h3></p>
  
  <p>Thank you for using our service. To proceed with registration, please use the following One-Time Password (OTP):</p>
  <p>Your OTP:<b> ${userData.otp}</b></p>
  
  <p>This OTP is valid for the next 10 minutes. For security reasons, do not share this OTP with anyone.</p>
  
  <p>If you did not request this OTP, please contact our support team immediately.</p>
  
  <h3>Thank you for your attention.</h3>
  
  <h3>Best regards,</h3>
  <h2>BookHeaven</h2>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    }
    console.log("Message send Successfully!");
  });
};

//getOtp
const getOtp = async (req, res) => {
  const { username, email } = req.headers;
  const otp = await generateOtp();
  const userData = {
    username: username,
    email: email,
    otp: otp,
  };

  if (userData) {
    await sendMail(userData);
    res.status(200).json({ message: `Otp sent successfully!` });
  } else {
    res.status(500).json({ error: "Failed to generate OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  const { userOtp } = req.body;
  if (userOtp === otp) {
    otp = 0;
    res.status(200).json({ message: true });
  } else {
    otp = 0;
    res.status(200).json({ message: false });
  }
};

export default getOtp;
