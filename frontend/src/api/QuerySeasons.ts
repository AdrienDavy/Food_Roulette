import { gql } from "../gql";


export const querySeasons = gql(`
query Seasons {
  seasons {
    id
    seasonName
  }
}
`);
