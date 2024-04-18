var nodemailer = require('nodemailer'); //using Node Mailer Module
const otpGenerator = require('otp-generator')

async function SendOTP(req, res) {

    const { email } = req.body;
    console.log(email)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NodeMailerEmail,
            pass: process.env.NodeMailerPassword //I am using App password (enabled 2 step verification first)
        },
    });

    //generating OTP
    let OTP = otpGenerator.generate(process.env.OTP_LENGTH, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

    var mailOptions = {
        from: process.env.NodeMailerEmail,
        to: email,
        subject: 'OTP verification',
        text: `${OTP} is your OTP, it is only valid for ${process.env.OTP_VALIDATION_DURATION_IN_MINUTES} minutes`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: `Error in sending OTP email`,
                error: error
            });
        } else {
            console.log('Email sent: ' + email);
            console.log("Message sent : %s", `${OTP} is your OTP, it is only valid for ${process.env.OTP_VALIDATION_DURATION_IN_MINUTES} minutes`);
            res.status(200).send({
                success: true,
                message: "OTP sent successfully"
            });
        }
    });
}

module.exports = {
    SendOTP
}