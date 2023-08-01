import Switch from "../models/index.js";

const resolvers = {
  Query: {
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
  
};

export default resolvers;
