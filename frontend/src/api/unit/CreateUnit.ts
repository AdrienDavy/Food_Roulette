import { gql } from "../../gql";

export const mutationCreateUnit = gql(`
mutation CreateUnit($data: UnitCreateInput!) {
  createUnit(data: $data) {
    id
    name
    abbreviation
  }
}
`);
