import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      _id
      email
      firstName
      lastName
      address
      city
      stateProvince
      country
      postalCode
      phoneNumber
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        firstName
        lastName
        address
        city
        stateProvince
        country
        postalCode
      }
    }
  }
`;

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($amount: Int!) {
    createPaymentIntent(amount: $amount) {
      success
      clientSecret
      error
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $user: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $shippingAddress: ShippingAddressInput!
    $total: Float!
    $subTotal: Float!
    $tax: Float!
    $items: [OrderItemInput!]!
  ) {
    createOrder(
      input: {
        user: $user
        firstName: $firstName
        lastName: $lastName
        email: $email
        shippingAddress: $shippingAddress
        total: $total
        subTotal: $subTotal
        tax: $tax
        items: $items
      }
    ) {
      _id
      orderTotal
      orderItems {
        productId
        quantity
        price
        brand
        model
        image
      }
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($uniqueString: String!) {
    verifyEmail(uniqueString: $uniqueString) {
      success
      message
    }
  }
`;
