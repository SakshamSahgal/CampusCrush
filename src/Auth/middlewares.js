const { readDB, checkIfExists } = require("../db/mongoOperations");


const verifyIfCollegeEmail = (req, res, next) => {
    console.log(req.body);
    const { email } = req.body;
    console.log(email);
    //email should end with @mail.jiit.ac.in
    if (email.endsWith("@mail.jiit.ac.in")) {
        next();
    } else {
        res.status(400).send({
            success: false,
            message: "Please Use JIIT's email"
        });
    }
}

const checkIfEmailAlreadyRegistered = async (req, res, next) => {
    const { email } = req.body;
    //check if email exists in the database
    let Query = {
        email: email
    }
    try {
        const response = await checkIfExists("Users", Query);
        if (response) {
            res.status(400).send({ //400 is bad request
                success: false,
                message: "Email already registered"
            });
        } else {
            console.log("Email not already registered");
            next();
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            message: `Server Error`,
            error: err
        });
    }
}

const validateOTPParameters = (req, res, next) => {
    const { email, otp, birthday, batch, name, campus, gender } = req.body;
    //gender should be in ['Male' ]
}

const validateRegisterParameters = (req, res, next) => {
    if (!req.body.email) {
        res.status(400).send({
            success: false,
            message: "Email is required"
        });
    } else {
        next();
    }
}


module.exports = { verifyIfCollegeEmail, checkIfEmailAlreadyRegistered, validateOTPParameters, validateRegisterParameters }