import { gql } from "../../gql";


export const mutationCreateRecipe = gql(`
mutation CreateRecipe($data: RecipeCreateInput!) {
  createRecipe(data: $data) {
    id
  }
}
`);