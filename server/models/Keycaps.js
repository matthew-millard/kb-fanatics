import { Schema, model } from "mongoose";

const keycapSchema = new Schema({
  prodName: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    // unique?
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
  },
});

const Keycap = model("Keycap", keycapSchema);

export default Keycap;
