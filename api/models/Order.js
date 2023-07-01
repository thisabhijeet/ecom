const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: { type: String },
  cart: [
    {
      id: String,
      title: String,
      price: String,
      description: String,
      category: String,
      image: String,
      rating: { rate: Number, count: Number },
      qty: Number,
    },
  ],
  amount: { type: Number },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
