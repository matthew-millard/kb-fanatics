import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Switch {
    _id: ID
    brand: String
    product: String
    switchType: String
    quantity: Int
    price: Int
  }

  type Query {
    switches: [Switch]
  }
`;

export default typeDefs;
