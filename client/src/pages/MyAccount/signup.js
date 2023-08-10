import { gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation Signup(
    $fName: String!
    $LName: String!
    $eMail: String!
    $password: String!
    $address1: String!
    $city: String!
    $stateProvince: String!
    $country: String!
  ) {
    signup(
      fName: $fName
      LName: $LName
      eMail: $eMail
      password: $password
      address1: $address1
      city: $city
      stateProvince: $stateProvince
      country: $country
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export default SIGNUP_MUTATION;
