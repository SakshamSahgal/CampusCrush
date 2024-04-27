require("dotenv").config()
const port = process.env.PORT || 8080
const { app } = require("./app");
const { SendOTP, validateOTP, RegisterUser } = require("./Auth/register");
const { validateRegisterParameters, validateOTPParameters } = require("./Auth/ParameterValidation");
const { verifyIfCollegeEmail, checkIfEmailAlreadyRegistered } = require("./Auth/middlewares");
const { connectDB } = require("./db/mongoOperations")

app.listen(port, async () => {
  console.log(`Server running on port ${port}`)
  await connectDB()
})

app.post("/RegisterEmail", validateRegisterParameters, verifyIfCollegeEmail, checkIfEmailAlreadyRegistered, SendOTP); //this is the route for sending OTP
app.post("/validateOTP", validateOTPParameters, validateOTP, RegisterUser);

