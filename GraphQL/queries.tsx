import { gql } from "@apollo/client";

export const LOAD_BRAND = gql`
  query {
    brands {
      id
      name
      description
    }
  }
`;
