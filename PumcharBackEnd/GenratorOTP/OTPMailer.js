const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

module.exports.OTPMailer = (email, OTP, res) => {
  let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  transporter = nodemailer.createTransport(nodeConfig);

  MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  try {
    let response = {
      body: {
        intro:
          "Welcome to PunctureDokan! We're very excited to have you on board.",
        action: {
          instructions:
            "To get started with PunctureDokan,Please confirum your Email",
          button: {
            color: "#fff",
            text: `${OTP}`,
            border: "2px solid black",
          },
        },
        outro: "OTP will expire with in 15 minutes",
      },
    };
    let emailBody = MailGenerator.generate(response);
    let emailMessage = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email verification Code",
      html: emailBody,
    };
    transporter
      .sendMail(emailMessage)
      .then(() => {
        return res.status(200).json({
          success: "Pending",
          msessage: "You should receive an email from us.",
        });
      })
      .catch((error) => res.send({ success: false, message: error.message }));
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
