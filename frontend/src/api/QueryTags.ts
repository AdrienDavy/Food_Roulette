import { gql } from "../gql";

export const queryTags = gql(`
query Tags {
  tags {
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
