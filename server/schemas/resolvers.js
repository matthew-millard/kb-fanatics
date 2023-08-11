import { Switch, Keyboard, Keycap, Deskmat, Accessory, User } from "../models/index.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/authService.js";

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
  },
};
export default resolvers;
