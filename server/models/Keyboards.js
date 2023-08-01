import { Schema, model } from "mongoose";

const keyboardSchema = new Schema({
  prodName: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  features: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  }
});

const Keyboard = model("Keyboard", keyboardSchema);

export default Keyboard;
