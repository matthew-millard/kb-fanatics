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
  },
};

export default resolvers;
