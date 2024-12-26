import { gql } from "../../gql";


export const queryCategory = gql(`
query QueryTag($tagId: ID!) { 
  tag(id: $tagId) {
    id
    name
    recipes {
      id
      name
      preparation
      cookTime
      image
      recipeType
      season {
        id
        seasonName
      }
      variations {
        id
        name
        image
      }
    }
  }
}
`);
