import SwitchModels from "../models/Switches.js";
import User from "../models/Users.js";
import Keycap from "../models/Keycaps.js";
import Keyboard from "../models/Keyboards.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const resolvers = {
  Query: {
    switches: async () => {
      try {
        return await SwitchModels.find({});
      } catch (error) {
        throw new Error("Error fetching switches");
      }
    },
    keyboards: async () => {
      try {
        return await Keyboard.find({});
      } catch (error) {
        throw new Error("Error fetching keyboards");
      }
    },
    keycaps: async () => {
      try {
        return await Keycap.find({});
      } catch (error) {
        throw new Error("Error fetching keycaps");
      }
    },
    users: async () => {
      try {
        return await User.find({});
      } catch (error) {
        throw new Error("Error fetching users");
      }
    },
    orders: async () => {
      try {
        return await Order.find({});
      } catch (error) {
        throw new Error("Error fetching orders");
      }
    },
    cart: async () => {
      try {
        return await Cart.find({});
      } catch (error) {
        throw new Error("Error fetching cart");
      }
    },
    userCart: async (_, args, context) => {
      try {
        // Verify the token and extract the user ID
        const { user_ID } = jwt.verify(context.token, 'JWT_SECRET_KEY');
        
        // Fetch the user's cart from the database
        const userCart = await Cart.findOne({ user_ID: user_ID });

        if (!userCart) {
          throw new Error('Cart not found');
        }

        return userCart;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },

  Mutation: {
    signup: async (_, { fName, LName, eMail, password, address1, city, stateProvince, country }) => {
      // Check if user already exists
      const existingUser = await User.findOne({ eMail });
      if (existingUser) {
        throw new Error('A user with that email already exists.');
      }
  
      // Hash password and create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        fName,
        LName,
        eMail,
        password: hashedPassword,  // Storing hashed password
        address1,
        city,
        stateProvince,
        country
      });
  
      // Create and return JWT token
      const token = jwt.sign({ user_ID: newUser._id }, 'JWT_SECRET_KEY', { expiresIn: '1d' });
      return { token, user: newUser };
    },

    login: async (_, { eMail, password }) => {
      const user = await User.findOne({ eMail: new RegExp('^' + eMail + '$', 'i') });
      console.log("Email being searched:", eMail);
      console.log("Fetched User:", user);
      if (!user) {
          throw new Error('User not found');
      }
  
      if (!password) {
          throw new Error("No password provided in the login request");
      }
  
      // This checks if the password field exists and is not null or undefined.
      if (typeof user.password !== 'string' || user.password.trim() === "") {
          throw new Error("Stored hashed password is missing for this user");
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
          throw new Error('Incorrect password');
      }
  
      const token = jwt.sign({ user_ID: user._id, eMail: user.eMail }, 'JWT_SECRET_KEY', { expiresIn: '1d' });
      return {
          token,
          user,
      };
  },
  
  }
};

export default resolvers;
