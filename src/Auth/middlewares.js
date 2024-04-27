const { checkIfExists } = require("../db/mongoOperations");


const verifyIfCollegeEmail = async (req, res, next) => {
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

module.exports = { verifyIfCollegeEmail, checkIfEmailAlreadyRegistered }