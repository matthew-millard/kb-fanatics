import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Switch {
    _id: ID
    name: String
    product: String
    quantity: Int
    switchType: String
    price: Int
  }

  type Query {
    switches: [Switch]
  }
`;

export default typeDefs;
