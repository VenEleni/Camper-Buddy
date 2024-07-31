const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/connection")
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URI = process.env.FRONTEND_URI;
const userRoutes = require("./routes/userRoute")

app.use(express.json());
app.use(cors({
    origin: "*",
}));

app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})