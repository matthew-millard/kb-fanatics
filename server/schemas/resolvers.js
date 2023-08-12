import { Switch, Keyboard, Keycap, Deskmat, Accessory, User, Order } from "../models/index.js";
import bcrypt from "bcrypt";
import Stripe from "stripe";
import { generateToken, verifyTokenFunction } from "../utils/authService.js";
import dotenv from "dotenv";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is not set!");
}

const resolvers = {
  Query: {
    user: async (_, { _id }) => {
      try {
        const foundUser = await User.findById(_id);
        if (!foundUser) {
          throw new Error("User not found");
        }
        return foundUser;
      } catch (error) {
        throw new Error("Error fetching user");
      }
    },
    switches: async () => {
      try {
        return await Switch.find({});
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
    deskmats: async () => {
      try {
        return await Deskmat.find({});
      } catch (error) {
        throw new Error("Error fetching deskmats");
      }
    },
    accessories: async () => {
      try {
        return await Accessory.find({});
      } catch (error) {
        throw new Error("Error fetching accessories");
      }
    },
    verifyToken: async (_, { token }) => {
      const user = await verifyTokenFunction(token);

      if (!user) {
        throw new Error("Invalid or expired token.");
      }

      return user;
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      try {
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser) {
          throw new Error("Email is already in use");
        }
        // Salt & hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(input.password, saltRounds);

        // Replace plain password with hashed one
        input.password = hashedPassword;
        sendVerificationEmail(input.email);
        const newUser = new User(input);
        return await newUser.save();
      } catch (error) {
        throw new Error(error.message || "Error signing up the user");
      }
    },
    login: async (_, { email, password }) => {
      try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        // Generate JWT token
        const tokenData = { id: user._id };
        const token = generateToken(tokenData);

        // Remove password from user object
        user.password = undefined;

        // Return token and user data
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createPaymentIntent: async (_, { amount }) => {
      console.log("amount", amount);
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount, // Amount is in cents
          currency: "usd",
        });
        return { success: true, clientSecret: paymentIntent.client_secret };
      } catch (error) {
        console.log("error", error);
        return { success: false, error: error.message };
      }
    },
    createOrder: async (_, { input }) => {
      try {
        // Fetch user to associate with the order
        const user = await User.findById(input.user);
        if (!user) {
          throw new Error("User not found");
        }

        // Prepare order data
        const orderData = {
          orderTotal: input.total,
          orderItems: input.items,
          user: input.user,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          shippingAddress: input.shippingAddress,
          orderSubTotal: input.subTotal,
          orderTax: input.tax,
        };

        // Create a new order
        const newOrder = new Order(orderData);
        const savedOrder = await newOrder.save();

        return savedOrder;
      } catch (error) {
        throw new Error(error.message || "Error creating the order");
      }
    },
  },
};
export default resolvers;
