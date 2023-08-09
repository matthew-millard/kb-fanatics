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
      imageURL
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_KEYBOARDS = gql`
  query GetKeyboards {
    keyboards {
      _id
      switches
      quantity
      price
      plate
      model
      keycaps
      imageURL
      hotswap
      color
      case
      brand
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_KEYCAPS = gql`
  query GetKeycaps {
    keycaps {
      _id
      brand
      model
      price
      quantity
      imageURL
    }
  }
`;
