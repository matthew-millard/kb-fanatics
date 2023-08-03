import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fName: {
    type: String,
    required: true,
    trim: true,
  },
  LName: {
    type: String,
    required: true,
    trim: true,
  },
  eMail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address1: {
    type: String,
    required: true,
    trim: true,
  },
  address2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  stateProvince: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNum: {
    type: String,
    required: false,
    trim: true,
  },
  creditCard: {
    type: String,
    required: false,
    trim: true,
  },
  expiration: {
    type: String,
    required: false,
    trim: true,
  },
});

const User = model("User", userSchema);

export default User;
