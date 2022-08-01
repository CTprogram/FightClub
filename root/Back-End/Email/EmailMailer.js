const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "Hotmail",
  auth: {
    user: "CSCC09fightclub@hotmail.com",
    pass: "FightclubCSCC09@123",
  },
});

let sendEmail = function (emailOptions) {
  transporter.sendMail(emailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
