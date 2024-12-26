import { gql } from "../../gql";


export const mutationUpdateRecipe = gql(`
mutation UpdateRecipe($data: RecipeUpdateInput!, $id:ID!) {
  updateRecipe(data: $data, id:$id) {
    id
  }
}
`);