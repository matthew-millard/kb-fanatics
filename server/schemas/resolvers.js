import { Switch } from '../models/index.js';

const resolvers = {
  Query: {
    switches: async () => {
      return await Switch.find({});
    },
  },
};

export default resolvers;
