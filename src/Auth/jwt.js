const { readDB } = require("../db/mongoOperations");
const jwt = require('jsonwebtoken');

async function loginRoute(req, res) {
    console.log(`Recieved request to login with Username: ${req.body.email} and Password: ${req.body.password}`);
    try {
        const response = await readDB("Users", { email: req.body.email, password: req.body.password });
        if (response.length > 0) {
            let payload = response[0];
            delete payload.password; //removing password from the payload
            console.log("Payload : ")
            console.log(payload);
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            console.log('Generated Token:', token);
            res.status(200).send({
                success: true,
                message: "Login Successful",
                token: token
            });
        }
        else {
            res.status(400).send({
                success: false,
                message: "Invalid credentials"
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

module.exports = { loginRoute }