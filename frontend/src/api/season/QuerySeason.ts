import { gql } from "../../gql";


export const querySeason = gql(`
query Season($seasonId: ID!) {
  season(id: $seasonId) {
    id
    seasonName
  }
}
`);
