import { gql } from "../../gql";


export const queryIngredients = gql(`
query QueryIngredients {
  ingredients {
    id
    name
    image
  }
}
`);
