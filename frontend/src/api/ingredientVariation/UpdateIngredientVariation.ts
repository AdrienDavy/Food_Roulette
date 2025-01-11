import { gql } from "../../gql";


export const mutationUpdateIngredientVariation = gql(`
mutation UpdateIngredientVariation($data: IngredientVariationUpdateInput!, $id:ID!) {
  updateIngredientVariation(data: $data, id:$id) {
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