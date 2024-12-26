import { gql } from "../../gql";


export const queryRecipe = gql(`
query Recipe($recipeId: ID!) {
  recipe(id: $recipeId) {
    id
    name
    image
    cookTime
    preparation
    recipeType
    isAlcoholicDrink
    season {
      id
      seasonName
    }
    ingredients {
      id
      name
      image
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
}
`);
