import SwitchModels from "../models/Switches.js";
import User from "../models/Users.js";
import Keycap from "../models/Keycaps.js";
import Keyboard from "../models/Keyboards.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  },
  Mutation: {
    signup: async (
      _,
      { fName, LName, eMail, password, address1, city, stateProvince, country },
    ) => {
      try {
        // First, check if a user with this email already exists
        const existingUser = await User.findOne({ eMail });
        if (existingUser) {
          throw new Error("User with this email already exists");
        }

        // Hash the password before saving the user to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
          fName,
          LName,
          eMail,
          password: hashedPassword,
          address1,
          city,
          stateProvince,
          country,
        });
        const result = await user.save();

        // Create a JWT token
        const token = jwt.sign({ user_ID: result._id, eMail: result.eMail }, "JWT_SECRET_KEY", {
          expiresIn: "1d",
        });

        return {
          token,
          user: result,
        };
      } catch (error) {
        if (error.name === "ValidationError") {
          console.error(error.message);
          console.error(error.errors);
        }
        console.error(error); // Log the error here
        throw error; // Re-throw the error to be caught by Apollo Server
      }
    },
  },
};

export default resolvers;
