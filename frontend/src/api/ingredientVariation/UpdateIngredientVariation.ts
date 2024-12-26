import { gql } from "../../gql";


export const mutationUpdateIngredientVariation = gql(`
mutation UpdateIngredientVariation($data: IngredientVariationUpdateInput!, $id:ID!) {
  updateIngredientVariation(data: $data, id:$id) {
    id
  }
}
`);