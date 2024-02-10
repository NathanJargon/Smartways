exports.sendEmail = functions.https.onCall((data, context) => {
    const email = data.email;
    const mailOptions = {
      from: `Your App <noreply@yourapp.com>`,
      to: email,
    };
  
    // The user subscribed to the newsletter.
    mailOptions.subject = `New sign-in from a new device`;
    mailOptions.text = `Hi,
  
  We noticed a new sign-in with your account from a new device. 
  
  If this was you, you can disregard this email. If this wasn't you, please secure your account.
  
  Thanks,
  KARBON Team`;
    return mailTransport.sendMail(mailOptions).then(() => {
      return console.log('mail send to:', email);
    });
  });


exports.sendWelcomeEmail = functions.https.onCall((data, context) => {
  const email = data.email;
  const mailOptions = {
    from: `Your App <noreply@yourapp.com>`,
    to: email,
  };

  // The user has just signed up
  mailOptions.subject = `Welcome to KARBON`;
  mailOptions.text = `Hi,

Welcome to KARBON. We're excited to have you on board.

Thanks,
KARBON Team`;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('Welcome email sent to:', email);
  });
});