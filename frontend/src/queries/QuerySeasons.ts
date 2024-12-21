import { gql } from "@apollo/client";

export const querySeasons = gql`
query Seasons {
  seasons {
    id
    seasonName
  }
}
`;
