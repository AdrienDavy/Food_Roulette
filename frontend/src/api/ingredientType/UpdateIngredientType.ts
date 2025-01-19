import { gql } from "../../gql";


export const mutationUpdateIngredientType = gql(`
mutation UpdateIngredientType($data: IngredientTypeUpdateInput!, $id:ID!) {
  updateIngredientType(data: $data, id:$id) {
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