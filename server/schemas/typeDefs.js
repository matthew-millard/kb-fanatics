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
    user_ID: ID
    fName: String
    LName: String
    eMail: String
    address1: String
    address2: String
    city: String
    state_province: String
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
    keyboards: [Keyboard]
    keycaps: [Keycap]
  }
`;

export default typeDefs;
