import { gql } from "../../gql";


export const mutationCreateIngredientVariations = gql(`
mutation CreateIngredientVariations($data: IngredientVariationCreateManyInput[]!) {
  createIngredientVariations(data: $data) {
    id
  }
}
`);