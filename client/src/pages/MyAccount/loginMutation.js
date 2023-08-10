import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($eMail: String!, $password: String!) {
    login(eMail: $eMail, password: $password) {
      token
      user {
        _id
        eMail
      }
    }
  }
`;

export default LOGIN_MUTATION;
