import { gql } from "../../gql";


export const mutationUpdateSeason = gql(`
mutation UpdateSeason($data: SeasonUpdateInput!, $id:ID!) {
  updateSeason(data: $data, id:$id) {
    id
  }
}
`);