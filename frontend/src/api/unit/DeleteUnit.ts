import { gql } from "../../gql";

export const mutationDeleteUnit = gql(`
mutation DeleteUnit($id: ID!) {
  deleteUnit(id: $id) {
    id
    name
    abbreviation
  }
}
`);
