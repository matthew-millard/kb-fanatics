import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    // required: true,
    trim: true,
  },
  city: {
    type: String,
    // required: true,
    trim: true,
  },
  stateProvince: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    // required: true,
  },
  postalCode: {
    type: String,
    // required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    // validate: {
    //   validator: function (v) {
    //     // Assume phone number is a series of 10-15 digits, possibly with dashes
    //     return /^\d{10,15}$|^\d{3}-\d{3}-\d{4}$|^\d{3}-\d{4}-\d{4}$/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid phone number!`,
    // },
    // required: true,
    trim: true,
  },
});

const User = model("User", userSchema);

export default User;
