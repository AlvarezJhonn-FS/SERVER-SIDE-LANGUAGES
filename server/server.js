const dotenv = require("dotenv").config();
const connectDB = require("./app/config/db");
const app = require("./app");
const cors = require("cors");


app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    console.log("process.env.PORT", process.env.PORT);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1); 
  });