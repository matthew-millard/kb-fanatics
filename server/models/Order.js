import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartID: {
    type: String,
    required: true,
    trim: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  taxes: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
});

const Order = model("Order", orderSchema);

export default Order;
