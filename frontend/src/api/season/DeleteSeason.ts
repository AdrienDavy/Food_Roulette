import { gql } from "../../gql";


export const mutationDeleteSeason = gql(`
mutation DeleteSeason($id: ID!) {
  deleteSeason(id: $id) {
    id
  }
}
`);