const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/connection");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URI_ORIGIN = process.env.FRONTEND_URI_ORIGIN;
const userRoutes = require("./routes/userRoute");
const authRoutes = require('./routes/authRoute')
const productRoutes= require('./routes/productRoute')
const cartRoutes = require('./routes/cartRoute')
const stripeRoutes = require('./routes/stripeRoute')
const orderRoutes = require('./routes/orderRoute')
const reviewsRoutes = require('./routes/reviewRoute')
const blogRoutes = require('./routes/blogRoute')


dotenv.config();
require("./passport");

app.use(express.json());
app.use(cors({
    origin: [FRONTEND_URI_ORIGIN, 'http://localhost:3000'],
    credentials: true
}));

app.use('/order', orderRoutes)
app.use('/auth', authRoutes);
app.use("/user", userRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes)
app.use("/api", stripeRoutes)
app.use('/review', reviewsRoutes)
app.use('/blog', blogRoutes)

app.get("/", (req, res) => {
    res.send('<a href = "/auth/google">Click on me</a>')
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})