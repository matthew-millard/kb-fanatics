import { Schema, model } from "mongoose";

const switchSchema = new Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  product: {
    type: String,
    required: true,
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
  image: {
    type: String,
    trim: true,
  },
});

const SwitchModel = model("Switches", switchSchema);

export default SwitchModel;
