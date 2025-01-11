import { gql } from "../../gql";


export const mutationCreateIngredientVariation = gql(`
mutation CreateIngredientVariation($data: IngredientVariationCreateInput!) {
  createIngredientVariation(data: $data) {
    id
    name
    image
    hasIngredient
    brand {
      id
      name
      image
    }
    shops {
      id
      name
      image
    }
    ingredient {
      id
      name
    }
    season {
      id
      seasonName
    }
    type {
      id
      name
    }
  }
}
`);