import { gql } from "../../gql";


export const mutationDeleteIngredientVariation = gql(`
mutation DeleteIngredientVariation($id: ID!) {
  deleteIngredientVariation(id: $id) {
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