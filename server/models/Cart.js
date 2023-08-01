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
    type: Float,
    required: true,
  },
  subTotal: {
    type: Float,
    required: true,
  },
});

const Cart = model("Cart", cartSchema);

export default Cart;
