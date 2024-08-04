const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/connection");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URI = process.env.FRONTEND_URI;
const passport = require("passport");
const session = require("express-session");
const userRoutes = require("./routes/userRoute");
const authRoutes = require('./routes/authRoute')


dotenv.config();
require("./passport");

app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use("/user", userRoutes);

app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect(FRONTEND_URI);
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})