import { gql } from "../../gql";


export const mutationUpdateUnit = gql(`
mutation UpdateUnit($data: UnitUpdateInput!, $updateUnitId: ID!) {
  updateUnit(data: $data, id: $updateUnitId) {
    id
  
  }
}
`);