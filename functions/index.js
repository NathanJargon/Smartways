const functions = require("firebase-functions");
const regions = functions.region("asia-southeast1");
const admin = require("firebase-admin");
const {HttpsError} = require("firebase-functions").https;
admin.initializeApp();

const nodemailer = require("nodemailer");

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});
exports.sendEmail = regions.https.onCall((data, context) => {
  const email = data.email;

  const mailOptions = {
    from: "Your App <noreply@yourapp.com>",
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = "New sign-in from a new device";
  mailOptions.text = `Hi,

We noticed a new sign-in with your account from a new device. 

If this was you, you can disregard this email. 
If this wasn't you, please secure your account.

Thanks,
KARBON Team`;
  return mailTransport.sendMail(mailOptions)
      .then(() => {
        console.log("mail send to:", email);
        return {data: "Email sent"};
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        throw new HttpsError("internal", `Failed: ${error.message}`);
      });
});

exports.sendWelcomeEmail = regions.https.onCall((data, context) => {
  const email = data.email;
  const mailOptions = {
    from: "Your App <noreply@yourapp.com>",
    to: email,
  };

  // The user has just signed up
  mailOptions.subject = "Welcome to KARBON";
  mailOptions.text = `Hi,

Welcome to KARBON. We're excited to have you on board.

Thanks,
KARBON Team`;
  return mailTransport.sendMail(mailOptions)
      .then(() => {
        console.log("Welcome email sent to:", email);
        return {data: "Welcome email sent"};
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        throw new HttpsError("internal", `Failed: ${error.message}`);
      });
});
