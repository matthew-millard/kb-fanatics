import { gql } from "apollo-server-express";

const typeDefs = gql`
  type SwitchModel {
    _id: ID
    category: String
    brand: String
    product: String
    switchType: String
    quantity: Int
    price: Int
    imageURL: String
  }
  type User {
    user_ID: ID
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
  }
  type Order {
    order_ID: ID
    userID: String
    cartID: String
    subTotal: Int
    taxes: Int
    total: Int
    status: String
  }
  type Cart {
    cart_ID: ID
    itemID: String
    quantitiy: Int
    prodName: String
    price: Int
    subTotal: Int
  }
  type Keyboard {
    _id: ID
    brand: String
    model: String
    color: String
    keycaps: String
    plate: String
    case: String
    switches: String
    hotswap: Boolean
    price: Int
    quantity: Int
    imageURL: String
  }
  type Keycap {
    _id: ID
    category: String
    brand: String
    model: String
    price: Int
    quantity: Int
    imageURL: String
  }

  type Deskmat {
    _id: ID
    category: String
    brand: String
    model: String
    price: Int
    quantity: Int
    imageURL: String
  }

  type Query {
    switches: [SwitchModel]
    users: [User]
    orders: [Order]
    cart: [Cart]
    keyboards: [Keyboard]
    keycaps: [Keycap]
    deskmats: [Deskmat]
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
    ): AuthPayload
  }
`;

export default typeDefs;
