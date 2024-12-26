import { gql } from "../../gql";


export const mutationDeleteRecipe = gql(`
mutation DeleteRecipe($id: ID!) {
  deleteRecipe(id: $id) {
    id
  }
}
`);