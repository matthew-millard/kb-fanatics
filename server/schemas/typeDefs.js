import { gql } from "apollo-server-express";

const typeDefs = gql`
  type SwitchModel {
    _id: ID
    brand: String
    product: String
    switchType: String
    quantity: Int
    price: Int
    image: String
  }

  type User {
    _id: ID
    fName: String
    LName: String
    eMail: String
    address1: String
    address2: String
    city: String
    stateProvince: String
    country: String
    phoneNum: String
    creditCard: String
    expiration: String
    password: String # Add this line
  }

  type Order {
    order_ID: ID
    user_ID: ID
    cartID: ID
    subTotal: Int
    taxes: Int
    total: Int
    status: String
  }

  type Cart {
    cart_ID: ID
    itemID: ID
    quantity: Int
    prodName: String
    price: Int
    subTotal: Int
  }

  type Keyboard {
    product_ID: ID
    prodName: String
    brand: String
    price: Int
    quantity: Int
    features: String
    image: String
  }

  type Keycap {
    product_ID: ID
    prodName: String
    brand: String
    price: Int
    quantity: Int
    features: String
    image: String
  }

  type Query {
    switches: [SwitchModel]
    users: [User]
    orders: [Order]
    cart: [Cart]
    userCart: Cart
    keyboards: [Keyboard]
    keycaps: [Keycap]
  }

  type AuthPayload {
    token: String!
    user: User
  }

  type Mutation {
    signup(
      fName: String!
      LName: String!
      eMail: String!
      password: String!
      address1: String!
      city: String!
      stateProvince: String!
      country: String!
    ): AuthPayload!
    login(
      eMail: String!
      password: String!
    ): AuthPayload!
  }
`;

export default typeDefs;
