import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

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
    validate: {
      validator: function (value) {
        return value.length === 16; 
      },
      message: 'Credit card number must be 16 characters long',
    },
  },
  expiration: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 8; 
      },
      message: 'Password must be at least 8 characters long',
    },
  },
});

const User = model("User", userSchema);

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
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

userSchema.pre('save', async function (next) {
  if (this.isModified('creditCard') || this.isNew) {
    try {
      const partialCreditCard = this.creditCard.substring(0, 12);
      const hashedCreditCard = await bcrypt.hash(partialCreditCard, 10);     
      const asterisks = '*'.repeat(12);
      this.creditCard = `${asterisks}${this.creditCard.substring(12)}`;

    } catch (error) {
      return next(error);
    }
  }
  next();
});

export default User;
