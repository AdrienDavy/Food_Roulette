import { gql } from "../../gql";


export const queryUnit = gql(`
query Unit($unitId: ID!) {
  unit(id: $unitId) {
    id
    name
    abbreviation
  }
}
`);
