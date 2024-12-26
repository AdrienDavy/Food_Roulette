import { gql } from "../../gql";


export const mutationCreateSeason = gql(`
mutation CreateSeason($data: SeasonCreateInput!) {
  createSeason(data: $data) {
    id
  }
}
`);