
const verifyIfCollegeEmail = (req, res, next) => {
    const { email } = req.body;
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

module.exports = { verifyIfCollegeEmail }