const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
  const { subtotal, currentUser, cartItems } = req.body;

  try {
    // Simulating payment processing (not involving a payment gateway)
    // You can directly save the order details without actual payment processing
    const newOrder = new Order({
      name: currentUser.name,
      email: currentUser.email,
      userid: currentUser._id,
      orderItems: cartItems,
      orderAmount: subtotal,
      paymentStatus: "Paid", // Simulated payment status
      paymentMethod: "Simulated Payment", // Simulated payment method
      // You might include additional fields related to payment or order status
    });

    await newOrder.save(); // Save the order details to MongoDB

    res.send('Order placed successfully'); // Respond with success message
  } catch (error) {
    return res.status(400).json({ message: 'Something Went Wrong' + error });
  }
});

router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: 'Something Went Wrong' + error });
  }
});


module.exports = router;
