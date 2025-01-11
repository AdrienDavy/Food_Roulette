import { gql } from "../../gql";


export const queryIngredientVariations = gql(`
query QueryIngredientVariations {
  ingredientVariations {
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
