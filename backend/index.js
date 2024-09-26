const express = require("express");
const cors = require("cors");
const path = require("path");
const applyRoutes = require("./routes/applyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
require('dotenv').config();


const app = express();
const { PORT } = require("./config");

// Middleware
app.use(cors({
  origin: ['https://ofin-binn.vercel.app','https://ofin-binn.vercel.app/admin', process.env.CLIENT_URL],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../my-react-app/build")));

// Routes
app.use("/apply", applyRoutes);
app.use("/admin", adminRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
