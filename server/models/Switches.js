import { Schema, model } from "mongoose";

const switchSchema = new Schema({
  brand: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  product: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  switchType: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Switch = model("Switch", switchSchema);

export default Switch;
