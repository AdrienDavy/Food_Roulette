import { gql } from "../../gql";



export const queryUnits = gql(`
query Units {
  units {
    id
    name
    abbreviation
  }
}
`);
