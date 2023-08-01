/* eslint-disable no-undef */
import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  itemID: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "itemModel",
  },
  itemModel: {
    type: String,
    required: true,
    enum: ["Keyboard", "Keycap", "Switch"],
  },
  quantity: {
    type: Number,
    required: true,
  },
  prodName: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  subTotal: {
    // eslint-disable-next-line no-undef
    type: Number,
    required: true,
  },
});

const Cart = model("Cart", cartSchema);

export default Cart;
