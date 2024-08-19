require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// const makePayment = async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map((item) => {
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: item.title,
//               images: [item.image],
//             },
//             unit_amount: item.price * 100,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${process.env.FRONTEND_URI}/success`,
//       cancel_url: `${process.env.FRONTEND_URI}/cancel`,
//     });
//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error("Error making payment:", error);
//     res.status(500).json({ message: "Error making payment" });
//   }
// };

const createPaymentIntent = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Invalid items array" });
      }

    // Calculate the total amount based on the items
    // const amount = items.reduce((total, item) => {
    //     if (!item.price || !item.quantity) {
    //         console.error(`Invalid item at index ${index}:`, item);
    //       throw new Error("Invalid item price or quantity");
    //     }
    //     return total + item.price * item.quantity;
    //   }, 0);

    let amount = 0;
    items.forEach((item, index) => {
      if (!item.product || !item.product.price || !item.quantity) {
        console.error(`Invalid item at index ${index}:`, item);
        throw new Error("Invalid item price or quantity");
      }
      amount += item.product.price * item.quantity;
    });

      if (isNaN(amount) || amount <= 0) {
        throw new Error("Invalid amount calculated");
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe expects the amount in cents
        currency: "usd",
      });
console.log("paymentIntent is : ", paymentIntent)
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Error creating payment intent" });
  }
};

module.exports = { createPaymentIntent };
