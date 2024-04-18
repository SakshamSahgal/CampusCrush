require("dotenv").config()
const port = process.env.PORT || 8080
const { app } = require("./app");
const { SendOTP } = require("./Auth/register");
const { verifyIfCollegeEmail } = require("./Auth/middlewares");
const { connectDB } = require("./db/mongoOperations")

app.listen(port, async () => {
  console.log(`Server running on port ${port}`)
  await connectDB()
})

app.get("/RegisterEmail", verifyIfCollegeEmail, SendOTP);