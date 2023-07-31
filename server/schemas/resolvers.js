import Switch from "../models/index.js";

const resolvers = {
  Query: {
    switches: async () => Switch.find({}),
  },
};

export default resolvers;
