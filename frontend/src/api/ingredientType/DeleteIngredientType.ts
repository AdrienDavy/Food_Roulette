import { gql } from "../../gql";


export const mutationDeleteIngredientType = gql(`
mutation DeleteIngredientType($id: ID!) {
  deleteIngredientType(id: $id) {
    id
    name
    image
    shops {
      id
      name
      image
    }
    brand {
      id
      name
      image
    }
  }
}
`);