import { gql } from "../../gql";


export const queryIngredients = gql(`
query QueryIngredients {
  ingredients {
    id
    name
    image
    hasIngredient
    type {
      id
      name
      image
    }
    variations {
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
    }
  }
}
`);
