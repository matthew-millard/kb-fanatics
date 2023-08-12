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
  verified: {
    type: Boolean,
    trim: true,
    default: false,
  },
  addressValidation: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("creditCard") || this.isNew) {
    try {
      const partialCreditCard = this.creditCard.substring(0, 12);
      const hashedCreditCard = await bcrypt.hash(partialCreditCard, 10);
      const asterisks = "*".repeat(12);
      this.creditCard = `${asterisks}${this.creditCard.substring(12)}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export default User;
