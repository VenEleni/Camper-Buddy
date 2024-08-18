require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const makePayment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URI}/success`,
      cancel_url: `${process.env.FRONTEND_URI}/cancel`,
    });
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error making payment:", error);
    res.status(500).json({ message: "Error making payment" });
  }
};

module.exports = { makePayment };
