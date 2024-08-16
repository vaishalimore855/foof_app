const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// dotenv configuration
dotenv.config();

// connect to database
connectDB();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/resturant", require("./routes/resturantRoute"));
app.use("/api/v1/category", require("./routes/categoryRoute"));
app.use("/api/v1/food", require("./routes/foodRoute"));
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to food server</h1>");
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
