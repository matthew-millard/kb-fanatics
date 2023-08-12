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
