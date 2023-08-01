import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const GET_SWITCHES = gql`
  query GetSwitches {
    switches {
      _id
      brand
      product
      switchType
      quantity
      price
    }
  }
`;
