var nodemailer = require('nodemailer'); //using Node Mailer Module
const otpGenerator = require('otp-generator')
const { writeDB, readDB } = require('../db/mongoOperations')

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

    transporter.sendMail(mailOptions, async function (error, info) {
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

            try {
                await writeDB("OTPRegistry", { email: email, otp: OTP, expireTime: new Date(Date.now() + process.env.OTP_VALIDATION_DURATION_IN_MINUTES * 60000) });
                res.status(200).send({
                    success: true,
                    message: "OTP sent successfully"
                });
            }
            catch (err) {
                res.status(500).send({
                    success: false,
                    message: `Server Error`,
                    error: err
                });
            }
        }
    });
}

async function validateOTP(req, res) {
    const { email, otp, birthday, batch, name, campus, gender } = req.body;
    console.log(email, otp)
    try {

        let Query = {
            email: email,
            otp: otp,
            expireTime: { $gt: new Date() } //checking if the OTP is expired or not
        }

        let result = await readDB("OTPRegistry", Query);
        if (result.length > 0) {
            res.status(200).send({
                success: true,
                message: "OTP is valid"
            });
        }
        else {
            res.status(400).send({
                success: false,
                message: "OTP is invalid or expired"
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            message: `Server Error`,
            error: err
        });
    }
}

module.exports = { SendOTP, validateOTP }