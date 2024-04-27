
const validateOTPParameters = async (req, res, next) => {
    // const { email, otp, birthday, batch, name, campus, gender } = req.body;
    // //gender should be in ['Male' ]
    if (req.body.email && req.body.otp && req.body.birthday && req.body.batch && req.body.name && req.body.campus && req.body.gender) {
        next();
    }
    else {
        res.status(400).send({
            success: false,
            message: "All parameters are required"
        });
    }
}

const validateRegisterParameters = async (req, res, next) => {
    if (!req.body.email) {
        res.status(400).send({
            success: false,
            message: "Email is required"
        });
    } else {
        next();
    }
}

module.exports = { validateRegisterParameters, validateOTPParameters }