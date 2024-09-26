const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");

const adminUser = {
  username: "index",
  passwordHash: bcrypt.hashSync("app", 10),
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // console.log("Received login request:", { username, password }); // Log input

    if (username === adminUser.username && bcrypt.compareSync(password, adminUser.passwordHash)) {
      const token = jwt.sign({ username: adminUser.username, role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
      
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "None",
      });

      return res.status(200).json({ message: "Login successful", role: "admin" });
    } else {
      console.log("Invalid credentials for user:", username); // Log invalid attempt
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error processing login:", error); // Log the error
    return res.status(500).json({ success: false, message: "Error processing login" });
  }
};

module.exports = { loginAdmin };
