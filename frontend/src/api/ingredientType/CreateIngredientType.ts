import { gql } from "../../gql";


export const mutationCreateIngredientType = gql(`
mutation CreateIngredientType($data: IngredientTypeCreateInput!) {
  createIngredientType(data: $data) {
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